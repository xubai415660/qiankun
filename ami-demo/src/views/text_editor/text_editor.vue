<!-- --------------------------------------------------------
 @description：富文本编辑器
 @author：张时友
 @date：Created in   2022/6/14 19:16
 @modified By：
 @version: 1.0.0
 ------------------------------------------------------------ -->
<template>
  <div class="text_editor">
    <h1>富文本编辑器</h1>
    <div class="box_1">
      <ami-text-editor v-model="data" :dark="false" cdn-url="/ami/cdn/tinymce" />
    </div>
  </div>
</template>

<script>
export default {
  name: "text_editor",
  data() {
    return {
      data: " <h1>新一代采集系统建设中</h1>",
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.text_editor {
  height: 100%;
  width: 100%;
  .box_1 {
    width: 80%;
    margin: 40px 10% 0;
    height: 100%;
  }
}
</style>
