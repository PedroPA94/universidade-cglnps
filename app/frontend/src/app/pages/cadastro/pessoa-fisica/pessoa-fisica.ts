import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../../../components/card/card';
import { AvisoErro } from '../../../components/aviso-erro/aviso-erro';
import { Botao } from '../../../components/botao/botao';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from '../../../services/cadastro';
import { HttpErrorResponse } from '@angular/common/http';
import { NgSelectComponent } from '@ng-select/ng-select';
import { UploadArquivo } from '../../../components/upload-arquivo/upload-arquivo';
import {
  IFormularioAluno,
  IFormularioProfessor,
} from '../../../shared/interfaces/formulario-cadastro.interface';

enum TipoPessoaFisica {
  ALUNO = 'ALUNO',
  PROFESSOR = 'PROFESSOR',
}

interface FormularioBase {
  markAllAsTouched(): void;
  invalid: boolean;
  value: any;
}

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

  tipoPessoaFisica = TipoPessoaFisica; // Para usar no template
  selecaoTipoPessoaFisica = this.fb.control<TipoPessoaFisica | null>(null, Validators.required);

  formularioProfessor = this.fb.group({
    disciplinasMinistradas: this.fb.control<string[]>([], Validators.required),
    diploma: this.fb.control<File | null>(null, [Validators.required]),
  });
  camposProfessor = ['disciplinasMinistradas', 'diploma'];

  formularioAluno = this.fb.group({
    curso: this.fb.control<string | null>(null, Validators.required),
    comprovanteEnsinoMedio: this.fb.control<File | null>(null, [Validators.required]),
  });
  camposAluno = ['curso', 'comprovanteEnsinoMedio'];

  mensagemErro = '';

  disciplinasDisponiveis = [
    'Análise e Desenvolvimento de Sistemas',
    'Banco de Dados',
    'Sistemas para Internet',
    'Segurança da Informação',
    'Defesa Cibernética',
  ];

  voltar() {
    this.cadastroService.limparCampos([...this.camposProfessor, ...this.camposAluno]);
    this.router.navigate(['/cadastro']);
  }

  enviar() {
    this.selecaoTipoPessoaFisica.markAllAsTouched();

    if (this.selecaoTipoPessoaFisica.invalid) return;

    if (this.selecaoTipoPessoaFisica.value === TipoPessoaFisica.ALUNO) {
      this.cadastrarAluno();
      return;
    }

    this.cadastrarProfessor();
  }

  cadastrarAluno() {
    this.cadastrarPessoaFisica<IFormularioAluno>(
      this.formularioAluno,
      [...this.camposProfessor],
      () => this.cadastroService.cadastrarAluno()
    );
  }

  cadastrarProfessor() {
    this.cadastrarPessoaFisica<IFormularioProfessor>(
      this.formularioProfessor,
      [...this.camposAluno],
      () => this.cadastroService.cadastrarProfessor()
    );
  }

  private cadastrarPessoaFisica<T extends IFormularioAluno | IFormularioProfessor>(
    formulario: FormularioBase,
    camposParaLimpar: string[],
    cadastrarFn: () => Observable<any>
  ) {
    formulario.markAllAsTouched();

    if (formulario.invalid) return;

    this.cadastroService.limparCampos(camposParaLimpar);
    this.cadastroService.atualizarFormulario(formulario.value as T);

    cadastrarFn().subscribe({
      next: () => {
        this.router.navigate(['/cadastro/sucesso']);
      },
      error: (err: HttpErrorResponse) => {
        this.mensagemErro = typeof err.error === 'string' ? err.error : 'Erro ao cadastrar';
      },
    });
  }

  fecharAviso() {
    this.mensagemErro = '';
  }
}
