package com.sas.gallery.service;

import com.sas.gallery.Dto.GalleryDto;
import com.sas.gallery.Dto.GalleryResponseDto;

import java.util.List;

public interface ImageService {
    GalleryResponseDto uploadImage(GalleryDto galleryDto, String username);
    List<GalleryResponseDto> getAllImages();
    GalleryResponseDto getImageById(Long id);
    boolean deleteImage(Long id, String username);
}