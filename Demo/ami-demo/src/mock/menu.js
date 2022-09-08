/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
const router = require("./data/router.json");
export const queryMenusByParentId = () => {
  return { code: 200, data: router };
};
