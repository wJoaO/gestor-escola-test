import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchoolDetailPage } from './school-detail.page';

describe('SchoolDetailPage', () => {
  let component: SchoolDetailPage;
  let fixture: ComponentFixture<SchoolDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
