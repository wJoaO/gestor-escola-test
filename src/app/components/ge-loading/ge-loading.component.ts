import { Component, Input } from '@angular/core';

@Component({
  selector: 'ge-loading',
  templateUrl: './ge-loading.component.html',
  styleUrls: ['./ge-loading.component.scss']
})
export class GeLoadingComponent {
  @Input() loading: boolean;
}
