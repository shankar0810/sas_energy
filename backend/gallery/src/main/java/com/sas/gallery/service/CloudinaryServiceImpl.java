package com.sas.gallery.service;

import com.cloudinary.Cloudinary;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

    private static final Logger logger = LoggerFactory.getLogger(CloudinaryServiceImpl.class);

    @Resource
    private Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file, String folderName) {
        logger.info("Starting file upload to folder: {}", folderName);

        try {
            // Validate file
            if (file.isEmpty()) {
                throw new IllegalArgumentException("File is empty");
            }

            // Validate file type
            String contentType = file.getContentType();
            logger.info("File content type: {}", contentType);

            if (contentType == null || !contentType.startsWith("image/")) {
                throw new IllegalArgumentException("File must be an image");
            }

            // Validate file size (10MB limit)
            long fileSize = file.getSize();
            logger.info("File size: {} bytes", fileSize);

            if (fileSize > 10 * 1024 * 1024) {
                throw new IllegalArgumentException("File size must be less than 10MB");
            }

            Map<String, Object> options = new HashMap<>();
            options.put("folder", folderName);
            options.put("resource_type", "image");

            options.put("quality", "auto");
            options.put("fetch_format", "auto");

            logger.info("Uploading to Cloudinary with options: {}", options);
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), options);

            String publicId = (String) uploadResult.get("public_id");
            String secureUrl = (String) uploadResult.get("secure_url");

            logger.info("File uploaded successfully. Public ID: {}, URL: {}", publicId, secureUrl);
            return secureUrl;

        } catch (IOException e) {
            logger.error("IO Error uploading file to Cloudinary: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to upload file: " + e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error uploading file to Cloudinary: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to upload file: " + e.getMessage(), e);
        }
    }

    @Override
    public boolean deleteFile(String publicId) {
        try {
            Map result = cloudinary.uploader().destroy(publicId, Map.of());
            String resultStatus = (String) result.get("result");
            logger.info("File deletion result: {} for publicId: {}", resultStatus, publicId);
            return "ok".equals(resultStatus);
        } catch (IOException e) {
            logger.error("Error deleting file from Cloudinary: {}", e.getMessage());
            return false;
        }
    }
}

