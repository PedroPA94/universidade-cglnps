import { Component, inject } from '@angular/core';
import { Card } from '../../../components/card/card';
import { Botao } from '../../../components/botao/botao';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CadastroService } from '../../../services/cadastro';
import { IFormularioFornecedor } from '../../../shared/interfaces/formulario-cadastro.interface';

@Component({
  selector: 'app-fornecedor',
  imports: [ReactiveFormsModule, Card, Botao, RouterLink],
  templateUrl: './fornecedor.html',
  styleUrl: './fornecedor.css',
})
export class Fornecedor {
  fb = inject(FormBuilder);
  cadastroService = inject(CadastroService);

  formularioFornecedor = this.fb.group({
    tipoServico: ['', Validators.required],
  });

  enviar() {
    this.formularioFornecedor.markAllAsTouched();

    if (this.formularioFornecedor.invalid) return;

    this.cadastroService.atualizarFormulario(
      this.formularioFornecedor.value as IFormularioFornecedor
    );
  }
}
