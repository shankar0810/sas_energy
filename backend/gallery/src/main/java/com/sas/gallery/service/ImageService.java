package com.sas.gallery.service;

import com.sas.gallery.Dto.gallerydto;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface ImageService {
    ResponseEntity<Map> uploadImage(gallerydto imageModel);

    ResponseEntity<Map> getAllImages();
}
