<!-- --------------------------------------------------------
 @description：G6组件文件
 @author：张时友
 @date：Created in   2022/5/25 10:31
 @modified By：
 @version: 1.0.0
 ------------------------------------------------------------ -->
<template>
  <div class="g6-container" :id="id"></div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  name: "g6",
  props: {
    g6Data: Object,
    id: {
      require: true,
      type: String,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.graphRender();
  },
  methods: {
    graphRender() {
      let that = this;
      const defaultEdgeStyle = {
        stroke: "rgba(82, 179, 116, 0.5)",
        endArrow: {
          path: "M 0,0 L 12, 6 L 9,0 L 12, -6 Z",
          fill: "rgba(82, 179, 116, 0.5)",
          //d: 0,
        },
      };

      G6.registerNode(
        "card-node",
        {
          //与线交点位置
          getAnchorPoints() {
            return [
              [0.5, 1], // 左侧中间
              [0.5, 0], // 右侧中间
            ];
          },
          drawShape: function drawShape(cfg, group) {
            const color = cfg.state === "1" ? "#F4664A" : "#30BF78";
            const r = 2;
            const shape = group.addShape("rect", {
              attrs: {
                x: -120,
                y: -25,
                width: 240,
                height: 68,
                stroke: color,
                radius: r,
                lineWidth: 3,
              },
              name: "main-box",
            });

            group.addShape("rect", {
              attrs: {
                x: -120,
                y: -25,
                width: 240,
                height: 20,
                fill: color,
                radius: [r, r, 0, 0],
                text: cfg.name,
              },
              name: "title-box",
            });
            // title text
            group.addShape("text", {
              attrs: {
                textBaseline: "top",
                x: -120,
                y: -20,
                lineHeight: 20,
                text: cfg.name,
                fill: "#ffffff",
              },
              name: "title",
            });
            //main
            group.addShape("text", {
              attrs: {
                textBaseline: "top",
                x: -120,
                y: 0,
                lineHeight: 20,
                text: cfg.name,
                fill: "#666666",
              },
              name: "title",
            });

            return shape;
          },
        },
        "single-node"
      );

      G6.registerNode(
        "sql",
        {
          drawShape(cfg, group) {
            const rect = group.addShape("rect", {
              attrs: {
                x: -75,
                y: -25,
                width: 150,
                height: 50,
                radius: 10,
                stroke: "#5B8FF9",
                fill: "#C6E5FF",
                lineWidth: 3,
              },
              name: "rect-shape",
            });
            if (cfg.name) {
              group.addShape("text", {
                attrs: {
                  text: cfg.name,
                  x: 0,
                  y: 0,
                  fill: "#00287E",
                  fontSize: 14,
                  textAlign: "center",
                  textBaseline: "middle",
                  fontWeight: "bold",
                },
                name: "text-shape",
              });
            }
            return rect;
          },
        },
        "single-node"
      );

      G6.registerEdge("flow-line", {
        draw(cfg, group) {
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;
          console.log("cfg==========>", cfg);
          console.log("group==========>", group);
          console.log("startPoint====>", startPoint);
          console.log("endPoint====>", endPoint);
          const { style } = cfg;
          const shape = group.addShape("path", {
            attrs: {
              stroke: style.stroke,
              endArrow: style.endArrow,
              path: [
                ["M", startPoint.x, startPoint.y],
                ["L", startPoint.x, (startPoint.y + endPoint.y) / 2],
                ["L", endPoint.x, (startPoint.y + endPoint.y) / 2],
                ["L", endPoint.x, endPoint.y],
              ],
            },
          });

          return shape;
        },
      });

      const container = document.getElementById(that.id);
      const graph = new G6.Graph({
        container: that.id,
        layout: {
          type: "dagre",
          nodesep: 80, //节点水平间距离
          ranksep: 40, // 节点垂直间距离
          // controlPoints: true,
        },
        defaultNode: {
          type: "card-node",
        },
        defaultEdge: {
          type: "flow-line",
          style: defaultEdgeStyle,
        },
        nodeStateStyles: {
          selected: {
            stroke: "#d9d9d9",
            fill: "#5394ef",
          },
        },
        modes: {
          default: ["drag-canvas", "zoom-canvas", "click-select"],
        },
        fitView: true,
      });
      graph.data(that.g6Data);
      graph.render();
      console.log(graph);
      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight) return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    },
  },
};
</script>

<style scoped lang="scss">
.g6-container {
  width: 100%;
  height: 100%;
}
</style>
