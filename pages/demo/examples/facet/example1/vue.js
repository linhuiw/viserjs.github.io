export const template = `
<template>
  <div>
    <v-chart :force-fit="true" :height="600" :data="chartData" :scale="scale">
      <v-tooltip />
      <v-legend />
      <v-facet :type="'rect'" :fields="['cut', 'clarity']">
        <v-facet-view>
          <v-axis />
          <v-tooltip />
          <v-point :position="'carat*price'" :color="'cut'" :opacity="0.3" :size="3" />
        </v-facet-view>
      </v-facet>
    </v-chart>
  </div>
</template>

<script>
  import { chartData } from "./data";

  const scale = [{
    dataKey: 'carat',
    sync: true
  }, {
    dataKey: 'price',
    sync: true,
    tickCount: 3
  }, {
    dataKey: 'cut',
    sync: true,
  }];

  export default {
    data() {
      return {
        chartData,
        scale
      };
    },
    methods: {}
  };
</script>
`;
