import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaFisica } from './pessoa-fisica';

describe('PessoaFisica', () => {
  let component: PessoaFisica;
  let fixture: ComponentFixture<PessoaFisica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaFisica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaFisica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
