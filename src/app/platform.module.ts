import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformTemplateComponent } from './container/platform-template/platform-template.component';
import { PlatformHeaderComponent } from './container/platform-header/platform-header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PlatformRoutingModule } from './routes/platform.routing';
import { HomeComponent } from './components/home/home.component';
import { ModulesComponent } from './components/modules/modules.component';
import { SimuationTestComponent } from './components/simuation-test/simuation-test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { TabComponent } from './components/tab/tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ChartsModule } from 'ng2-charts';
import { ChartResultComponent } from './components/chart-result/chart-result.component';


@NgModule({
  declarations: [
    PlatformTemplateComponent,
     PlatformHeaderComponent,
      HomeComponent,
       ModulesComponent,
        SimuationTestComponent,
         TabComponent,
          TabsComponent,
          ChartResultComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    PlatformRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    ChartsModule
  ]
})
export class PlatformModule { }
