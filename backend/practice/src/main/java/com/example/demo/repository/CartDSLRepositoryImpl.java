package com.example.demo.repository;

import com.example.demo.entity.Cart;
import com.example.demo.repository.CartDSLRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CartDSLRepositoryImpl implements CartDSLRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Cart> findByUserId(String userId) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Cart> query = cb.createQuery(Cart.class);
        Root<Cart> cart = query.from(Cart.class);

        query.select(cart).where(cb.equal(cart.get("user_id"), userId));

        return entityManager.createQuery(query).getResultList();
    }
}
