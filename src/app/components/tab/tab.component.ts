import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.sass']
})
export class TabComponent {
  @Input() label: string;
  public id: number;
  public visible: boolean;

  constructor() {
    this.id = Math.floor(Math.random() * 100000);
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    return visible;
  }

}
