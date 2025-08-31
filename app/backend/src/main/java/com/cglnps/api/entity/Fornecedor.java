package com.cglnps.api.entity;

import com.cglnps.api.exception.TipoServicoInvalidoException;

public class Fornecedor extends PessoaJuridica {
  private String tipoServico;

  public Fornecedor(String nome, String email, String telefone, String cnpj) {
    super(nome, email, telefone, cnpj);
  }

  public String getTipoServico() {
    return tipoServico;
  }

  public void cadastrarTipoServico(String tipoServico) throws TipoServicoInvalidoException {
    if (tipoServico == null || tipoServico.isEmpty()) throw new TipoServicoInvalidoException("Tipo de serviço não informado.");
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
