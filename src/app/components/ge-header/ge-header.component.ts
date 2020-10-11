import { Component, Input } from '@angular/core'

@Component({
  selector: 'ge-header',
  templateUrl: './ge-header.component.html',
  styleUrls: ['./ge-header.component.scss'],
})
export class GeHeaderComponent {

  @Input() href: string

}