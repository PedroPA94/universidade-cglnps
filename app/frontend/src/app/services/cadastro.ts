import { inject, Injectable } from '@angular/core';
import {
  FormularioCadastro,
  IFormularioAluno,
  IFormularioFornecedor,
  IFormularioProfessor,
} from '../shared/interfaces/formulario-cadastro.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, switchMap, throwError } from 'rxjs';

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

  cadastrarFornecedor(): Observable<any> {
    if (!this.validarFornecedor(this.formulario)) {
      return throwError(
        () => new HttpErrorResponse({ error: 'Cadastro de fornecedor incompleto ou inválido' })
      );
    }

    return this.http.post(this.URL_BASE_CADASTRO + '/fornecedor', this.formulario);
  }

  cadastrarProfessor(): Observable<any> {
    if (!this.validarProfessor(this.formulario)) {
      return throwError(
        () => new HttpErrorResponse({ error: 'Cadastro de professor incompleto ou inválido' })
      );
    }

    return from(this.converterArquivoParaBytes(this.formulario.diploma)).pipe(
      switchMap((bytes) => {
        const dados = {
          ...this.formulario,
          diploma: Array.from(bytes),
        };
        return this.http.post(this.URL_BASE_CADASTRO + '/professor', dados);
      })
    );
  }

  cadastrarAluno(): Observable<any> {
    if (!this.validarAluno(this.formulario)) {
      return throwError(
        () => new HttpErrorResponse({ error: 'Cadastro de aluno incompleto ou inválido' })
      );
    }

    return from(this.converterArquivoParaBytes(this.formulario.comprovanteEnsinoMedio)).pipe(
      switchMap((bytes) => {
        const dados = {
          ...this.formulario,
          comprovanteEnsinoMedio: Array.from(bytes),
        };
        return this.http.post(this.URL_BASE_CADASTRO + '/aluno', dados);
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

  private validarFornecedor(dados: Partial<IFormularioFornecedor>): dados is IFormularioFornecedor {
    return (
      typeof dados.nome === 'string' &&
      typeof dados.email === 'string' &&
      typeof dados.telefone === 'string' &&
      typeof dados.cnpj === 'string' &&
      typeof dados.tipoServico === 'string'
    );
  }

  private validarProfessor(dados: Partial<IFormularioProfessor>): dados is IFormularioProfessor {
    return (
      typeof dados.nome === 'string' &&
      typeof dados.email === 'string' &&
      typeof dados.telefone === 'string' &&
      typeof dados.cpf === 'string' &&
      typeof dados.disciplinasMinistradas === 'object' &&
      typeof dados.diploma === 'object'
    );
  }

  private validarAluno(dados: Partial<IFormularioAluno>): dados is IFormularioAluno {
    return (
      typeof dados.nome === 'string' &&
      typeof dados.email === 'string' &&
      typeof dados.telefone === 'string' &&
      typeof dados.cpf === 'string' &&
      typeof dados.curso === 'string' &&
      typeof dados.comprovanteEnsinoMedio === 'object'
    );
  }
}
