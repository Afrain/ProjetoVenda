package com.example.projetoJavaApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projetoJavaApi.model.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

}
