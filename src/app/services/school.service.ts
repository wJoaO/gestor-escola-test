import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { School } from 'src/models/school';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  // Subject chamado quando houver atualizações em schools.
  schools_update$: ReplaySubject<void> = new ReplaySubject<void>(1)

  // Armazena a lista de escolas em tempo real.
  schools: School[] = []

  // Será false se já foi recebido pelo menos uma vez a lista de escolas.
  loading: boolean = true

  constructor() {
    this.load()
  }

  load(): void {
    School.realtime<School>([], [
      {
        name: 'name',
        type: 'asc'
      }
    ]).subscribe((schools: School[]) => {
      this.schools = schools
      this.loading = false
      this.schools_update$.next()
    })
  }
}
