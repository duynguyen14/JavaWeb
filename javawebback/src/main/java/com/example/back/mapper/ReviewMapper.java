package com.example.back.mapper;

import com.example.back.dto.response.Product.ReviewDTO;
import com.example.back.entity.Review;

public class ReviewMapper {

    public static ReviewDTO toDTO(Review review) {
        if (review == null) return null;

        return ReviewDTO.builder()
                .reviewId(review.getReviewId())
                .comment(review.getComment())
                .rating(review.getRating())
                .time(review.getTime())
                .productId(review.getProduct() != null ? review.getProduct().getProductId() : null)
                .userName(review.getUser() != null ? review.getUser().getUserName() : null)
                .build();
    }
}
