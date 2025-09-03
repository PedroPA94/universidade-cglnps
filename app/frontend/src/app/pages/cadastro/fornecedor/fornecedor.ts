import { Component, inject } from '@angular/core';
import { Card } from '../../../components/card/card';
import { Botao } from '../../../components/botao/botao';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CadastroService } from '../../../services/cadastro';
import { IFormularioFornecedor } from '../../../shared/interfaces/formulario-cadastro.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { AvisoErro } from '../../../components/aviso-erro/aviso-erro';

@Component({
  selector: 'app-fornecedor',
  imports: [ReactiveFormsModule, Card, Botao, AvisoErro],
  templateUrl: './fornecedor.html',
  styleUrl: './fornecedor.css',
})
export class Fornecedor {
  fb = inject(FormBuilder);
  cadastroService = inject(CadastroService);
  router = inject(Router);

  formularioFornecedor = this.fb.group({
    tipoServico: ['', Validators.required],
  });

  mensagemErro = '';

  voltar() {
    this.cadastroService.limparCampos(['tipoServico']);
    this.router.navigate(['/cadastro']);
  }

  enviar() {
    this.formularioFornecedor.markAllAsTouched();

    if (this.formularioFornecedor.invalid) return;

    this.cadastroService.atualizarFormulario(
      this.formularioFornecedor.value as IFormularioFornecedor
    );

    this.cadastroService.cadastrarFornecedor().subscribe({
      next: () => {
        this.router.navigate(['/cadastro/sucesso']);
      },
      error: (err: HttpErrorResponse) => {
        this.mensagemErro = err.error;
      },
    });
  }

  fecharAviso() {
    this.mensagemErro = '';
  }
}
