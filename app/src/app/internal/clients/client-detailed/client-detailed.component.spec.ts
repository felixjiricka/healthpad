import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailedComponent } from './client-detailed.component';

describe('ClientDetailedComponent', () => {
  let component: ClientDetailedComponent;
  let fixture: ComponentFixture<ClientDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
