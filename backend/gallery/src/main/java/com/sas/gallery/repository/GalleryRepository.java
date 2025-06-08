package com.sas.gallery.repository;

import com.sas.gallery.model.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {

    List<Gallery> findByUploadedBy(String uploadedBy);

    @Query("SELECT g FROM Gallery g ORDER BY g.createdAt DESC")
    List<Gallery> findAllOrderByCreatedAtDesc();
}