/**
 * @description：下拉框选项
 * @author：
 * @date：Created in 2021/11/28 19:15
 * @modified By：
 * @version: 1.0.0
 */
const selectLise = require("../data/selectData.json");
export const queryCodeClsType = (req) => {
  const { codeClsType } = JSON.parse(req.body);
  return { code: 200, data: selectLise[codeClsType] };
};
