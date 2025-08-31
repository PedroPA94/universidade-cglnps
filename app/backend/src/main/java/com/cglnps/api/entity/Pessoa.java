package com.cglnps.api.entity;

import java.util.UUID;

public abstract class Pessoa {
  private final String id;
  private String nome;
  private String email;
  private String telefone;

  public Pessoa(String nome, String email, String telefone) {
    this.id = UUID.randomUUID().toString();
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

  public String getId() {
    return id;
  }


  public abstract void cadastrar();

  public void enviarEmailConfirmacao() {
    System.out.println("Email de confirmação de cadastro enviado para " + email);
  }
}
