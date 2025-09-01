import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

type TipoBotao = 'primario' | 'secundario';

@Component({
  selector: 'app-botao',
  imports: [NgClass],
  templateUrl: './botao.html',
  styleUrl: './botao.css',
})
export class Botao {
  tipo = input.required<TipoBotao>();
}
