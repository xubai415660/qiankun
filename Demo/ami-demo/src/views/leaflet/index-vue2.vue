<template>
  <div class="vue-leaflet">
    <l-map style="width: 100%; height: 600px" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker">
        <l-popup :content="text"></l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

export default {
  name: "VueLeaflet",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      zoom: 13,
      // eslint-disable-next-line no-undef
      center: L.latLng(18.212516, 109.482965),
      url: "http://8.130.161.105:7104/1447870524/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      // eslint-disable-next-line no-undef
      marker: L.latLng(18.212516, 109.482965),
      text: "this is a marker",
    };
  },
};
</script>

<style scoped></style>
