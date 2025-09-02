import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoErro } from './aviso-erro';

describe('AvisoErro', () => {
  let component: AvisoErro;
  let fixture: ComponentFixture<AvisoErro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisoErro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisoErro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
