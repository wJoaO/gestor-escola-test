import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeLoadingComponent } from './ge-loading.component';

describe('GeLoadingComponent', () => {
  let component: GeLoadingComponent;
  let fixture: ComponentFixture<GeLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
