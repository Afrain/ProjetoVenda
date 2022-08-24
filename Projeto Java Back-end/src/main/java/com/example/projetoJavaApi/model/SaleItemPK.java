package com.example.projetoJavaApi.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Embeddable
public class SaleItemPK implements Serializable {

	private static final long serialVersionUID = 1L;

	@EqualsAndHashCode.Include
	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;
	
	@EqualsAndHashCode.Include
	@ManyToOne
	@JoinColumn(name = "sale_id")
	private Sale sale;
	
}
