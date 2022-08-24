package com.example.projetoJavaApi.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
public class Product implements Serializable {

	private static final long serialVersionUID = 1L;

	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Name is required!")
	private String name;

	private String description;

	@DecimalMin(message = "Enter a number greater than 0", value = "0")
	@NotNull(message = "Price is required!")
	private BigDecimal price;

	@JsonIgnore
	@OneToMany(mappedBy = "id.product")
	private Set<SaleItem> items = new HashSet<>();

	public Product(Long id, String name, String description, BigDecimal price) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
	}

	public Product() {
		super();
	}
	
	@JsonIgnore
	public List<Sale> getSales(){
		List<Sale> list = new ArrayList<>();
		for(SaleItem i : items) {
			list.add(i.getSale());
		}
		return list;
	}

}
