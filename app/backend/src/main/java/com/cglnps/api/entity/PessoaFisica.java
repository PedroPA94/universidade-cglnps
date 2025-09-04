package com.cglnps.api.entity;

import com.cglnps.api.exception.CpfInvalidoException;

public abstract class PessoaFisica extends Pessoa implements Identificavel {
  private String cpf;

  public PessoaFisica(String nome, String email, String telefone, String cpf) {
    super(nome, email, telefone);
    this.cpf = cpf;
  }

  public String getCpf() {
    return cpf;
  }

  public void setCpf(String cpf) {
    this.cpf = cpf;
  }

  @Override
  public String getDocumento() {
    return cpf;
  }

  public void validarCpf() throws CpfInvalidoException {
    if (cpf == null) throw new CpfInvalidoException("CPF é nulo");

    String cpfLimpo = cpf.replaceAll("\\D", "");
    if (cpfLimpo.length() != 11) throw new CpfInvalidoException("CPF deve ter 11 dígitos");

    if (cpfLimpo.chars().distinct().count() == 1)
      throw new CpfInvalidoException("CPF com todos os dígitos iguais é inválido");

    int[] pesos1 = {10, 9, 8, 7, 6, 5, 4, 3, 2};
    int[] pesos2 = {11, 10, 9, 8, 7, 6, 5, 4, 3, 2};

    int soma = 0;
    for (int i = 0; i < 9; i++) {
      soma += Character.getNumericValue(cpfLimpo.charAt(i)) * pesos1[i];
    }
    int digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    soma = 0;
    for (int i = 0; i < 10; i++) {
      soma += Character.getNumericValue(cpfLimpo.charAt(i)) * pesos2[i];
    }
    int digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (digito1 != Character.getNumericValue(cpfLimpo.charAt(9)) ||
            digito2 != Character.getNumericValue(cpfLimpo.charAt(10))) {
      throw new CpfInvalidoException("O CPF informado é inválido.");
    }
  }
}
