import { Component, input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-upload-arquivo',
  imports: [],
  templateUrl: './upload-arquivo.html',
  styleUrl: './upload-arquivo.css',
})
export class UploadArquivo {
  label = input.required<string>();
  control = input.required<FormControl>();

  ngOnInit(): void {
    this.control().setValidators([
      this.tamanhoMaximoValidator(1024 * 1024), // 1MB
      this.tipoArquivoValidator(['image/jpeg']),
    ]);
  }

  arquivoSelecionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.control().patchValue(file);
      this.control().updateValueAndValidity();
    }
  }

  tamanhoMaximoValidator(maxSize: number) {
    return (control: AbstractControl) => {
      const file = control.value as File | null;
      if (file && file.size > maxSize) {
        return { tamanhoExcedido: true };
      }
      return null;
    };
  }

  tipoArquivoValidator(allowedTypes: string[]) {
    return (control: AbstractControl) => {
      const file = control.value as File | null;
      if (file && !allowedTypes.includes(file.type)) {
        return { tipoInvalido: true };
      }
      return null;
    };
  }
}
