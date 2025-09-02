import { Component, inject } from '@angular/core';
import { Card } from '../../components/card/card';
import { Botao } from '../../components/botao/botao';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroService } from '../../services/cadastro';
import {
  IFormularioFornecedor,
  IFormularioPF,
  IFormularioPJ,
} from '../../shared/interfaces/formulario-cadastro.interface';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, Card, Botao, RouterLink],
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
    nome: ['teste', Validators.required],
    email: ['t@t', [Validators.required, Validators.email]],
    telefone: [
      '1234567890',
      [
        Validators.required,
        Validators.pattern(/^\d{10,11}$/),
        Validators.minLength(10),
        Validators.maxLength(11),
      ],
    ],
    identificacao: [
      '12345678901234',
      [Validators.required, Validators.pattern(/^\d{11}$|^\d{14}$/)],
    ],
  });

  continuar() {
    this.formulario.markAllAsTouched();

    if (!this.formulario.valid) return;

    const { email, identificacao, nome, telefone } = this.formulario.getRawValue();

    if (identificacao?.length === this.QTD_DIGITOS_CPF) {
      this.cadastroService.atualizarFormulario({
        nome,
        email,
        telefone,
        cpf: identificacao,
      } as IFormularioPF);
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
