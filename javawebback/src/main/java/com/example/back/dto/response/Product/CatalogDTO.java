//package com.example.back.dto.response.Product;
//import lombok.AccessLevel;
//import lombok.Builder;
//import lombok.Data;
//import lombok.experimental.FieldDefaults;
//@Data
//@Builder
//public class CatalogDTO {
//     Integer id;
//     String name;
//}
//
//
package com.example.back.dto.response.Product;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CatalogDTO {
     private Integer id;
     private String name;
}
