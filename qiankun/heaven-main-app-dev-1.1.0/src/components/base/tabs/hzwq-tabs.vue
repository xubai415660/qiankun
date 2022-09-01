<script>
import { Tabs } from 'element-ui';
export default {
    name: 'HzwqTabs',
    extends: Tabs,
    // eslint-disable-next-line id-length
    render (h) {
        const extra = h(
                'div',
                {
                    class: {
                        'hzwq-tabs__nav-right': true
                    }
                },
                this.$slots.extra
            ),
            origVNode = Tabs.render.call(this, h),
            befor = h(
                'div',
                {
                    class: {
                        'hzwq-tabs__nav-left': true
                    }
                },
                this.$slots.befor
            );
        origVNode.children[0].children.splice(0, 0, extra);
        origVNode.children[0].children.unshift(befor);
        return origVNode;
    }
};
</script>

<style scoped lang="scss">
.hzwq-tabs {
    &__nav-right {
        float: right;
        margin-left: 5px;
        line-height: 40px;
    }
    &__nav-left {
        float: left;
        line-height: 40px;
        border: none;
    }
}
</style>