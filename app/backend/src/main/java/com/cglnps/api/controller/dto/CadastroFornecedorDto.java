package com.cglnps.api.controller.dto;

import com.cglnps.api.entity.Fornecedor;
import com.cglnps.api.exception.TipoServicoInvalidoException;

public record CadastroFornecedorDto(String nome, String email, String telefone, String cnpj, String tipoServico) {
  public Fornecedor paraEntidade() throws TipoServicoInvalidoException {
    Fornecedor fornecedor = new Fornecedor(nome, email, telefone, cnpj);
    fornecedor.cadastrarTipoServico(tipoServico);
    return fornecedor;
  }
}
