<template>
  <div>
    <button class="draw" @click="draw()">绘制</button>
    <button class="disDraw" @click="disDraw()">关闭绘制</button>
    <button class="allEdit" @click="allEdit()">全体编辑</button>
    <button class="allDisedit" @click="allDisedit()">全体禁止编辑</button>
    <button class="changeEdit" @click="changeEdit()">全体切换编辑</button>
    <button class="isEdit" @click="isEdit()">是否启用编辑</button>
    <button class="changeDrag" @click="changeDrag()">启用拖拽</button>
    <button class="removalMode" @click="removalMode()">启用移除</button>
    <button class="cutMode" @click="cutMode()">启用切割</button>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: "",
    };
  },
  mounted() {
    this.initDate();
  },
  methods: {
    initDate() {
      // eslint-disable-next-line no-undef
      this.map = L.map("map", {
        center: [40.02404009136253, 116.50641060224784], // 地图中心
        zoom: 14, // 缩放比列
        zoomControl: false, // 禁用 + - 按钮
        doubleClickZoom: false, // 禁用双击放大
        attributionControl: false, // 移除右下角leaflet标识
      });
      // eslint-disable-next-line no-undef
      let name = L.tileLayer(
        "http://mt1.google.cn/vt/lyrs=y@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga"
      ).addTo(this.map);
      // name.remove(this.map)
      this.map.removeLayer(name);
      this.map.pm.addControls({
        position: "topleft",
        drawPolygon: false, // 添加绘制多边形
        drawMarker: true, // 添加按钮以绘制标记
        drawCircleMarker: false, // 添加按钮以绘制圆形标记
        drawPolyline: false, // 添加按钮绘制线条
        drawRectangle: true, // 添加按钮绘制矩形
        drawCircle: false, //  添加按钮绘制圆圈
        editMode: true, //  添加按钮编辑多边形
        dragMode: true, //   添加按钮拖动多边形
        cutPolygon: true, // 添加一个按钮以删除图层里面的部分内容
        removalMode: true, // 清除图层
      });
      // 设置绘制线条颜色
      this.map.pm.setPathOptions({
        color: "orange",
        fillColor: "green",
        fillOpacity: 0.4,
      });
      this.map.pm.setLang("zh"); // 设置语言  en, de, it, ru, ro, es, fr, pt_br, zh , nl
      this.getlatLngs();
    },

    // 绘制
    draw() {
      this.map.pm.enableDraw("Polygon", {
        snappable: false,
        snapDistance: 10,
      });
      //   this.map.pm.enableDraw("Marker", { snappable: false });
      //   this.map.pm.enableDraw("CircleMarker", { snappable: false });
      // this.getlatLngs()
    },

    // 禁止绘制
    disDraw() {
      let options = {
        templineStyle: {
          color: "green",
        },

        hintlineStyle: {
          color: "red",
          dashArray: [5, 5],
        },
      };
      this.map.pm.disableDraw("Polygon", options);
      //    this.map.pm.disableDraw('Marker');
      //    this.map.pm.disableDraw('CircleMarker');
    },

    // 获取绘制的坐标
    getlatLngs() {
      // pm:drawstart 开始第一个点的时候调用
      // pm:drawend  禁止绘制时调用
      // pm:create  创建完成时调用
      this.map.on("pm:drawstart", (e) => {
        console.log(e, "first");
      });
      this.map.on("pm:drawend", (e) => {
        console.log(e, "禁止绘制");
      });
      this.map.on("pm:create", (e) => {
        console.log(e, "绘制完成时调用");
        if (e.shape === "Marker") {
          console.log(e.layer._latlng, "绘制坐标");
          alert("精度:" + e.layer._latlng.lat + ",纬度:" + e.layer._latlng.lng);
        } else {
          console.log(e.layer._latlngs[0], "绘制坐标");
        }
        e.layer.pm.enable({
          allowSelfIntersection: false,
          preventMarkerRemoval: false, // 禁止右键删除点
        });
        e.layer.on("pm:edit", (e) => {
          console.log(e, "拖动");
          console.log(e.target._latlngs[0], "拖动后的坐标");
        });
        e.layer.on("pm:vertexadded", (e) => {
          console.log(e, "添加顶点");
        });
        e.layer.on("pm:cut", (e) => {
          console.log(e, "切割");
        });
      });
    },

    // 开启全体编辑按钮
    allEdit() {
      this.map.pm.toggleGlobalEditMode();
    },

    // 禁用全局编辑按钮
    allDisedit() {
      this.map.pm.disableGlobalEditMode();
    },

    // 全局编辑切换
    changeEdit() {
      this.map.pm.toggleGlobalEditMode();
    },

    // 判断是否全局编辑
    isEdit() {
      alert(this.map.pm.globalEditEnabled());
    },

    // 切换拖拽
    changeDrag() {
      this.map.pm.toggleGlobalDragMode();
      // 是否启用全局拖动模式
      alert(this.map.pm.globalDragModeEnabled());
    },

    // 移除功能
    removalMode() {
      this.map.pm.toggleGlobalRemovalMode();
    },

    // 切割
    cutMode() {
      // 开始
      //   this.map.pm.Draw.Cut.enable({
      //     allowSelfIntersection: false
      //   });
      // 关闭
      //   this.map.pm.Draw.Cut.disable()
      // 切换
      this.map.pm.Draw.Cut.toggle();
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: calc(100vh);
  z-index: 1;
}

.draw {
  display: flex;
  z-index: 2;
  width: 60px;
  height: 50px;
  position: absolute;
  left: 80px;
  justify-content: center;
  align-items: center;
}

.disDraw {
  display: flex;
  z-index: 2;
  width: 60px;
  height: 50px;
  position: absolute;
  left: 200px;
  justify-content: center;
  align-items: center;
}

.allDisedit {
  display: flex;
  z-index: 2;
  width: 60px;
  height: 50px;
  position: absolute;
  left: 300px;
  justify-content: center;
  align-items: center;
}

.allEdit {
  display: flex;
  z-index: 2;
  width: 60px;
  height: 50px;
  position: absolute;
  left: 400px;
  justify-content: center;
  align-items: center;
}

.changeEdit {
  display: flex;
  z-index: 2;
  width: 60px;
  height: 50px;
  position: absolute;
  left: 500px;
  justify-content: center;
  align-items: center;
}

.isEdit {
  display: flex;
  z-index: 2;
  width: 60px;
  height: 50px;
  position: absolute;
  left: 600px;
  justify-content: center;
  align-items: center;
}

.changeDrag {
  display: flex;
  z-index: 2;
  width: 60px;
  height: 50px;
  position: absolute;
  top: 80px;
  left: 80px;
  justify-content: center;
  align-items: center;
}

.removalMode {
  display: flex;
  z-index: 2;
  width: 60px;
  height: 50px;
  position: absolute;
  top: 80px;
  left: 200px;
  justify-content: center;
  align-items: center;
}

.cutMode {
  display: flex;
  z-index: 2;
  width: 60px;
  height: 50px;
  position: absolute;
  top: 80px;
  left: 300px;
  justify-content: center;
  align-items: center;
}
</style>
