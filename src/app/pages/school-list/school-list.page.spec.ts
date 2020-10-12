import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { RouterTestingModule } from "@angular/router/testing"
import { IonicModule } from '@ionic/angular'
import { SharedComponentsModule } from 'src/app/components/shared-components.module'
import { MockSchoolServiceElements, MockSchoolServiceEmpty, MockSchoolServiceLoading } from 'src/app/services/school.mock.spec'
import { SchoolService } from 'src/app/services/school.service'

import { SchoolListPage } from './school-list.page'

describe('SchoolListPage Loading', () => {
  let component: SchoolListPage
  let fixture: ComponentFixture<SchoolListPage>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolListPage],
      imports: [RouterTestingModule, IonicModule, SharedComponentsModule, FormsModule],
      providers: [{ provide: SchoolService, useClass: MockSchoolServiceLoading }]
    }).compileComponents()

    fixture = TestBed.createComponent(SchoolListPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(component.loading).toBeTrue()
    expect(component.schools.length).toEqual(0)
  })
})

describe('SchoolListPage Schools Empty', () => {
  let component: SchoolListPage
  let fixture: ComponentFixture<SchoolListPage>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolListPage],
      imports: [RouterTestingModule, IonicModule, SharedComponentsModule, FormsModule],
      providers: [{ provide: SchoolService, useClass: MockSchoolServiceEmpty }]
    }).compileComponents()

    fixture = TestBed.createComponent(SchoolListPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(component.loading).toBeFalse()
    expect(component.schools.length).toEqual(0)
  })

  it('should stay empty array when search_text changed', () => {
    component.search_text = "ABC";
    expect(component.schools.length).toEqual(0)
  })
})

describe('SchoolListPage Schools with elements', () => {
  let component: SchoolListPage
  let fixture: ComponentFixture<SchoolListPage>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolListPage],
      imports: [RouterTestingModule, IonicModule, SharedComponentsModule, FormsModule],
      providers: [{ provide: SchoolService, useClass: MockSchoolServiceElements }]
    }).compileComponents()

    fixture = TestBed.createComponent(SchoolListPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(component.loading).toBeFalse()
    expect(component.schools.length).toBeGreaterThan(0)
  })

  it('should filter when search_text bigger than 2', ()=>{
    component.search_text = "ABC"
    component.filterSchools()
    expect(component.schools.length).toEqual(1)
  })

  it('should go back to normal list when search_text is deleted', ()=>{
    component.search_text = "ABC"
    component.filterSchools()
    component.search_text = ""
    component.filterSchools()
    expect(component.schools.length).toEqual(2)
  })
})
