import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDesClientesComponent } from './listado-des-clientes.component';

describe('ListadoDesClientesComponent', () => {
  let component: ListadoDesClientesComponent;
  let fixture: ComponentFixture<ListadoDesClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDesClientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoDesClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
