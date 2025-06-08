package com.sas.gallery.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GalleryDto {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "File is required")
    private MultipartFile file;
}
