<!-- --------------------------------------------------------
 @description：表格使用
 @author：张时友
 @date：Created in   2022/6/6 15:44
 @modified By：
 @version: 1.0.0
 ------------------------------------------------------------ -->
<template>
  <div class="mf0999-table">
    <ami-card class="box-card">
      <ami-model-title title="查询条件">
        <div @click="showMore = !showMore" style="color: #0069c4; font-size: 14px; font-weight: 400; cursor: pointer">
          <span>更多查询条件</span>
          <span><i class="ami-icon-arrow-down"></i></span>
        </div>
      </ami-model-title>
      <ami-form ref="form" :model="form" label-width="120px">
        <ami-row>
          <ami-col :span="6">
            <ami-form-item label="资源项名称">
              <ami-input v-model="form.resourceName"></ami-input>
            </ami-form-item>
          </ami-col>
          <ami-col :span="6">
            <ami-form-item label="资源类型">
              <ami-select v-model="form.resourceType" placeholder="请选择活动区域">
                <ami-option label="全部" value=""></ami-option>
                <ami-option label="区域一" value="shanghai"></ami-option>
                <ami-option label="区域二" value="beijing"></ami-option>
              </ami-select>
            </ami-form-item>
          </ami-col>
          <ami-col :span="6">
            <ami-form-item label="资源所属模块">
              <ami-input v-model="form.resBusineModule"></ami-input>
            </ami-form-item>
          </ami-col>
          <ami-col v-show="showMore" :span="6">
            <ami-form-item label="资源项名称">
              <ami-input v-model="form.resourceName"></ami-input>
            </ami-form-item>
          </ami-col>
          <ami-col :span="6" v-show="!showMore">
            <div style="float: right">
              <ami-button round>重 置</ami-button>
              <ami-button round @click="query" type="primary">查 询</ami-button>
            </div>
          </ami-col>
        </ami-row>
        <ami-row>
          <ami-col v-show="showMore" :span="6">
            <ami-form-item label="资源项名称">
              <ami-input v-model="form.resourceName"></ami-input>
            </ami-form-item>
          </ami-col>
          <ami-col v-show="showMore" :span="6">
            <ami-form-item label="资源项名称">
              <ami-input v-model="form.resourceName"></ami-input>
            </ami-form-item>
          </ami-col>
          <ami-col v-show="showMore" :span="6">
            <ami-form-item label="资源项名称">
              <ami-input v-model="form.resourceName"></ami-input>
            </ami-form-item>
          </ami-col>
          <ami-col :span="6" v-show="showMore">
            <div style="float: right">
              <ami-button round>重 置</ami-button>
              <ami-button round @click="query" type="primary">查 询</ami-button>
            </div>
          </ami-col>
        </ami-row>
      </ami-form>
    </ami-card>
    <div class="tables-box">
      <div class="content">
        <!-- title 列表标题左上角       -->
        <!-- columns 表头       -->
        <!-- axiosData 接口   -->
        <!-- operation 是否有右下角操作区       -->
        <Tables
          title="资源列表"
          ref="tables"
          :columns="columns"
          :axiosData="axiosData"
          :operation="operation"
          :exportData="exportData"
          @selection-change="handleSelectionChange"
        >
          <template slot="titleRight">
            <ami-button icon="ami-icon-s-order" @click="operation = !operation" round> 操作区显示影藏 </ami-button>
          </template>
          <template slot="resourceRoute" slot-scope="{ scope }">
            <span :class="[scope.row.resourceRoute !== '-' ? 'text-line' : '']"> {{ scope.row.resourceRoute }}</span>
          </template>
          <template slot="test" slot-scope="{ scope }">
            <ami-tooltip class="item" effect="dark" :content="scope.row.resourceCode" placement="top-start">
              <span>{{ scope.row.authFlagName }}</span>
            </ami-tooltip>
          </template>

          <div slot="bottom" class="bottom">
            <ami-button round>查看详情</ami-button>
            <ami-button round>审 核</ami-button>
          </div>
        </Tables>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AMI0100999-04",
  data() {
    return {
      showMore: false,
      operation: false,
      form: {
        resourceType: "",
        resourceName: "",
        resBusineModule: "",
      },
      columns: [
        {
          label: "",
          key: "selection",
          type: "selection",
          align: "center",
        },
        {
          label: "序号",
          key: "index",
          type: "index",
          align: "center",
          width: "80px",
        },
        {
          label: "资源名称",
          key: "resourceName",
          minWidth: "200px",
        },
        {
          label: "资源名称编码",
          key: "resourceCode",
          minWidth: "200px",
        },
        {
          label: "资源类型",
          key: "resourceTypeName",
          minWidth: "200px",
        },
        {
          label: "资源类型编码",
          key: "resourceType",
          minWidth: "200px",
        },
        {
          label: "资源所属模块",
          key: "resBusineModuleName",
          minWidth: "200px",
        },
        {
          label: "资源所属模块编码",
          key: "resBusineModule",
          minWidth: "200px",
        },
        {
          label: "是否鉴权",
          key: "authFlagName",
          minWidth: "200px",
        },
        {
          label: "是否外部链接",
          key: "isOuterSysUrlName",
          minWidth: "200px",
        },
        {
          label: "是否显示",
          key: "isVisibleName",
          minWidth: "200px",
        },

        {
          label: "资源路径",
          key: "resourcePath",
          minWidth: "200px",
        },
        {
          label: "路由地址",
          key: "resourceRoute",
          minWidth: "100px",
          renderType: "slot",
        },
        {
          label: "数据悬浮",
          key: "test",
          minWidth: "100px",
          renderType: "slot",
        },
        {
          label: "显示类型",
          key: "showType",
          minWidth: "100px",
        },
        {
          label: "更新时间",
          key: "updateDate",
          minWidth: "200px",
        },
        {
          label: "创建时间",
          key: "createTime",
          minWidth: "200px",
        },
        {
          label: "排序序号",
          key: "sortNo",
          minWidth: "200px",
        },
      ],
      axiosData: {},
      exportData: {
        url: "/ami/ma01-02-067/monitor-manage/exportMonitorItemList",
        // fileName: "121",
        filter: {
          a: "11",
        }, //导出参数
        extension: "xlsx",
      },
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      this.axiosData = {
        filter: this.form,
        url: "/ami/ma01-04-003/resource/query",
      };
      this.$refs.tables.queryTableData();
      //http://192.168.1.214:16223/ami/ma01-04-003/resource/query
    },
    handleSelectionChange() {},
  },
};
</script>

<style scoped lang="scss">
.mf0999-table {
  margin: 0 12px 12px 12px;
  width: calc(100% - 24px);
  height: calc(100% - 12px);
  display: flex; //查询条件收缩展开，关键代码，不出现滚动条
  flex-direction: column; //查询条件收缩展开，关键代码，不出现滚动条
  .box-card {
    margin-bottom: 20px;
    /deep/ .ami-select {
      width: 100%;
    }
  }

  .tables-box {
    flex: 1; //查询条件收缩展开，关键代码，不出现滚动条
    position: relative; //查询条件收缩展开，关键代码，不出现滚动条
    .content {
      position: absolute; //查询条件收缩展开，关键代码，不出现滚动条
      top: 0; //查询条件收缩展开，关键代码，不出现滚动条
      left: 0; //查询条件收缩展开，关键代码，不出现滚动条
      right: 0; //查询条件收缩展开，关键代码，不出现滚动条
      height: 100%; //查询条件收缩展开，关键代码，不出现滚动条
    }
  }
  .text-line {
    text-decoration: underline;
    color: #0d3eb8;
  }
}
</style>
