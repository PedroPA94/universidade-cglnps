import { Component, inject } from '@angular/core';
import { Card } from '../../components/card/card';
import { Botao } from '../../components/botao/botao';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroService } from '../../services/cadastro';
import {
  IFormularioFornecedor,
  IFormularioPF,
  IFormularioPJ,
} from '../../shared/interfaces/formulario-cadastro.interface';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, Card, Botao],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  private readonly QTD_DIGITOS_CPF = 11;
  private readonly QTD_DIGITOS_CNPJ = 14;

  fb = inject(FormBuilder);
  cadastroService = inject(CadastroService);
  router = inject(Router);

  formulario = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{10,11}$/),
        Validators.minLength(10),
        Validators.maxLength(11),
      ],
    ],
    identificacao: ['', [Validators.required, Validators.pattern(/^\d{11}$|^\d{14}$/)]],
  });

  voltar() {
    this.cadastroService.limparFormulario();
    this.router.navigate(['/home']);
  }

  continuar() {
    this.formulario.markAllAsTouched();

    if (!this.formulario.valid) return;

    this.cadastroService.limparFormulario();

    const { email, identificacao, nome, telefone } = this.formulario.getRawValue();

    if (identificacao?.length === this.QTD_DIGITOS_CPF) {
      this.cadastroService.atualizarFormulario({
        nome,
        email,
        telefone,
        cpf: identificacao,
      } as IFormularioPF);
      this.router.navigate(['/cadastro/pessoa-fisica']);
    } else if (identificacao?.length === this.QTD_DIGITOS_CNPJ) {
      this.cadastroService.atualizarFormulario({
        nome,
        email,
        telefone,
        cnpj: identificacao,
      } as IFormularioPJ);
      this.router.navigate(['/cadastro/fornecedor']);
    }
  }
}
