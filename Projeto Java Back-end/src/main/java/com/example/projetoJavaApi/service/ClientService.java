package com.example.projetoJavaApi.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.example.projetoJavaApi.model.Client;
import com.example.projetoJavaApi.repository.ClientRepository;
import com.example.projetoJavaApi.service.exceptions.ObjectNotFoundException;

@Service
public class ClientService {

	@Autowired
	private ClientRepository clientRepository;

	public List<Client> findAll() {
		return clientRepository.findAll();
	}

	public Client findById(Long id) {
		return clientRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Client not found!"));
	}

	@Transactional
	public Client save(Client client) {
		client.setId(null);
		return clientRepository.save(client);
	}

	@Transactional
	public Client update(Client client, Long id) {
		client.setId(id);
		Client clientSearch = findById(id);
		BeanUtils.copyProperties(client, clientSearch);
		return clientRepository.save(clientSearch);
	}

	@Transactional
	public void delete(Long id) {
		findById(id);
		try {
			clientRepository.deleteById(id);
			clientRepository.flush();
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Customer has a linked sale and cannot be excluded!");
		}
	}

}
