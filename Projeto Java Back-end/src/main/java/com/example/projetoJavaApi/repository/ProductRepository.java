package com.example.projetoJavaApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projetoJavaApi.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
