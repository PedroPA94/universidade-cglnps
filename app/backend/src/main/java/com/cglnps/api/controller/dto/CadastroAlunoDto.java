package com.cglnps.api.controller.dto;

import com.cglnps.api.entity.Aluno;
import com.cglnps.api.exception.DocumentoInvalidoException;

public record CadastroAlunoDto(String nome, String email, String telefone, String cpf, String curso, byte[] comprovanteEnsinoMedio) {
  public Aluno paraEntidade() throws DocumentoInvalidoException {
    Aluno aluno = new Aluno(nome, email, telefone, cpf);
    aluno.enviarComprovanteEnsinoMedio(comprovanteEnsinoMedio);
    aluno.informarCurso(curso);
    return aluno;
  }
}
