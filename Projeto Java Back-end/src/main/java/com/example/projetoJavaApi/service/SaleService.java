package com.example.projetoJavaApi.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.example.projetoJavaApi.model.Sale;
import com.example.projetoJavaApi.model.SaleItem;
import com.example.projetoJavaApi.repository.SaleItemRepository;
import com.example.projetoJavaApi.repository.SaleRepository;
import com.example.projetoJavaApi.service.exceptions.ObjectNotFoundException;

@Service
public class SaleService {

	@Autowired
	private SaleRepository saleRepository;

	@Autowired
	private SaleItemRepository saleItemRepository;

	@Autowired
	private ClientService clientService;

	@Autowired
	private ProductService productService;

	public List<Sale> findAll() {
		return saleRepository.findAll();
	}

	public Sale findById(Long id) {
		return saleRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Sale not found!"));
	}

	@Transactional
	public Sale save(Sale sale) {
		sale.setId(null);
		sale.setClient(clientService.findById(sale.getClient().getId()));
		sale = saleRepository.save(sale);
		for (SaleItem i : sale.getItems()) {
			i.setProduct(productService.findById(i.getProduct().getId()));
			i.setPrice(productService.findById(i.getProduct().getId()).getPrice());
			i.setAmount(i.getAmount());
			i.setSale(sale);
		}
		saleItemRepository.saveAll(sale.getItems());
		return sale;
	}

	@Transactional
	public Sale update(Sale sale, Long id) {
		sale.setId(id);
		Sale saleSearch = saleRepository.findById(sale.getId()).get();
		BeanUtils.copyProperties(sale, saleSearch);
		for (SaleItem i : saleSearch.getItems()) {
			i.setProduct(productService.findById(i.getProduct().getId()));
			i.setPrice(productService.findById(i.getProduct().getId()).getPrice());
			i.setAmount(i.getAmount());
			i.setSale(sale);
		}
		saleItemRepository.saveAll(saleSearch.getItems());
		return sale;
	}

	@Transactional
	public void delete(Long id) {
		findById(id);
		try {
			saleRepository.deleteById(id);
			saleRepository.flush();
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Sale has a linked SaleItem and cannot be excluded!");
		}

	}

}
