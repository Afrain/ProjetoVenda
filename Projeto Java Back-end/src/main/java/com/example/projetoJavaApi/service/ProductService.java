package com.example.projetoJavaApi.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.example.projetoJavaApi.model.Product;
import com.example.projetoJavaApi.repository.ProductRepository;
import com.example.projetoJavaApi.service.exceptions.ObjectNotFoundException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	public List<Product> findAll() {
		return productRepository.findAll();
	}

	public Product findById(Long id) {
		Optional<Product> product = productRepository.findById(id);
		return product.orElseThrow(() -> new ObjectNotFoundException("Product not found!"));
	}

	@Transactional
	public Product save(@Valid Product product) {
		product.setId(null);
		return productRepository.save(product);
	}

	@Transactional
	public Product update(@Valid Product product, Long id) {
		product.setId(id);
		Product productSearch = findById(id);
		BeanUtils.copyProperties(product, productSearch);
		return productRepository.save(productSearch);
	}

	@Transactional
	public void delete(Long id) {
		findById(id);
		try {
			productRepository.deleteById(id);
			productRepository.flush();
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Product has a linked sale and cannot be excluded!");
		}
		
	}

}
