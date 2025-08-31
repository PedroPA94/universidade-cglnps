package com.cglnps.api.entity;

import com.cglnps.api.exception.CnpjInvalidoException;

public abstract class PessoaJuridica extends Pessoa {
  private String cnpj;

  public PessoaJuridica(Long id, String nome, String email, String telefone, String cnpj) throws CnpjInvalidoException {
    super(id, nome, email, telefone);
    this.cnpj = cnpj;
  }

  public String getCnpj() {
    return cnpj;
  }

  public void setCnpj(String cnpj) {
    this.cnpj = cnpj;
  }

  public void validarCnpj() throws CnpjInvalidoException {
    if (cnpj == null) throw new CnpjInvalidoException("CNPJ é nulo");

    String cnpjLimpo = cnpj.replaceAll("\\D", "");

    if (cnpjLimpo.length() != 14) throw new CnpjInvalidoException("CNPJ deve ter 14 dígitos");

    if (cnpjLimpo.chars().distinct().count() == 1)
      throw new CnpjInvalidoException("CNPJ com todos os dígitos iguais é inválido");

    int[] pesos1 = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
    int[] pesos2 = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
    int soma = 0;

    for (int i = 0; i < 12; i++) {
      soma += Character.getNumericValue(cnpjLimpo.charAt(i)) * pesos1[i];
    }
    int digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    soma = 0;
    for (int i = 0; i < 13; i++) {
      soma += Character.getNumericValue(cnpjLimpo.charAt(i)) * pesos2[i];
    }
    int digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (digito1 != Character.getNumericValue(cnpjLimpo.charAt(12)) ||
            digito2 != Character.getNumericValue(cnpjLimpo.charAt(13))) {
      throw new CnpjInvalidoException("O CNPJ informado é inválido.");
    }
  }
}
