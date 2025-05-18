package com.example.back.service;

import com.example.back.dto.response.Product.ReviewDTO;
import com.example.back.entity.Review;
import com.example.back.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Transactional(readOnly = true)
    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(r -> ReviewDTO.builder()
                        .reviewId(r.getReviewId())
                        .comment(r.getComment())
                        .rating(r.getRating())
                        .time(r.getTime())
                        .userName(r.getUser() != null ? r.getUser().getUserName() : null)
                        .productId(r.getProduct() != null ? r.getProduct().getProductId() : null)
                        .build())
                .collect(Collectors.toList());
    }


}