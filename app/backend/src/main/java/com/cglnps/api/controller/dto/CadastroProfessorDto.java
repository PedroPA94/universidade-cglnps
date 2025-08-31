package com.cglnps.api.controller.dto;

import com.cglnps.api.entity.Fornecedor;
import com.cglnps.api.entity.Professor;
import com.cglnps.api.exception.DocumentoInvalidoException;
import com.cglnps.api.exception.TipoServicoInvalidoException;

public record CadastroProfessorDto(String nome, String email, String telefone, String cpf, byte[] diploma, String[] disciplinasMinistradas) {
  public Professor paraEntidade() throws DocumentoInvalidoException {
    Professor professor = new Professor(nome, email, telefone, cpf);
    professor.enviarDiploma(diploma);
    professor.informarDisciplinasMinistradas(disciplinasMinistradas);
    return professor;
  }
}
