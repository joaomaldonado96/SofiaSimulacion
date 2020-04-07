import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatformTemplateComponent } from '../container/platform-template/platform-template.component';
import { HomeComponent } from '../components/home/home.component';
import { ModulesComponent } from '../components/modules/modules.component';
import { SimuationTestComponent } from '../components/simuation-test/simuation-test.component';



const routes: Routes = [
  {
    path: '',
    component: PlatformTemplateComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'modules',
        component: ModulesComponent
      },
      {
        path: 'simulation',
        component: SimuationTestComponent
      }
      /*,{
        path: 'seguimiento',
        loadChildren: () => import('src/app/freight-status.module').then(m => m.FreightStatusModule)
      },*/
    ]
  }
  /*,{
    path: 'vehiculos',
    component: VehiclesViewMapComponent
  }*/
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
