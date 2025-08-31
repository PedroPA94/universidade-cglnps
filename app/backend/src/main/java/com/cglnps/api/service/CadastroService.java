package com.cglnps.api.service;

import com.cglnps.api.entity.Pessoa;
import com.cglnps.api.entity.PessoaFisica;
import com.cglnps.api.entity.PessoaJuridica;
import com.cglnps.api.exception.CnpjInvalidoException;
import com.cglnps.api.exception.CpfInvalidoException;
import org.springframework.stereotype.Service;

@Service
public class CadastroService {

  public void cadastrarPessoaJuridica(PessoaJuridica pessoaJuridica) throws CnpjInvalidoException {
    pessoaJuridica.validarCnpj();
    cadastrar(pessoaJuridica);
  }

  public void cadastrarPessoaFisica(PessoaFisica pessoaFisica) throws CpfInvalidoException {
    pessoaFisica.validarCpf();
    cadastrar(pessoaFisica);
  }

  private void cadastrar(Pessoa pessoa) {
    pessoa.cadastrar();
    pessoa.enviarEmailConfirmacao();
  }
}
