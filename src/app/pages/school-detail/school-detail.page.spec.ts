import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController, IonicModule } from '@ionic/angular';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

import { SchoolDetailPage } from './school-detail.page';

describe('SchoolDetailPage', () => {
  let component: SchoolDetailPage;
  let fixture: ComponentFixture<SchoolDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolDetailPage],
      imports: [RouterTestingModule, IonicModule, SharedComponentsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});