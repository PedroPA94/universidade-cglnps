import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fornecedor } from './fornecedor';

describe('Fornecedor', () => {
  let component: Fornecedor;
  let fixture: ComponentFixture<Fornecedor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fornecedor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fornecedor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
