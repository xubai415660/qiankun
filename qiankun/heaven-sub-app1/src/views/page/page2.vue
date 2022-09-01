<!--
 * @description:
 * @author: 王浩
 * @Date: 2022-09-01 11:49:56
 * @Modified By:
 * @version: 1.0.0
-->
<template>
  <div class="demo-page">
    <h4>Demo page.</h4>
    <img class="random-img" :src="randomImg" alt="" />
  </div>
</template>

<script>
import { testApi } from '@api/test-api';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Page2',
    data () {
        return {
            randomImg: ''
        };
    },
    mounted () {
        this.initData();
    },
    methods: {
        initData () {
            const params = {greeting: 'Hi!'}
            testApi(params).then((res) => {
                console.log('res: ', res);
                if (res.status === 200) {
                    if (res.data && res.data.length) {
                        this.randomImg = res.data[0].url;
                    }
                }
            })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.demo-page {
  text-align: center;

  .random-img {
    max-width: 50vw;
  }
}
</style>
