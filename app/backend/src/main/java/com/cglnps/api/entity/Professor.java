package com.cglnps.api.entity;

import java.util.Arrays;

public class Professor extends PessoaFisica {
  private byte[] diploma;
  private String[] disciplinasMinistradas;

  public Professor(Long id, String nome, String email, String telefone, String cpf) {
    super(id, nome, email, telefone, cpf);
  }

  public byte[] getDiploma() {
    return diploma;
  }

  public void enviarDiploma(byte[] diploma) {
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
