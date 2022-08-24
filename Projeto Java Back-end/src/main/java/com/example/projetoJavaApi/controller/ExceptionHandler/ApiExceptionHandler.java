package com.example.projetoJavaApi.controller.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.example.projetoJavaApi.service.exceptions.ObjectNotFoundException;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {

		List<Error.Campo> listaCampos = new ArrayList<>();

		for (ObjectError error : ex.getBindingResult().getAllErrors()) {
			String nome = ((FieldError) error).getField();
			String message = error.getDefaultMessage();

			listaCampos.add(new Error.Campo(nome, message));
		}

		Error erro = new Error();
		erro.setStatus(status.value());
		erro.setDatahora(LocalDateTime.now());
		erro.setTitulo("One or more fields are invalid. Fill them in and try again!");
		erro.setCampo(listaCampos);

		return handleExceptionInternal(ex, erro, headers, status, request);
	}

	@ExceptionHandler(ObjectNotFoundException.class)
	public ResponseEntity<Object> handlerObjectNotFoundException(ObjectNotFoundException ex, WebRequest request) {
		HttpStatus status = HttpStatus.NOT_FOUND;

		Error erro = new Error();
		erro.setStatus(status.value());
		erro.setDatahora(LocalDateTime.now());
		erro.setTitulo(ex.getMessage());

		return handleExceptionInternal(ex, erro, new HttpHeaders(), status, request);
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<Object> handlerDataIntegrityViolationException(DataIntegrityViolationException ex, WebRequest request) {
		HttpStatus status = HttpStatus.BAD_REQUEST;

		Error erro = new Error();
		erro.setStatus(status.value());
		erro.setDatahora(LocalDateTime.now());
		erro.setTitulo(ex.getMessage());

		return handleExceptionInternal(ex, erro, new HttpHeaders(), status, request);
	}

}
