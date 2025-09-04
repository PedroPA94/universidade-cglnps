package com.cglnps.api.repository;

import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

@Repository
public class PessoaRepository {
  private final List<String> identificadores = new ArrayList<>();

  public void salvarPessoa(String identificador) {
    identificadores.add(identificador);
  }

  public boolean existePessoa(String identificador) {
    return identificadores.contains(identificador);
  }
}
