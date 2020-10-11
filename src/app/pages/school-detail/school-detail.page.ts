import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { School } from 'src/models/school';

@Component({
  selector: 'app-school-detail',
  templateUrl: './school-detail.page.html',
  styleUrls: ['./school-detail.page.scss'],
})
export class SchoolDetailPage implements OnInit {

  name: string = ""

  classrooms: string[] = []

  loading: boolean = true

  school: School

  constructor(
    private ref: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.load()
  }

  async load() {

    this.loading = true
    this.ref.detectChanges()

    const params = await this.route.params.pipe(first()).toPromise()
    const id: string = params.id
    if (id) {
      this.school = await School.object(id)
      this.name = this.school.name || ""
      this.classrooms = this.school.classrooms || []
    } else {
      this.school = null
    }

    this.loading = false
    this.ref.detectChanges()
  }

  async save(): Promise<void> {
    // Validações
    if (this.name == "") {
      await this.show_error("Preencha o nome da escola")
      return
    }

    this.loading = true
    this.ref.detectChanges()

    try {
      // Realizar o update
      const update = {
        name: this.name,
        classrooms: this.classrooms
      }
      if (this.school) {
        await this.school.update(update)
      }
      else {
        const school = new School(update)
        await school.save()
      }

      const toast = await this.toastCtrl.create({
        message: 'Escola salva com sucesso',
        duration: 2000
      });
      toast.present();

      this.navCtrl.navigateRoot("escola/lista")

    } catch (error) {
      await this.show_error("Algo de errado aconteceu!")
    }

    this.loading = false
    this.ref.detectChanges()
  }

  async remove() {
    await this.school.remove()
  }

  async add_classroom() {
    const alert = await this.alertCtrl.create({
      header: 'Adicionar turma',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nome'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Adicionar',
          handler: (info) => {
            this.classrooms.push(info.name);
            this.classrooms = this.classrooms.sort()
            this.ref.detectChanges()
          }
        }
      ]
    });

    await alert.present();
  }

  async show_error(message: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'danger-alert',
      header: 'Erro ao salvar',
      message: message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

  async remove_classroom(classroom: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'danger-alert',
      header: 'Excluir',
      message: `Tem certeza que deseja excluir a turma ${classroom}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Remover',
          role: 'remove',
          handler: () => {
            this.classrooms = this.classrooms.filter((c) => c != classroom)
            this.ref.detectChanges()
          }
        }
      ]
    })

    await alert.present()
  }


}
