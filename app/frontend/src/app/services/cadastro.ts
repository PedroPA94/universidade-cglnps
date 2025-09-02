import { Injectable } from '@angular/core';
import { FormularioCadastro } from '../shared/interfaces/formulario-cadastro.interface';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private formulario: Partial<FormularioCadastro> = {};

  atualizarFormulario(dados: Partial<FormularioCadastro>): void {
    this.formulario = { ...this.formulario, ...dados };
  }
}
