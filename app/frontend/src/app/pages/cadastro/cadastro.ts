import { Component, inject } from '@angular/core';
import { Card } from '../../components/card/card';
import { Botao } from '../../components/botao/botao';
import { RouterLink } from '@angular/router';
import { Input } from '../../components/input/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, Card, Botao, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  fb = inject(FormBuilder);

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

  clique() {
    this.formulario.markAllAsTouched();
    console.log(this.formulario.getRawValue());
    console.log(this.formulario.valid);
  }
}
