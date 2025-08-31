package com.cglnps.api.controller;

import com.cglnps.api.controller.dto.CadastroFornecedorDto;
import com.cglnps.api.exception.CnpjInvalidoException;
import com.cglnps.api.exception.TipoServicoInvalidoException;
import com.cglnps.api.service.CadastroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cadastro")
public class CadastroController {
  private final CadastroService cadastroService;

  @Autowired
  public CadastroController(CadastroService cadastroService) {
    this.cadastroService = cadastroService;
  }

  @PostMapping("/fornecedor")
  @ResponseStatus(HttpStatus.CREATED)
  public void cadastrarFornecedor(@RequestBody CadastroFornecedorDto cadastroFornecedorDto) throws CnpjInvalidoException, TipoServicoInvalidoException {
    cadastroService.cadastrarFornecedor(cadastroFornecedorDto.paraEntidade());
  }
}
