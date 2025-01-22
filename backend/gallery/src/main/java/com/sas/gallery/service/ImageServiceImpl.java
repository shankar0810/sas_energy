package com.sas.gallery.service;

import com.sas.gallery.Dto.gallerydto;
import com.sas.gallery.repository.gallery_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private gallery_repository imageRepository;


    @Override
    public ResponseEntity<Map> uploadImage(gallerydto imageModel) {
        try {
            if (imageModel.getName().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            if (imageModel.getDescription().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            if (imageModel.getFile().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            com.sas.gallery.model.gallery image = new com.sas.gallery.model.gallery();
            image.setTitle(imageModel.getName());
            image.setDescription(imageModel.getDescription());
            image.setUrl(cloudinaryService.uploadFile(imageModel.getFile(), "folder_1"));
            if(image.getUrl() == null) {
                return ResponseEntity.badRequest().build();
            }
            imageRepository.save(image);
            return ResponseEntity.ok().body(Map.of("url", image.getUrl()));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }


    }
}
