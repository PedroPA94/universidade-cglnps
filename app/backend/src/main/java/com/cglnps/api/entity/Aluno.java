package com.cglnps.api.entity;

import java.util.Arrays;

public class Aluno extends PessoaFisica {
  private byte[] comprovanteEnsinoMedio;
  private String curso;

  public Aluno(String nome, String email, String telefone, String cpf) {
    super(nome, email, telefone, cpf);
  }

  public byte[] getComprovanteEnsinoMedio() {
    return comprovanteEnsinoMedio;
  }

  public void enviarComprovanteEnsinoMedio(byte[] comprovanteEnsinoMedio) {
    this.comprovanteEnsinoMedio = comprovanteEnsinoMedio;
  }

  public String getCurso() {
    return curso;
  }

  public void informarCurso(String curso) {
    this.curso = curso;
  }

  @Override
  public String toString() {
    return "{\n" +
            "  id: " + getId() + "\n" +
            "  nome: '" + getNome() + "'\n" +
            "  email: '" + getEmail() + "'\n" +
            "  telefone: '" + getTelefone() + "'\n" +
            "  cpf: '" + getCpf() + "'\n" +
            "  comprovante do Ensino Médio: " + (comprovanteEnsinoMedio != null ? "arquivo enviado (" + comprovanteEnsinoMedio.length + " bytes)" : "não enviado") + "\n" +
            "  curso: " + getCurso() + "\n" +
            "}";
  }

  @Override
  public void cadastrar() {
    System.out.println("Novo aluno cadastrado: \n" + this);
  }
}
