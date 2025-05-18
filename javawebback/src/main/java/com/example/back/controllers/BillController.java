package com.example.back.controllers;

import com.example.back.dto.response.Product.BillDTO;
import com.example.back.service.BillService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.key}/bills")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    @GetMapping
    public List<BillDTO> getAllBills() {
        return billService.getAllBills();
    }

    @GetMapping("/{id}")
    public BillDTO getBillById(@PathVariable Integer id) {
        return billService.getBillById(id);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBillStatus(@PathVariable Integer id, @RequestParam String status) {
        try {
            billService.updateBillStatus(id, status);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server");
        }
    }

}
