import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnvehiculoComponent } from './unvehiculo.component';

describe('UnvehiculoComponent', () => {
  let component: UnvehiculoComponent;
  let fixture: ComponentFixture<UnvehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnvehiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnvehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
