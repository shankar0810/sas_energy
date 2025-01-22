package com.sas.gallery.controller;

import com.sas.gallery.Dto.gallerydto;
import com.sas.gallery.repository.gallery_repository;
import com.sas.gallery.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class gallery_controller {

    @Autowired
    private gallery_repository imageRepository;

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<Map> upload(gallerydto imageModel) {
        try {
            return imageService.uploadImage(imageModel);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
