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

import com.example.projetoJavaApi.model.Sale;
import com.example.projetoJavaApi.service.SaleService;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("sales")
public class SaleController {

	@Autowired
	private SaleService saleService;

	@GetMapping
	public List<Sale> findAllSales() {
		return saleService.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Sale> findBySaleId(@PathVariable Long id) {
		return ResponseEntity.ok().body(saleService.findById(id));
	}

	@PostMapping
	@ResponseStatus(value = HttpStatus.CREATED)
	public Sale saveSale(@Valid @RequestBody Sale sale) {
		return saleService.save(sale);
	}

	@PutMapping("/{id}")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public Sale updateSale(@Valid @RequestBody Sale sale, @PathVariable Long id) {
		return saleService.update(sale, id);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void deleteSale(@PathVariable Long id) {
		saleService.delete(id);
	}

}
