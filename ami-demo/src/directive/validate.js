/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
// 特殊字符
const SPECIAL_CHARACTER = /['"|~$%^&*;<>?·！@￥%……&*（）—+【】{}、|：”；’《》？，。/=]/;
// 不能单独存在的特殊字符
const ALONE_CHARACTER = /^(_)$/;
// 敏感关键字
const SENSITIVE_KEYWORD =
  /\b(create|insert|select|update|delete|from|all|and|or|as|order by|drop|join|union|primary|key|foreign key|none|null|alert|document|javascript|script|jscript|onfocus|location|onclick|vbscript|iframe)\b/i;
// 空格
// const ONLY_SPACE = /^[ ]+$/
const ONLY_SPACE = /\s/;
// 时间格式
// const ONLY_DATE = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;

export default {
  // componentUpdated(el, binding, vnode) {},
  bind(el, binding) {
    if (binding.value && binding.value.type === "custom") {
      el.oninput = () => {
        el.children[0].value = el.children[0].value.replace(binding.value.rule, "");
        binding.value.set[binding.value.name] = el.children[0].value;
      };
    } else {
      el.oninput = () => {
        el.children[0].value = el.children[0].value.replace(SPECIAL_CHARACTER, "");
        el.children[0].value = el.children[0].value.replace(ALONE_CHARACTER, "");
        el.children[0].value = el.children[0].value.replace(SENSITIVE_KEYWORD, "");
        el.children[0].value = el.children[0].value.replace(ONLY_SPACE, "");
        binding.value.set[binding.value.name] = el.children[0].value;
      };
    }
  },
  unbind: function (el) {
    el.oninput = null;
  },
};
