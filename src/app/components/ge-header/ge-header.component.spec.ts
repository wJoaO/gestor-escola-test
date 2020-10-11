import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeHeaderComponent } from './ge-header.component';

describe('GeHeaderComponent', () => {
  let component: GeHeaderComponent;
  let fixture: ComponentFixture<GeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
