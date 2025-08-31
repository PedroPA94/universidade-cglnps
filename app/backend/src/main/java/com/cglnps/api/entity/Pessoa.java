package com.cglnps.api.entity;

public abstract class Pessoa {
  private Long id;
  private String nome;
  private String email;
  private String telefone;

  public Pessoa(Long id, String nome, String email, String telefone) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }

  public String getTelefone() {
    return telefone;
  }

  public void setTelefone(String telefone) {
    this.telefone = telefone;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public abstract void cadastrar();

  public void enviarEmailConfirmacao() {
    System.out.println("Email de confirmação de cadastro enviado para " + email);
  }
}
