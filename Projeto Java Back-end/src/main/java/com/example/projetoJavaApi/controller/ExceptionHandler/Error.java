package com.example.projetoJavaApi.controller.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@JsonInclude(Include.NON_NULL)
@Getter
@Setter
public class Error {

	private int status;
	private LocalDateTime datahora;
	private String titulo;
	private List<Campo> campo;

	@AllArgsConstructor
	@Getter
	public static class Campo {
		private String nome;
		private String message;
	}
}
