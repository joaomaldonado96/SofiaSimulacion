import {
  Component,
  OnInit,
  QueryList,
  ContentChildren,
  AfterContentInit,
  Input,
  OnChanges
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.sass']
})
export class TabsComponent implements OnInit, AfterContentInit, OnChanges {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Input() tabBorder: string;
  @Input() size12 = false;
  @Input() programming = false;

  public activeTab: number;
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (!this.tabBorder) {
      this.tabBorder = '#232326';
    }
  }

  ngAfterContentInit() {
    this.selectTab(this.tabs.first);
  }

  selectTab(tabSelected: TabComponent) {
    if (!tabSelected) {
      return;
    }
    this.activeTab = tabSelected.id;
    this.tabs.forEach(tab => {
      tab.setVisible(tab.id === tabSelected.id);
    });
  }
}
