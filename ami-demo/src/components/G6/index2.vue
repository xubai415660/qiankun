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
  created() {},
  mounted() {
    this.graphRender();
  },
  methods: {
    graphRender() {
      /**
       *  This demo shows how to register a custom node with SVG DOM shape
       *  by Shiwu
       *
       */

      const that = this;
      G6.registerNode("dom-node", {
        //与线交点位置
        getAnchorPoints() {
          return [
            [0.5, 1], // 左侧中间
            [0.5, 0], // 右侧中间
          ];
        },
        draw: (cfg, group) => {
          console.log("节点数据===>", cfg);
          // const stroke = cfg.style ? cfg.style.stroke || "#5B8FF9" : "#5B8FF9";
          const shape = group.addShape("dom", {
            attrs: {
              x: -120,
              y: -25,
              width: 240,
              height: 80,
              html: `
              <div style="width: 100%;height: 100%;background-color: #999999;border-radius: 4px;padding: 4px">
                <div  style="width: 100%;height: 30%;display: flex;justify-content: space-between;padding: 0 2px">
                  <div class="ami-icons-a-wancheng">2</div>
                  <div  id=${cfg.id}  class="dom-node">${cfg.dataTime}</div>
                </div>
                <div style="height: 60%;background-color: #ffffff;border-radius: 4px">
                     ${cfg.author}
                <div>${cfg.name}</div>
              </div>

              </div>
          `,
            },
            draggable: true,
          });
          return shape;
        },
      });

      G6.registerEdge("flow-line", {
        draw(cfg, group) {
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;
          console.log("连线数据==========>", cfg);
          const { style } = cfg;
          const shape = group.addShape("path", {
            attrs: {
              stroke: cfg.stroke || style.stroke,
              endArrow: style.endArrow,
              path: [
                ["M", startPoint.x, startPoint.y], //连线开始点
                ["L", startPoint.x, (startPoint.y + endPoint.y) / 2], // 连线拐点
                ["L", endPoint.x, (startPoint.y + endPoint.y) / 2], // 连线拐点
                ["L", endPoint.x, endPoint.y - 10], //连线终点
              ],
            },
          });

          return shape;
        },
      });
      const container = document.getElementById(that.id);
      // const width = container.scrollWidth;
      // const height = (container.scrollHeight || 500) - 100;

      const descriptionDiv = document.createElement("div");
      // descriptionDiv.innerHTML = `由于打包问题，本 demo 的 111-113 行被暂时注释。需要您在代码栏中打开 111-113 行的注释以得到自定义 DOM 节点正确的交互。<br /> Due to the packing problem of the site, we have to note the line 111-113 of this demo temporary. Unnote them to see the result of custom DOM node with interactions please.`;
      container.appendChild(descriptionDiv);

      const graph = new G6.Graph({
        container: that.id,
        layout: {
          type: "dagre",
          nodesep: 80, //节点水平间距离
          ranksep: 30, // 节点垂直间距离
          // controlPoints: true,
        },
        // fitCenter: true,
        renderer: "svg",
        defaultEdge: {
          type: "flow-line",
          style: {
            stroke: "rgba(82, 179, 116, 1)", //颜色
            endArrow: {
              path: "M 0,0 L 0,10 L 10,0,L 0 -10 Z", //终点箭头
              fill: "rgba(82, 179, 116, 1)", // 颜色
              d: 0,
              lineWidth: 8,
              lineAppendWidth: 5,
            },
          },
        },
        defaultNode: {
          type: "dom-node",
        },
        modes: {
          //查件
          // default: ["drag-canvas", "zoom-canvas", "click-select"],
        },
        fitView: true, //图形全部显示出来
      });

      graph.data(that.g6Data);
      graph.render();
      //   click listener for dom nodes to response the click by changing stroke color
      const listener = (dom) => {
        console.log("dom===>", dom);
        const nodeId = dom.id;
        if (!nodeId) return;
        const node = graph.findById(nodeId);
        let stroke = "";
        if (!node.hasState("selected")) {
          stroke = "#f00";
          graph.setItemState(node, "selected", true);
        } else {
          stroke = "#5B8FF9";
          graph.setItemState(node, "selected", false);
        }
        graph.updateItem(nodeId, {
          style: {
            stroke,
          },
        });
      };

      const bindClickListener = () => {
        const domNodes = document.getElementsByClassName("dom-node");
        console.log(domNodes);
        for (let i = 0; i < domNodes.length; i++) {
          const dom = domNodes[i];
          // open the following lines pls!
          dom.addEventListener("click", (e) => {
            console.log("eee", e);
            listener(dom);
          });
        }
      };

      bindClickListener();

      // after update the item, all the DOMs will be re-rendered
      // so the listeners should be rebinded to the new DOMs
      graph.on("afterupdateitem", (e) => {
        console.log(e);
        bindClickListener();
      });
      graph.on("afterrender", (e) => {
        console.log(e);
        bindClickListener();
      });
      // if it is TreeGraph and with default animate:true, you should bind the litsener after animation
      // graph.on('afteranimate', (e) => {
      //   bindClickListener();
      // });

      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight) return;
          graph.changeSize(container.scrollWidth, container.scrollHeight - 100);
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
