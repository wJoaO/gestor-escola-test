import { ReplaySubject } from 'rxjs'
import { School } from "src/models/school"

export class MockSchoolServiceLoading {

    schools_update$: ReplaySubject<void> = new ReplaySubject<void>(1)

    schools: School[] = []

    loading: boolean = true;

    constructor() { }
}

export class MockSchoolServiceEmpty {

    schools_update$: ReplaySubject<void> = new ReplaySubject<void>(1)

    schools: School[] = []

    loading: boolean = false;

    constructor() {
        this.schools_update$.next()
    }
}

export class MockSchoolServiceElements {

    schools_update$: ReplaySubject<void> = new ReplaySubject<void>(1)

    schools: School[] = [
        new School({ name: "ABC", classrooms: ["TurmaA", "TurmaB"] }),
        new School({ name: "DEF", classrooms: ["TurmaC", "TurmaD"] }),
    ]

    loading: boolean = false;

    constructor() {
        this.schools_update$.next()
    }
}