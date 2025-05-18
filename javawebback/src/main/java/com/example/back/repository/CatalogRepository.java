package com.example.back.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.back.entity.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


public interface CatalogRepository extends JpaRepository<Catalog, Integer> {
    // Không cần viết gì thêm nếu chỉ cần findAll(), findById(), save(), delete...
    Page<Catalog> findByNameContainingIgnoreCase(String name, Pageable pageable);
}

