import { Injectable } from '@angular/core';
import { IFormularioCadastro } from '../shared/interfaces/formulario-cadastro.interface';

@Injectable({
  providedIn: 'root',
})
export class Cadastro {
  private formulario: Partial<IFormularioCadastro> = {};

  atualizar(dados: Partial<IFormularioCadastro>): void {
    this.formulario = { ...this.formulario, ...dados };
  }
}
