import { Component, inject } from '@angular/core';
import { Card } from '../../../components/card/card';
import { AvisoErro } from '../../../components/aviso-erro/aviso-erro';
import { Botao } from '../../../components/botao/botao';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from '../../../services/cadastro';
import { HttpErrorResponse } from '@angular/common/http';
import { NgSelectComponent } from '@ng-select/ng-select';
import { UploadArquivo } from '../../../components/upload-arquivo/upload-arquivo';
import { IFormularioProfessor } from '../../../shared/interfaces/formulario-cadastro.interface';

@Component({
  selector: 'app-pessoa-fisica',
  imports: [ReactiveFormsModule, Card, AvisoErro, Botao, NgSelectComponent, UploadArquivo],
  templateUrl: './pessoa-fisica.html',
  styleUrl: './pessoa-fisica.css',
})
export class PessoaFisica {
  fb = inject(FormBuilder);
  cadastroService = inject(CadastroService);
  router = inject(Router);

  selecaoTipoPessoaFisica = this.fb.control('', Validators.required);

  formularioProfessor = this.fb.group({
    disciplinasMinistradas: this.fb.control<string[]>([], Validators.required),
    diploma: this.fb.control<File | null>(null, [Validators.required]),
  });

  mensagemErro = '';

  disciplinasDisponiveis = [
    'Análise e Desenvolvimento de Sistemas',
    'Banco de Dados',
    'Sistemas para Internet',
    'Segurança da Informação',
    'Defesa Cibernética',
  ];

  voltar() {
    this.cadastroService.limparCampos(['disciplinas', 'diploma']);
    this.router.navigate(['/cadastro']);
  }

  enviar() {
    this.selecaoTipoPessoaFisica.markAllAsTouched();

    if (this.selecaoTipoPessoaFisica.invalid) return;

    this.formularioProfessor.markAllAsTouched();

    if (this.formularioProfessor.invalid) return;

    this.cadastroService.atualizarFormulario(
      this.formularioProfessor.value as IFormularioProfessor
    );

    this.cadastroService.cadastrarProfessor().subscribe({
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
