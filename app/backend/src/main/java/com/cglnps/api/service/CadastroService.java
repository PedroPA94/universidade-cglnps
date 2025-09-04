package com.cglnps.api.service;

import com.cglnps.api.entity.Identificavel;
import com.cglnps.api.entity.Pessoa;
import com.cglnps.api.entity.PessoaFisica;
import com.cglnps.api.entity.PessoaJuridica;
import com.cglnps.api.exception.CnpjInvalidoException;
import com.cglnps.api.exception.CpfInvalidoException;
import com.cglnps.api.exception.PessoaJaCadastradaException;
import com.cglnps.api.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CadastroService {
  private final PessoaRepository pessoaRepository;

  @Autowired
  public CadastroService(PessoaRepository pessoaRepository) {
    this.pessoaRepository = pessoaRepository;
  }

  public void verificarPessoaCadastrada(String identificacao) throws PessoaJaCadastradaException {
    if (this.pessoaRepository.existePessoa(identificacao)) {
      throw new PessoaJaCadastradaException("CPF/CNPJ em uso");
    };
  }

  public void cadastrarPessoaJuridica(PessoaJuridica pessoaJuridica) throws CnpjInvalidoException {
    pessoaJuridica.validarCnpj();
    cadastrar(pessoaJuridica);
  }

  public void cadastrarPessoaFisica(PessoaFisica pessoaFisica) throws CpfInvalidoException {
    pessoaFisica.validarCpf();
    cadastrar(pessoaFisica);
  }

  private void cadastrar(Pessoa pessoa) {
    if (pessoa instanceof Identificavel identificavel) {
      pessoaRepository.salvarPessoa(identificavel.getDocumento());
    }

    pessoa.cadastrar();
    pessoa.enviarEmailConfirmacao();
  }
}
