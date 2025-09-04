import { inject, Injectable } from '@angular/core';
import {
  FormularioCadastro,
  IFormularioAluno,
  IFormularioFornecedor,
  IFormularioProfessor,
} from '../shared/interfaces/formulario-cadastro.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, switchMap, throwError } from 'rxjs';

type RespostaCadastro = { message: string };

const MENSAGENS_ERRO = {
  FORNECEDOR: 'Cadastro de fornecedor incompleto ou inválido',
  PROFESSOR: 'Cadastro de professor incompleto ou inválido',
  ALUNO: 'Cadastro de aluno incompleto ou inválido',
} as const;

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private readonly URL_BASE_CADASTRO = 'http://localhost:8080/cadastro';
  private http = inject(HttpClient);

  private formulario: Partial<FormularioCadastro> = {};

  atualizarFormulario(dados: Partial<FormularioCadastro>): void {
    this.formulario = { ...this.formulario, ...dados };
  }

  limparCampos(campos: string[]): void {
    campos.forEach((campo) => {
      if (campo in this.formulario) {
        delete this.formulario[campo as keyof FormularioCadastro];
      }
    });
  }

  limparFormulario(): void {
    this.formulario = {};
  }

  cadastrarFornecedor(): Observable<RespostaCadastro> {
    if (!this.validarFornecedor(this.formulario)) {
      return throwError(() => new HttpErrorResponse({ error: MENSAGENS_ERRO.FORNECEDOR }));
    }

    return this.http.post<RespostaCadastro>(
      `${this.URL_BASE_CADASTRO}/fornecedor`,
      this.formulario
    );
  }

  cadastrarProfessor(): Observable<RespostaCadastro> {
    return this.cadastrarPessoaComArquivo<IFormularioProfessor>(
      this.validarProfessor.bind(this),
      MENSAGENS_ERRO.PROFESSOR,
      'professor',
      'diploma'
    );
  }

  cadastrarAluno(): Observable<RespostaCadastro> {
    return this.cadastrarPessoaComArquivo<IFormularioAluno>(
      this.validarAluno.bind(this),
      MENSAGENS_ERRO.ALUNO,
      'aluno',
      'comprovanteEnsinoMedio'
    );
  }

  private cadastrarPessoaComArquivo<T extends FormularioCadastro>(
    validarDados: (dados: Partial<FormularioCadastro>) => dados is T,
    mensagemErro: string,
    endpoint: string,
    arquivoKey: keyof T
  ): Observable<RespostaCadastro> {
    if (!validarDados(this.formulario)) {
      return throwError(() => new HttpErrorResponse({ error: mensagemErro }));
    }

    const arquivo = this.formulario[arquivoKey];
    if (!(arquivo instanceof File)) {
      return throwError(() => new HttpErrorResponse({ error: mensagemErro }));
    }

    return from(this.converterArquivoParaBytes(arquivo)).pipe(
      switchMap((bytes) => {
        const dados = {
          ...this.formulario,
          [arquivoKey]: Array.from(bytes),
        };
        return this.http.post<RespostaCadastro>(`${this.URL_BASE_CADASTRO}/${endpoint}`, dados);
      })
    );
  }

  private converterArquivoParaBytes(arquivo: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();
      leitor.onload = () => {
        const buffer = leitor.result as ArrayBuffer;
        resolve(new Uint8Array(buffer));
      };
      leitor.onerror = reject;
      leitor.readAsArrayBuffer(arquivo);
    });
  }

  private validarCamposBase(dados: Partial<FormularioCadastro>): boolean {
    return (
      typeof dados.nome === 'string' &&
      typeof dados.email === 'string' &&
      typeof dados.telefone === 'string'
    );
  }

  private validarFornecedor(dados: Partial<IFormularioFornecedor>): dados is IFormularioFornecedor {
    return (
      this.validarCamposBase(dados) &&
      typeof dados.cnpj === 'string' &&
      typeof dados.tipoServico === 'string'
    );
  }

  private validarProfessor(dados: Partial<IFormularioProfessor>): dados is IFormularioProfessor {
    return (
      this.validarCamposBase(dados) &&
      typeof dados.cpf === 'string' &&
      Array.isArray(dados.disciplinasMinistradas) &&
      dados.diploma instanceof File
    );
  }

  private validarAluno(dados: Partial<IFormularioAluno>): dados is IFormularioAluno {
    return (
      this.validarCamposBase(dados) &&
      typeof dados.cpf === 'string' &&
      typeof dados.curso === 'string' &&
      dados.comprovanteEnsinoMedio instanceof File
    );
  }
}
