package com.example.back.dto.response.Product;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import java.math.BigDecimal;
import java.util.List;
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductHomeDTO {
    Integer id;
    String name;
    BigDecimal price;
    Integer quantity;
    String description;
    List<String> images;
    Integer categoryId;
    String categoryName;

}
