package com.example.projetoJavaApi.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity(name = "sale_items")
public class SaleItem implements Serializable {

	private static final long serialVersionUID = 1L;

	@EqualsAndHashCode.Include
	@JsonIgnore
	@EmbeddedId
	private SaleItemPK id = new SaleItemPK();

	private Integer amount;

	private BigDecimal price;

	public SaleItem() {
		super();
	}

	public SaleItem(Sale sale, Product product, Integer amount, BigDecimal price) {
		super();
		id.setSale(sale);
		id.setProduct(product);
		this.amount = amount;
		this.price = price;
	}

	public BigDecimal getSubTotal() {
		return new BigDecimal(amount.toString()).multiply(price);
	}

	@JsonIgnore
	public Sale getSale() {
		return id.getSale();
	}

	public void setSale(Sale sale) {
		id.setSale(sale);
	}

	public Product getProduct() {
		return id.getProduct();
	}

	public void setProduct(Product product) {
		id.setProduct(product);
	}

}
