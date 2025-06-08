package com.sas.gallery.service;

import com.sas.gallery.Dto.GalleryDto;
import com.sas.gallery.Dto.GalleryResponseDto;
import com.sas.gallery.model.Gallery;
import com.sas.gallery.repository.GalleryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageServiceImpl implements ImageService {

    private static final Logger logger = LoggerFactory.getLogger(ImageServiceImpl.class);

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private GalleryRepository galleryRepository;

    @Override
    public GalleryResponseDto uploadImage(GalleryDto galleryDto, String username) {
        logger.info("Starting image upload for user: {}", username);

        try {
            validateGalleryDto(galleryDto);
            logger.info("Gallery DTO validation successful");

            String imageUrl = cloudinaryService.uploadFile(galleryDto.getFile(), "gallery");
            logger.info("Cloudinary upload successful, URL: {}", imageUrl);

            if (imageUrl == null) {
                throw new RuntimeException("Failed to upload image to cloud storage");
            }

            Gallery gallery = new Gallery();
            gallery.setTitle(galleryDto.getTitle());
            gallery.setDescription(galleryDto.getDescription());
            gallery.setImageUrl(imageUrl);
            gallery.setUploadedBy(username);

            logger.info("Attempting to save gallery entity to database");
            Gallery savedGallery = galleryRepository.save(gallery);
            logger.info("Image uploaded successfully with ID: {}", savedGallery.getId());

            return mapToResponseDto(savedGallery);

        } catch (Exception e) {
            logger.error("Error uploading image for user {}: {}", username, e.getMessage(), e);
            throw new RuntimeException("Failed to upload image: " + e.getMessage(), e);
        }
    }

    @Override
    public List<GalleryResponseDto> getAllImages() {
        try {
            List<Gallery> galleries = galleryRepository.findAllOrderByCreatedAtDesc();
            return galleries.stream()
                    .map(this::mapToResponseDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error fetching all images: {}", e.getMessage());
            throw new RuntimeException("Failed to fetch images");
        }
    }

    @Override
    public GalleryResponseDto getImageById(Long id) {
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found with ID: " + id));
        return mapToResponseDto(gallery);
    }

    @Override
    public boolean deleteImage(Long id, String username) {
        try {
            Gallery gallery = galleryRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Image not found"));

            // Check if user has permission to delete (admin or owner)
            if (!gallery.getUploadedBy().equals(username)) {
                throw new RuntimeException("You don't have permission to delete this image");
            }

            // Extract public ID from URL for Cloudinary deletion
            String publicId = extractPublicIdFromUrl(gallery.getImageUrl());
            if (publicId != null) {
                cloudinaryService.deleteFile(publicId);
            }

            galleryRepository.delete(gallery);
            logger.info("Image deleted successfully with ID: {}", id);
            return true;

        } catch (Exception e) {
            logger.error("Error deleting image: {}", e.getMessage());
            throw new RuntimeException("Failed to delete image: " + e.getMessage());
        }
    }

    private void validateGalleryDto(GalleryDto galleryDto) {
        if (galleryDto.getTitle() == null || galleryDto.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }
        if (galleryDto.getFile() == null || galleryDto.getFile().isEmpty()) {
            throw new IllegalArgumentException("File is required");
        }
    }

    private GalleryResponseDto mapToResponseDto(Gallery gallery) {
        GalleryResponseDto dto = new GalleryResponseDto();
        dto.setId(gallery.getId());
        dto.setTitle(gallery.getTitle());
        dto.setDescription(gallery.getDescription());
        dto.setImageUrl(gallery.getImageUrl());
        dto.setUploadedBy(gallery.getUploadedBy());
        dto.setCreatedAt(gallery.getCreatedAt());
        dto.setUpdatedAt(gallery.getUpdatedAt());
        return dto;
    }

    private String extractPublicIdFromUrl(String url) {
        try {
            // For Cloudinary URLs like: https://res.cloudinary.com/dadhrmy3u/image/upload/v1234567890/gallery/filename.jpg
            if (url.contains("/upload/")) {
                String[] parts = url.split("/upload/");
                if (parts.length > 1) {
                    String afterUpload = parts[1];
                    // Remove version if present (v1234567890/)
                    if (afterUpload.startsWith("v")) {
                        String[] versionParts = afterUpload.split("/", 2);
                        if (versionParts.length > 1) {
                            afterUpload = versionParts[1];
                        }
                    }
                    // Remove file extension
                    int lastDotIndex = afterUpload.lastIndexOf('.');
                    if (lastDotIndex > 0) {
                        return afterUpload.substring(0, lastDotIndex);
                    }
                    return afterUpload;
                }
            }
        } catch (Exception e) {
            logger.warn("Failed to extract public ID from URL: {}", url, e);
        }
        return null;
    }
}