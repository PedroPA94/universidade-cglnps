package com.cglnps.api.controller;

import com.cglnps.api.controller.dto.CadastroAlunoDto;
import com.cglnps.api.controller.dto.CadastroFornecedorDto;
import com.cglnps.api.controller.dto.CadastroProfessorDto;
import com.cglnps.api.exception.CnpjInvalidoException;
import com.cglnps.api.exception.CpfInvalidoException;
import com.cglnps.api.exception.DocumentoInvalidoException;
import com.cglnps.api.exception.TipoServicoInvalidoException;
import com.cglnps.api.service.CadastroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cadastro")
@CrossOrigin(origins = "http://localhost:4200")
public class CadastroController {
  private final CadastroService cadastroService;

  @Autowired
  public CadastroController(CadastroService cadastroService) {
    this.cadastroService = cadastroService;
  }

  @PostMapping("/fornecedor")
  @ResponseStatus(HttpStatus.CREATED)
  public void cadastrarFornecedor(@RequestBody CadastroFornecedorDto cadastroFornecedorDto) throws CnpjInvalidoException, TipoServicoInvalidoException {
    cadastroService.cadastrarPessoaJuridica(cadastroFornecedorDto.paraEntidade());
  }

  @PostMapping("/professor")
  @ResponseStatus(HttpStatus.CREATED)
  public void cadastrarProfessor(@RequestBody CadastroProfessorDto cadastroProfessorDto) throws CpfInvalidoException, DocumentoInvalidoException {
    cadastroService.cadastrarPessoaFisica(cadastroProfessorDto.paraEntidade());
  }

  @PostMapping("/aluno")
  @ResponseStatus(HttpStatus.CREATED)
  public void cadastrarAluno(@RequestBody CadastroAlunoDto cadastroAlunoDto) throws CpfInvalidoException, DocumentoInvalidoException {
    cadastroService.cadastrarPessoaFisica(cadastroAlunoDto.paraEntidade());
  }
}
