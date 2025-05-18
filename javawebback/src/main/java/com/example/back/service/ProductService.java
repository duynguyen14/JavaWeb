package com.example.back.service;

import com.example.back.dto.response.Product.ProductHomeDTO;
import com.example.back.entity.Product;
import com.example.back.mapper.ProductMapper;
import com.example.back.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService {

    ProductRepository productRepository;
    ProductMapper productMapper;

    public List<ProductHomeDTO> getProductHome() {
        List<Product> products = productRepository.findProductHome();
        return products.stream()
                .map(productMapper::toProductHomeDTO)
                .toList();
    }
}
