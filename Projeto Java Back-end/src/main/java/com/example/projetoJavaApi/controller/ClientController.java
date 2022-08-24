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

import com.example.projetoJavaApi.model.Client;
import com.example.projetoJavaApi.service.ClientService;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/clients")
public class ClientController {

	@Autowired
	private ClientService clientService;

	@GetMapping
	public List<Client> findAllClients() {
		return clientService.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Client> findByClientId(@Valid @PathVariable Long id) {
		return ResponseEntity.ok().body(clientService.findById(id));
	}

	@PostMapping
	@ResponseStatus(value = HttpStatus.CREATED)
	public Client saveClient(@Valid @RequestBody Client client) {
		return clientService.save(client);
	}

	@PutMapping("/{id}")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public Client updateClient(@Valid @RequestBody Client client, @PathVariable Long id) {
		return clientService.update(client, id);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public void deleteClient(@Valid @PathVariable Long id) {
		clientService.delete(id);
	}
}
