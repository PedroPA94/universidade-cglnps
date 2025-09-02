import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sucesso } from './sucesso';

describe('Sucesso', () => {
  let component: Sucesso;
  let fixture: ComponentFixture<Sucesso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sucesso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sucesso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
