package com.example.back.dto.response.Product;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    private Integer reviewId;
    private String comment;
    private Integer rating;
    private LocalDateTime time;
    private String userName;
    private Integer productId;
    private String productName;
}
