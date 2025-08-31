package com.cglnps.api.service;

import com.cglnps.api.entity.Fornecedor;
import com.cglnps.api.exception.CnpjInvalidoException;
import org.springframework.stereotype.Service;

@Service
public class CadastroService {

  public void cadastrarFornecedor(Fornecedor fornecedor) throws CnpjInvalidoException {
    fornecedor.validarCnpj();
    fornecedor.cadastrar();
    fornecedor.enviarEmailConfirmacao();
  }
}
