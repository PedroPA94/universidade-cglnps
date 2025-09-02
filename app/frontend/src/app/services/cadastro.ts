import { inject, Injectable } from '@angular/core';
import {
  FormularioCadastro,
  IFormularioFornecedor,
} from '../shared/interfaces/formulario-cadastro.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private readonly BASE_URL_CADASTRO = 'http://localhost:8080/cadastro';
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
      throw new Error('Formulário de fornecedor incompleto ou inválido');
    }

    return this.http.post(this.BASE_URL_CADASTRO + '/fornecedor', this.formulario);
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
}
