<template>
  <div class="mimeType">
    <ami-row>
      <ami-col :span="4"> xls </ami-col>
      <ami-col :span="20">
        <div>application/vnd.ms-excel</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> xlsx </ami-col>
      <ami-col :span="20">
        <div>application/vnd.openxmlformats-officedocument.spreadsheetml.sheet</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> zip </ami-col>
      <ami-col :span="20">
        <div>application/zip</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> pdf </ami-col>
      <ami-col :span="20">
        <div>application/pdf</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> doc </ami-col>
      <ami-col :span="20">
        <div>application/msword</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> docx </ami-col>
      <ami-col :span="20">
        <div>application/vnd.openxmlformats-officedocument.wordprocessingml.document</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> mp4 </ami-col>
      <ami-col :span="20">
        <div>video/mp4</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> rar </ami-col>
      <ami-col :span="20">
        <div>application/x-rar-compressed</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> json </ami-col>
      <ami-col :span="20">
        <div>application/json</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> svg </ami-col>
      <ami-col :span="20">
        <div>image/svg+xml</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> png </ami-col>
      <ami-col :span="20">
        <div>image/png</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> csv </ami-col>
      <ami-col :span="20">
        <div>text/csv</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> ppt </ami-col>
      <ami-col :span="20">
        <div>pplication/vnd.ms-powerpoint</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> pptx </ami-col>
      <ami-col :span="20">
        <div>application/vnd.openxmlformats-officedocument.presentationml.presentation</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> html </ami-col>
      <ami-col :span="20">
        <div>text/html</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> txt </ami-col>
      <ami-col :span="20">
        <div>text/plain</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> 目录 </ami-col>
      <ami-col :span="20">
        <div>application/vnd.noblenet-directory</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> apk </ami-col>
      <ami-col :span="20">
        <div>application/vnd.android.package-archive</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> exe </ami-col>
      <ami-col :span="20">
        <div>application/octet-stream</div>
      </ami-col>
    </ami-row>

    <ami-row style="margin-top: 20px">
      <ami-col :span="4"> mp3 </ami-col>
      <ami-col :span="20">
        <div>audio/mpeg</div>
      </ami-col>
    </ami-row>
  </div>
</template>

<script>
export default {
  name: "mimeType",
};
</script>

<style lang="scss" scoped>
.mimeType {
}
</style>
