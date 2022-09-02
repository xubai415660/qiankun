    1. 前端模块id命名 mf的编号 比如MF0100006 修改地址package.json moduleId
    2. 前端复制最新demo里面的public src下除了api views 所有文件夹 package.json vue.config.js 到自己的项目 其中mock package.json按照自己的实际需求做修改
    3. 组件名称必须和界面资源的在线文档配置的资源编码一致,例:(参数管理：name = "AMI-MA0104003-06")
    4. 注意点： api里面必须/打头 api url示例 /ami/ma01-04-003/code-cls-val/queryCodeClsValCache/ 对于的vue.config.js需要配置相应的代理
    5. 需要复制api/system/menu.js api/components/common.js到自己的项目
    6. 解决切换tab页面自动刷新的问题,需要复制ami-web-demo的layout/idex/layout.vue到自己的项目,各个微应用页面名称必须和界面资源的在线文档配置的资源编码一致,例:(参数管理：name = "AMI-MA0104003-06")

| 时间       | 版本   | 说明     |
| ---------- | ------ | -------- |
| 2022-05-24 | v1.0.1 | 初始版本 |

# 一、前端组件方法

## 1.自定义指令

1.1 验证⻆⾊判断显示

```
// 指定⼏类⻆⾊才能显示 与当前登录⽤户拥有⻆⾊对⽐
v-check-role="['role1']
 <sg-button size="small" @click="dialogVisible = true" v-check-role="
['role1']">新增</sg-button>
```

1.2 验证业务编码判断显示

```
// 指定⼏类业务编码才能显示 与当前登录⽤户具备的业务编码进⾏⽐对
v-check-biz-code="['ma0101001']"
 <sg-button size="small" @click="dialogVisible = true" v-check-bizcode="['ma0101001']">修改</sg-button>
```

## 2. ⻚⾯跳转

2.1 引⼊⽅法配置跳转

```
//点击跳转⻚⾯中配置
import { remoteRoute } from "@/utils/remoteUtil";
//点击跳转⽅法中配置
remoteRoute.openMenu("/mf0100006/app-detail", { id: row.id });
注：跳转路由前⼀定要添加⾃⼰的模块名，且模块名为转义后⼩写的（例：/mf0100006 原
始：/MF0100006）
```

2.2 跳转到的⻚⾯配置

2.2.1 初始化配置

```
 mounted() {
 if (this.$route.name === "AMI0100001-11" && this.$route.query.id !==
null && this.$route.query.id !== undefined) {
 //跳转后到此⻚⾯的操作
 }
 },
```

2.2.2 监听配置

```
watch: {
     $route(to) {
        if (to?.name === "AMI0100001-11" && to.query.id !== null &&
        to.query.id !== undefined) {
        //跳转后到此⻚⾯的操作
        }
    },
 },
```

## 3. 获取登录⽤户基本信息

```
import {
 getUserInfo,
 getRoles,
 getMaCodeList,
 getToken,
 getRefreshToken,
} from "@/utils/store";
// ⽤户信息
console.log("userInfo", getUserInfo());
// ⽤户⻆⾊(数组)
console.log("roles", getRoles());
// ⽤户拥有业务编码(数组)
console.log("maCodeList", getMaCodeList());
// ⽤户token
console.log("token", getToken());
// ⽤户refreshToken
console.log("refreshToken", getRefreshToken());
```

## 4. 跨模块数据共享与事件通知

4.1 数据共享

```
import { remoteStore } from "@/utils/remoteUtil";
// 存储共享数据
remoteStore.set("sub01.home.key", "data");
// 获取共享数据
remoteStore.get("sub01.home.key");
// 判断共享数据是否存在
remoteStore.has("sub01.home.key");
// 监听共享数据变化事件
const event = (data) => {
 console.log(data);
};
remoteStore.on("sub01.home.key", event);
// 清除监听共享数据变化事件
const event = (data) => {
 console.log(data);
};
remoteStore.off("sub01.home.key", event);
```

4.2 事件共享

```
import { remoteEvent } from "@/utils/remoteUtil";
// 事件通知
remoteEvent.emit("sub01.home.updateCardMessage", "更新消息");
// 监听事件
const event = (data) => {
 console.log(data);
};
remoteEvent.on("sub01.home.updateCardMessage", event);
// 清除监听事件
const event = (data) => {
console.log(data);
};
remoteEvent.off("sub01.home.updateCardMessage", event);
// 判断是否有事件监听
remoteEvent.has("sub01.home.updateCardMessage");
```

4.2 主应用功能共享事件
可直接调用事件

```
import { remoteEvent } from "@/utils/remoteUtil";
// 用来关闭页签
remoteEvent.on("sub01.home.updateCardMessage", event);
```

备注： remoteStore、 remoteEvent 在任意⼦应⽤或者主应⽤都可以使⽤，操作如同本模块操作。
==【notice】==:在使⽤ remoteStore，remoteEvent 的时候，key 的命名必须遵循
⼦ "sub01.home.updateCardMessage" 的格式，第⼀个是⼦应⽤模块名，第⼆个是⽬录结构，第三个是真实
的 key，这样能够避免不同⼈员开发出现串数据的情况。
