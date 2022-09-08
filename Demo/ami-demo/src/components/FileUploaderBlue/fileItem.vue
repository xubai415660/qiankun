<!----------------------------------------------------------------------------
 @description：大文件上传使用dome
 @author：宋乾
 @date：Created in  2022/5/17 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div class="fileItem">
    <ami-row v-if="type === 'small'">
      <ami-col :span="3" style="padding-top: 8px">
        <FileIcon :type="file.type" />
      </ami-col>
      <ami-col :span="19">
        <div class="file-title">{{ file.filename }}</div>
        <div class="mag-t-4 upload-progress">
          <ami-progress :percentage="percent" :stroke-width="2" :show-text="false"></ami-progress>
        </div>
      </ami-col>
      <ami-col :span="2">
        <img
          :disabled="delFlagAsync"
          src="./assets/delete.png"
          class="delete-img"
          @click="deleteClickHandle()"
          alt=""
        />
      </ami-col>
    </ami-row>
    <ami-row class="lantern" v-if="type === 'middle'">
      <ami-col :span="2" style="padding-top: 8px">
        <FileIcon class="middle-icon" :type="file.type" />
      </ami-col>
      <ami-col :span="20">
        <div class="file-title">{{ file.filename }}</div>
        <div class="mag-t-4 upload-progress">
          <ami-progress :percentage="percent" :stroke-width="2" :show-text="false"></ami-progress>
        </div>
      </ami-col>
      <ami-col :span="2">
        <img
          :disabled="delFlagAsync"
          src="./assets/delete.png"
          class="delete-img2 mag-l-30"
          @click="deleteClickHandle()"
          alt=""
        />
      </ami-col>
    </ami-row>
  </div>
</template>

<script>
import FileIcon from "./fileIcon";
export default {
  name: "fileItem",
  props: {
    file: {
      type: Object,
      default: () => {},
    },
    delFlag: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "small",
    },
  },
  components: {
    FileIcon,
  },
  data() {
    return {
      percent: 0,
      delFlagAsync: this.delFlag,
      isShow: true,
    };
  },
  methods: {
    deleteClickHandle() {
      this.$emit("deleteFileHanppened", this.file);
    },
  },
  watch: {
    "file.percent": {
      handler(newVal) {
        this.$set(this, "percent", newVal);
        if (newVal === 100) {
          this.$set(this, "isShow", false);
        }
      },
      immediate: true,
      deep: true,
    },
    delFlag(newVal) {
      this.delFlagAsync = newVal;
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.pointer {
  cursor: pointer;
}
.mag-t-4 {
  margin-top: 4px;
}
.mag-t-5 {
  margin-top: 5px;
}
.mag-t-12 {
  margin-top: 12px;
}
.mag-t-20 {
  margin-top: 20px;
}
.mag-l-30 {
  margin-left: 30px;
}
/deep/ .ami-progress-bar__outer {
  background-color: #eef3ff;
}
.fileItem {
  background: #ffffff;
  border: 1px solid #dee0e6;
  border-radius: 4px;
  height: 42px;

  .file-title {
    margin-top: 8px;
    font-family: "Microsoft YaHei";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #666666;
    overflow: hidden;
  }
  .close-img {
    width: 16px;
    height: 16px;
    margin-top: 13px;
    margin-left: 12px;
    cursor: pointer;
  }
  .delete-img {
    width: 16px;
    height: 16px;
    margin-top: 13px;
    margin-left: 12px;
    cursor: pointer;
  }
  .lantern {
    position: relative;
  }
  .delete-img2 {
    position: absolute;
    width: 16px;
    height: 16px;
    // margin-top: 13px;
    top: 13px;
    right: 13px;
    cursor: pointer;
  }
  .middle-icon {
    // width: 18px;
    // height: 24px;
  }
}
</style>
