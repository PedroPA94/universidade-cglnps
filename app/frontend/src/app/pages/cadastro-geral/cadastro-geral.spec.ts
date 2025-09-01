import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroGeral } from './cadastro-geral';

describe('CadastroGeral', () => {
  let component: CadastroGeral;
  let fixture: ComponentFixture<CadastroGeral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroGeral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroGeral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
