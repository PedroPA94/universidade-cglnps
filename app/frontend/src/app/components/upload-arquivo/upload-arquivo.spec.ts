import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadArquivo } from './upload-arquivo';

describe('UploadArquivo', () => {
  let component: UploadArquivo;
  let fixture: ComponentFixture<UploadArquivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadArquivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadArquivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
