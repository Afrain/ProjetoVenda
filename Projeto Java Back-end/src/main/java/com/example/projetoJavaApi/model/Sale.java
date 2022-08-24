package com.example.projetoJavaApi.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity
public class Sale implements Serializable {

	private static final long serialVersionUID = 1L;

	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "Customer is required!")
	@ManyToOne
	@JoinColumn(name = "client_id")
	private Client client;
	
	@NotNull(message = "No items reported!")
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "id.sale")
	private Set<SaleItem> items = new HashSet<>();

	public Sale() {
		super();
	}
	
	public Sale(Long id, Client client) {
		super();
		this.id = id;
		this.client = client;
	}
	
	public BigDecimal getTotal() {
		Double total = 0.0;
		for(SaleItem i : items) {
			total += i.getSubTotal().doubleValue();
		}
		return new BigDecimal(total.toString());
	}
}
