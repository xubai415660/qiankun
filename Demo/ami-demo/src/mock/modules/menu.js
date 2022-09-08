const router = require("../data/router.json");
export const queryMenusByParentId = () => {
  return { code: 200, data: router };
};
