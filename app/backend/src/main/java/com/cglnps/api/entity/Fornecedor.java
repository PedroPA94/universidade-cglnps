package com.cglnps.api.entity;

import com.cglnps.api.exception.CnpjInvalidoException;

public class Fornecedor extends PessoaJuridica {
  private String tipoServico;

  public Fornecedor(Long id, String nome, String email, String telefone, String cnpj) {
    super(id, nome, email, telefone, cnpj);
  }

  public String getTipoServico() {
    return tipoServico;
  }

  public void cadastrarTipoServico(String tipoServico) {
    this.tipoServico = tipoServico;
  }

  @Override
  public String toString() {
    return "{\n" +
            "  id: " + getId() + "\n" +
            "  nome: '" + getNome() + "'\n" +
            "  email: '" + getEmail() + "'\n" +
            "  telefone: '" + getTelefone() + "'\n" +
            "  cnpj: '" + getCnpj() + "'\n" +
            "  tipoServico: '" + tipoServico + "'\n" +
            "}";
  }

  @Override
  public void cadastrar() {
    System.out.println("Novo fornecedor cadastrado: \n" + this);
  }
}
