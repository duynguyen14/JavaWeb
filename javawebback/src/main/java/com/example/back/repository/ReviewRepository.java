package com.example.back.repository;

import com.example.back.entity.Review;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class ReviewRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Review> findAll() {
        String jpql = "SELECT r FROM Review r LEFT JOIN FETCH r.user u LEFT JOIN FETCH r.product p";
        TypedQuery<Review> query = entityManager.createQuery(jpql, Review.class);
        return query.getResultList();
    }

    // Nếu bạn muốn thêm method findById hoặc khác, cũng viết bằng EntityManager tương tự
}
