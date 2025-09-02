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
}
