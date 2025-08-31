package com.cglnps.api.entity;

import com.cglnps.api.exception.DocumentoInvalidoException;

import java.util.Arrays;

public class Professor extends PessoaFisica {
  private byte[] diploma;
  private String[] disciplinasMinistradas;

  public Professor(String nome, String email, String telefone, String cpf) {
    super(nome, email, telefone, cpf);
  }

  public byte[] getDiploma() {
    return diploma;
  }

  public void enviarDiploma(byte[] diploma) throws DocumentoInvalidoException {
    if (diploma == null || diploma.length == 0) throw new DocumentoInvalidoException("O diploma enviado é inválido.");
    this.diploma = diploma;
  }

  public String[] getDisciplinasMinistradas() {
    return disciplinasMinistradas;
  }

  public void informarDisciplinasMinistradas(String[] disciplinasMinistradas) {
    this.disciplinasMinistradas = disciplinasMinistradas;
  }

  @Override
  public String toString() {
    return "{\n" +
            "  id: " + getId() + "\n" +
            "  nome: '" + getNome() + "'\n" +
            "  email: '" + getEmail() + "'\n" +
            "  telefone: '" + getTelefone() + "'\n" +
            "  cpf: '" + getCpf() + "'\n" +
            "  diploma: " + (diploma != null ? "arquivo enviado (" + diploma.length + " bytes)" : "não enviado") + "\n" +
            "  disciplinas ministradas: " + (disciplinasMinistradas != null ? Arrays.toString(disciplinasMinistradas) : "nenhuma") + "\n" +
            "}";
  }

  @Override
  public void cadastrar() {
    System.out.println("Novo professor cadastrado: \n" + this);
  }
}
