<!----------------------------------------------------------------------------
 @description：
 @author：
 @date：Created in  2022/3/22 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div class="home">
    <h1>路由跳转</h1>
    <ami-button @click="go">跳转并关闭页面</ami-button>
    <ami-button @click="goData">关闭页面并携带参数</ami-button>
    <ami-button @click="goClose">本模块内跳转</ami-button>
    <ami-button @click="close">关闭页面</ami-button>
    <ami-button @click="close" v-checkBizCode="['AMI-MA0100403-1103']">有权限按钮</ami-button>
    <ami-button @click="close" v-checkBizCode="['AMI-MA0100403-11030000']">无权限按钮</ami-button>
    <br />
    <ami-layered-tree
      style="height: 500px; width: 300px; border: 1px red solid; padding: 10px"
      v-model="chickList"
      :data="layeredTreeData"
      :props="{ label: 'codeName', key: 'codeId', children: 'codeList' }"
    ></ami-layered-tree>
    <h1>文件预览</h1>
    <h3>
      <p>使用文件预览请</p>
      1、执行，
      <p>npm install vue-pdf</p>
      2、替换
      <p>/src/api/public/public.js 文件</p>
      3、入参
      <p>visible：弹窗原生属性 必传</p>
      <p>fileId：文件id 必传</p>
      <p>fileType：文件类型 必传</p>
      <p>fileName：文件名称 必传</p>
      <p>allowEdit：是否可编辑 默认false 不可编辑</p>
    </h3>
    <ami-button @click="openFiles()">excel文件预览</ami-button>
    <ami-button @click="allowEditFile()">excel文件编辑</ami-button>
    <ami-button @click="openFiles1(pdf)">pdf文件预览</ami-button>
    <ami-button @click="openFiles1(video)">video文件预览</ami-button>
    <ami-form ref="form" :model="form" label-width="120px" style="margin-top: 20px">
      <ami-row>
        <ami-col :span="6">
          <ami-form-item label="文件名称">
            <ami-input v-model="form.fileName"></ami-input>
          </ami-form-item>
        </ami-col>
        <ami-col :span="6">
          <ami-form-item label="文件id">
            <ami-input v-model="form.fileId"></ami-input>
          </ami-form-item>
        </ami-col>
        <ami-col :span="6">
          <ami-form-item label="文件类型">
            <ami-select v-model="form.fileType">
              <ami-option v-for="i in fileTypeList" :key="i" :label="i" :value="i"></ami-option>
            </ami-select>
          </ami-form-item>
        </ami-col>
        <ami-col :span="6">
          <ami-form-item style="width: 100%">
            <ami-button type="primary" round style="float: right" @click="openFiles1(form)">文件预览</ami-button>
          </ami-form-item>
        </ami-col>
      </ami-row>
    </ami-form>
    <FilesView
      :visible.sync="visible"
      :fileId="this.file.fileId"
      :fileType="this.file.fileType"
      :fileName="this.file.fileName"
      :allowEdit="allowEdit"
    />
  </div>
</template>

<script>
import { remoteRoute } from "@/utils/remoteUtil";
import { selectMgtOrg } from "@/api/dome/dome";
import FilesView from "@/components/FilesView";
export default {
  name: "AMI0100999-01",
  components: { FilesView },
  data() {
    return {
      visible: false,
      allowEdit: false,
      layeredTreeData: [],
      chickList: [],
      fileTypeList: [
        "gif",
        "png",
        "jpg",
        "docx",
        "xlsx",
        "video/mp4",
        "video/3gp",
        "video/webm",
        "video/ogg",
        "avi",
        "mp4",
        "m4v",
        "f4v",
        "txt",
      ],
      xlsx: {
        fileId: "568106124978257920",
        fileName: "调研任务数据结构",
        fileType: "xlsx",
      },
      form: {
        fileId: "",
        fileName: "",
        fileType: "docx",
      },
      pdf: {
        fileId: "570335746390327296",
        fileName: "PDF预览测试",
        fileType: "pdf",
      },
      video: {
        fileId: "570960903110754304",
        fileName: "1012-交互共享培训视频",
        fileType: "video/mp4",
      },
      file: {
        fileId: "",
        fileName: "",
        fileType: "",
      },
    };
  },
  created() {
    this.mgtOrg();
  },
  methods: {
    openFiles() {
      this.allowEdit = false;
      console.log("file===>", this.file);
      this.file = this.xlsx;
      this.visible = true;
    },
    openFiles1(v) {
      console.log("v====>", v);
      this.file = v;
      this.visible = true;
    },
    allowEditFile() {
      this.file = this.xlsx;
      console.log("file===>", this.file);
      this.visible = true;
      this.allowEdit = true;
    },
    mgtOrg() {
      selectMgtOrg({}).then((res) => {
        console.log("人员信息===>", res);
        this.layeredTreeData = res.data.data;
      });
    },
    /**
     * 需更新 /utils/remoteUtil.js文件
     * **/
    /**
     * 关闭页签进入新页面
     **/
    go() {
      remoteRoute.closePath({
        // 即将关闭路由
        path: "/home",
        // 需要跳转到页面
        toPath: "/mf0100201/md-query-data-resource",
      });
    },
    /**
     * 关闭页签进入新页面并携带参数
     **/
    goData() {
      this.$router.push({
        path: "/home",
      });
      this.$nextTick(() => {
        remoteRoute.closePath({
          // 即将关闭路由
          path: "/home",
          // 需要跳转到页面
          toPath: "/mf0100201/md-query-data-resource",
          // 携带参数
          params: { id: "mas" },
        });
      });
    },
    /**
     * 本模块内关闭页签进入新页面并携带参数
     **/
    goClose() {
      remoteRoute.closePath({
        // 即将关闭路由
        path: "/home",
        // 需要跳转到页面
        toPath: "/mf0100999/table",
        // 携带参数
        params: { id: "mas" },
      });
    },
    /**
     * 关闭页签
     * **/
    close() {
      remoteRoute.closePath({
        // 即将关闭路由
        path: "/home",
      });
    },
  },
};
</script>
<style>
.home {
  padding: 20px 40px;
  height: 100%;
  overflow-y: auto;
}
</style>
