import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { SchoolService } from 'src/app/services/school.service';
import { School } from 'src/models/school';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.page.html',
  styleUrls: ['./school-list.page.scss'],
})
export class SchoolListPage implements OnInit, OnDestroy {

  search_text: string = ""

  schools: School[] = []

  get loading(): boolean {
    return this.schoolService.loading
  }

  subscription: Subscription

  constructor(
    private schoolService: SchoolService,
    private ref: ChangeDetectorRef,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit(): void {
    this.subscription = this.schoolService.schools_update$.subscribe(() => {
      this.filterSchools()
      this.ref.detectChanges()
    })
  }

  filterSchools(): void {
    if (this.search_text.length < 3) {
      this.schools = this.schoolService.schools
      return
    }

    this.schools = this.schoolService.schools.filter((school) => {
      return school.name.toLocaleLowerCase().indexOf(this.search_text.toLocaleLowerCase()) >= 0
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

  add(): void {
    this.navCtrl.navigateForward("escola/detalhe")
  }

  detail(school: School): void {
    this.navCtrl.navigateForward(["escola/detalhe", school.id])
  }

  async remove(school: School): Promise<void> {
    const alert = await this.alertCtrl.create({
      cssClass: 'danger-alert',
      header: 'Excluir',
      message: `Tem certeza que deseja excluir a ${school.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Remover',
          role: 'remove',
          handler: async () => {
            await school.remove()
          }
        }
      ]
    })

    await alert.present()
  }

}
