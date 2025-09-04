package com.cglnps.api.advice;

import com.cglnps.api.exception.EntradaInvalidaException;
import com.cglnps.api.exception.PessoaJaCadastradaException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalControllerAdvice {
  @ExceptionHandler(EntradaInvalidaException.class)
  public ResponseEntity<String> tratarEntradaInvalida(EntradaInvalidaException exception) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
  }

  @ExceptionHandler(PessoaJaCadastradaException.class)
  public ResponseEntity<String> tratarPessoaJaCadastrada(PessoaJaCadastradaException exception) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
  }
}
