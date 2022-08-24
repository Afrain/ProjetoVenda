package com.example.projetoJavaApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.projetoJavaApi.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

}
