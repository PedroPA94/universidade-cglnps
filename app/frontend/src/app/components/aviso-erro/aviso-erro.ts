import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-aviso-erro',
  imports: [],
  templateUrl: './aviso-erro.html',
  styleUrl: './aviso-erro.css',
})
export class AvisoErro {
  mensagem = input.required<string>();
  fecharAviso = output();

  fechar() {
    this.fecharAviso.emit();
  }
}
