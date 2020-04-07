import { Component, OnInit, ViewChild } from '@angular/core';
import { Celda } from 'src/app/classes/celda.class';
import * as gaussian from 'gaussian-elimination';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-simuation-test',
  templateUrl: './simuation-test.component.html',
  styleUrls: ['./simuation-test.component.sass']
})
export class SimuationTestComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Presiones vs Tiempo (meses)' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'black',
          },
          ticks: {
            fontColor: 'black',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: '#5fc2666e',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  public maya = [];
  public n: any;
  public m: any;
  public time: any;
  public presionInicial = 100;
  public ct: any;
  public presionLimite = 0;
  public dt: any;
  public ecuaiones = [];
  public resultados = [];
  public done = false;
  public sortRes = [];
  public doneSort = false;
  public chartData = [];
  public chartObject = {
    data: [],
    label: 'Presiones vs Tiempo (meses)'
  };
  public labels = [];

  constructor() { }

  ngOnInit() {
  }

  mayaData() {
    this.resultados = [];
    this.maya = [];
    for (let index = 0; index < this.m; index++) {
      const arrayRow = [];
      for (let index1 = 0; index1 < this.n; index1++) {
        const celda = new Celda();
        celda.i = index1 + 1;
        celda.j = index + 1;
        if ( index1 === 0 ) {
          celda.timenos = 0;
        }
        if ( index1 === this.n - 1 ) {
          celda.timas = 0;
        }
        celda.presion = this.presionInicial;
        celda.qi = 0;
        celda.x = 100;
        celda.y = 100;
        celda.h = 100;
        celda.viscosidad = 50;
        arrayRow.push(celda);
      }
      this.maya.push(arrayRow);
    }
    console.log(this.maya);
  }

  simulation() {
    this.celdasCalculateTs();
    console.log(this.maya);
    this.calAVData();
    this.resultados = [];
    for (let dt = 0; dt < Math.trunc(this.time / this.dt) ; dt++) {
      let indexEcua = 0;
      this.ecuaiones = [ ];
      for ( const fila of this.maya) {
        for ( const celda of fila) {
          const ecua = [];
          for (let index = 0; index < (this.m * this.n) + 1 ; index++) {
            ecua.push(0);
          }
          const a = celda.timas;
          const c = celda.timenos;
          const b = -1 * (celda.timas + celda.timenos + celda.ci);
          const d = -1 * celda.ci * celda.presion;
          switch (celda.ecu) {
            case 1: if (fila.indexOf(celda) === 0) {
                      ecua.splice(indexEcua, 1, b);
                      ecua.splice(indexEcua + 1, 1, a);
                      ecua.splice(ecua.length - 1, 1, d);
                    }
                    if (fila.indexOf(celda) === (fila.length - 1)) {
                      ecua.splice(indexEcua, 1, b);
                      ecua.splice(indexEcua - 1, 1, c);
                      ecua.splice(ecua.length - 1, 1, d);
                    }
                    if (fila.indexOf(celda) !== (fila.length - 1) && fila.indexOf(celda) !== 0) {
                      ecua.splice(indexEcua + 1, 1, a);
                      ecua.splice(indexEcua, 1, b);
                      ecua.splice(indexEcua - 1, 1, c);
                      ecua.splice(ecua.length - 1, 1, d);
                    }
                    break;
            case 2: const e = -1 * (celda.timas + celda.timenos + celda.ci  + celda.ji);
                    const f = d - (celda.ji * celda.pwf);
                    if (fila.indexOf(celda) === 0) {
                      ecua.splice(indexEcua, 1, e);
                      ecua.splice(indexEcua + 1, 1, a);
                      ecua.splice(ecua.length - 1, 1, f);
                    }
                    if (fila.indexOf(celda) === (fila.length - 1)) {
                      ecua.splice(indexEcua, 1, e);
                      ecua.splice(indexEcua - 1, 1, c);
                      ecua.splice(ecua.length - 1, 1, f);
                    }
                    if (fila.indexOf(celda) !== (fila.length - 1) && fila.indexOf(celda) !== 0) {
                      ecua.splice(indexEcua + 1, 1, a);
                      ecua.splice(indexEcua, 1, e);
                      ecua.splice(indexEcua - 1, 1, c);
                      ecua.splice(ecua.length - 1, 1, f);
                    }
                    break;
            case 3: const g = d - celda.qi;
                    if (fila.indexOf(celda) === 0) {
                      ecua.splice(indexEcua, 1, b);
                      ecua.splice(indexEcua + 1, 1, a);
                      ecua.splice(ecua.length - 1, 1, g);
                    }
                    if (fila.indexOf(celda) === (fila.length - 1)) {
                      ecua.splice(indexEcua, 1, b);
                      ecua.splice(indexEcua - 1, 1, c);
                      ecua.splice(ecua.length - 1, 1, g);
                    }
                    if (fila.indexOf(celda) !== (fila.length - 1) && fila.indexOf(celda) !== 0) {
                      ecua.splice(indexEcua + 1, 1, a);
                      ecua.splice(indexEcua, 1, b);
                      ecua.splice(indexEcua - 1, 1, c);
                      ecua.splice(ecua.length - 1, 1, g);
                    }
                    break;
          }
          indexEcua++;
          this.ecuaiones.push(ecua);
        }
      }
      console.log(this.ecuaiones);
      const res = gaussian(this.ecuaiones);
      console.log(res);
      this.resultados.push(res);
      for ( const fila of this.maya) {
        for ( const celda of fila) {
          celda.presion = res[fila.indexOf(celda)];
        }
      }
    }
    this.sortResult();
    this.createChartData();
    this.done = true;
    console.log(this.resultados, this.sortRes, this.chartObject, this.labels);
  }






  celdasCalculateTs() {
    this.calAVData();
    for ( const fila of this.maya) {
      for ( const celda of fila) {
        if (fila.indexOf(celda) === 0) {
          const celdaSig = fila[fila.indexOf(celda) + 1];
          if (!celda.timas) {
            const a = 2 * celda.k * celda.area * celdaSig.k * celdaSig.area * 0.001127;
            const b = (celda.x * celda.viscosidad * celdaSig.k * celdaSig.area) + (celdaSig.x * celdaSig.viscosidad * celda.k * celda.area);
            celda.timas = a / b;
          }
          celda.timenos = 0;
        }
        if (fila.indexOf(celda) === (fila.length - 1)) {
        const celdaAnt = fila[fila.indexOf(celda) - 1];
        celda.timas = 0;
        celda.timenos = celdaAnt.timas;
        }
        if (fila.indexOf(celda) !== (fila.length - 1) && fila.indexOf(celda) !== 0) {
          const celdaSig = fila[fila.indexOf(celda) + 1];
          const celdaAnt = fila[fila.indexOf(celda) - 1];
          if (!celda.timas) {
            const a = 2 * celda.k * celda.area * celdaSig.k * celdaSig.area * 0.001127;
            const b = (celda.x * celda.viscosidad * celdaSig.k * celdaSig.area) + (celdaSig.x * celdaSig.viscosidad * celda.k * celda.area);
            celda.timas = a / b;
          }
          if (!celda.timenos) {
            celda.timenos = celdaAnt.timas;
          }
        }
        if (celda.pozo && celda.pozo === 's' && !celda.tasa || celda.tasa === 'n') {
          const a = 0.001127 * 2 * Math.PI * celda.k * celda.h;
          const b = celda.viscosidad * (Math.log((0.2 * celda.x) / celda.rw ) + celda.s);
          celda.ji = a / b;
          celda.ecu = 2;
        }
        if (!celda.pozo || celda.pozo === 'n') {
          celda.ecu = 1;
        }
        if (celda.pozo && celda.tasa === 's') {
          if (celda.cudal === 'i') {
            celda.qi = -1 * celda.cudal;
          }
          celda.ecu = 3;
        }
        celda.ci = ( celda.volumen * this.ct * celda.porosidad ) / ( this.dt * 5.616 );
      }
    }
  }

  calAVData() {
    for ( const fila of this.maya) {
      for ( const celda of fila) {
        celda.area = celda.y * celda.h;
        celda.volumen = celda.x * celda.area;
      }
    }
  }

  sortResult() {
    const sorResult = [ ];
    for ( const resultado of this.resultados) {
      let index = 0;
      const resByTime = [];
      for ( const fila of this.maya) {
        for ( const celda of fila) {
          const element = {
            result : resultado[index],
            index: celda.j + ', ' + celda.i
          };
          resByTime.push(element);
          index++;
        }
      }
      sorResult.push(resByTime);
    }
    this.sortRes = sorResult;
    this.doneSort = true;
  }

  createChartData() {
    this.chartData = [];
    let index = 0;
    for ( const resultado of this.resultados) {
      let monthRes = 0;
      for ( const res of resultado) {
        monthRes = monthRes + res;
      }
      monthRes = monthRes / (resultado.length );
      this.chartData.push(monthRes);
      index++;
      this.labels.push('Mes ' + index);
    }
    this.lineChartData[0].data = this.chartData;
    this.lineChartLabels = this.labels;
  }
}
