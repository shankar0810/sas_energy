package com.sas.gallery.controller;

import com.sas.gallery.Dto.GalleryDto;
import com.sas.gallery.Dto.GalleryResponseDto;
import com.sas.gallery.service.ImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v3/gallery")
@CrossOrigin(origins = "*")
public class GalleryController {

    private static final Logger logger = LoggerFactory.getLogger(GalleryController.class);

    @Autowired
    private ImageService imageService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadImage(
            @Valid @ModelAttribute GalleryDto galleryDto,
            Authentication authentication) {

        try {
            String username = authentication.getName();
            GalleryResponseDto responseDto = imageService.uploadImage(galleryDto, username);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Image uploaded successfully");
            response.put("data", responseDto);

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            return createErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            logger.error("Error uploading image: {}", e.getMessage());
            return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload image");
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllImages() {
        try {
            List<GalleryResponseDto> images = imageService.getAllImages();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Images retrieved successfully");
            response.put("data", images);
            response.put("count", images.size());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error fetching images: {}", e.getMessage());
            return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch images");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getImageById(@PathVariable Long id) {
        try {
            GalleryResponseDto image = imageService.getImageById(id);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Image retrieved successfully");
            response.put("data", image);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return createErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            logger.error("Error fetching image: {}", e.getMessage());
            return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch image");
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteImage(
            @PathVariable Long id,
            Authentication authentication) {

        try {
            String username = authentication.getName();
            boolean deleted = imageService.deleteImage(id, username);

            if (deleted) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Image deleted successfully");
                return ResponseEntity.ok(response);
            } else {
                return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete image");
            }

        } catch (RuntimeException e) {
            return createErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            logger.error("Error deleting image: {}", e.getMessage());
            return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete image");
        }
    }

    private ResponseEntity<Map<String, Object>> createErrorResponse(HttpStatus status, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", message);
        return ResponseEntity.status(status).body(response);
    }
}
