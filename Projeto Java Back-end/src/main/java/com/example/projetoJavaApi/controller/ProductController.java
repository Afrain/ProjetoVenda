package com.example.projetoJavaApi.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.projetoJavaApi.model.Product;
import com.example.projetoJavaApi.service.ProductService;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	private ProductService productService;

	@GetMapping
	public List<Product> findAllProducts() {
		return productService.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> findByProductId(@PathVariable Long id) {
		return ResponseEntity.ok().body(productService.findById(id));
	}
	
	@PostMapping
	@ResponseStatus(value = HttpStatus.CREATED)
	public Product saveProduct(@Valid @RequestBody Product product) {
		return productService.save(product);
	}
	
	@PutMapping("/{id}")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public Product updateProduct(@Valid @RequestBody Product product, @PathVariable Long id) {
		return productService.update(product, id);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void deleteProduct(@PathVariable Long id) {
		productService.delete(id);
	}
}
