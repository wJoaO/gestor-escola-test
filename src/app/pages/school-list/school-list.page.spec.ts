import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchoolListPage } from './school-list.page';

describe('SchoolListPage', () => {
  let component: SchoolListPage;
  let fixture: ComponentFixture<SchoolListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
