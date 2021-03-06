import 'zone.js';
import 'reflect-metadata';
import { Component, enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { registerShape, ViserModule } from 'viser-ng';
registerShape('point', 'image', {
  drawShape: function(cfg: any, container: any) {
    cfg.points = this.parsePoints(cfg.points);
    const coord = this._coord;
    container.addShape('line', {
      attrs: {
        x1: cfg.points[0].x,
        y1: cfg.points[0].y,
        x2: cfg.points[0].x,
        y2: coord.start.y,
        stroke: '#ccc',
        lineWidth: 1,
        lineDash: [4, 2]
      }
    });
    return container.addShape('image', {
      attrs: {
        x: cfg.points[0].x - (12 * cfg.size / 2),
        y: cfg.points[0].y - 12 * cfg.size,
        width: 12 * cfg.size,
        height: 12 * cfg.size,
        img: cfg.shape[1]
      }
    });
  }
});

const data = [
  {name: 'Internet Explorer', value: 26},
  {name: 'Chrome', value: 40},
  {name: 'Firefox', value: 30},
  {name: 'Safari',  value: 24},
  {name: 'Opera', value: 15},
  {name: 'Undetectable', value: 8}
];

const imageMap = {
  'Internet Explorer': 'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
  'Chrome': 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
  'Firefox': 'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
  'Safari': 'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
  'Opera': 'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
  'Undetectable': 'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png'
};

const scale = [{
  dataKey: 'value',
  nice: false,
  max: 60,
  min: 0
}];

const seriesOpts = {
  gemo: 'point',
  position: 'name*value',
  size: 'value',
  color: 'name',
  shape: ['name', function(name){
    return ['image', imageMap[name]];
  }],
  label: ['value', {
    offset: -20,
    textStyle: {
      fontSize:16, // 文本大小
    }
  }]
};

@Component({
  selector: '#mount',
  template: `
  <div>
    <v-chart [forceFit]="forceFit" [height]="height" [data]="data" [scale]="scale">
      <v-tooltip></v-tooltip>
      <v-axis [dataKey]="'value'" [show]="false"></v-axis>
      <v-series [gemo]="seriesOpts.gemo" [position]="seriesOpts.position" [size]="seriesOpts.size" [color]="seriesOpts.color" [shape]="seriesOpts.shape" [label]="seriesOpts.label"></v-series>
    </v-chart>
  </div>
  `
})

class AppComponent {
  forceFit: boolean= true;
  height: number = 600;
  data = data;
  scale = scale;
  seriesOpts = seriesOpts;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViserModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
