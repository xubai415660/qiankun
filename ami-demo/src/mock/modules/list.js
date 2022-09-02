/**
 * @description：列表数据
 * @author：张时友
 * @date：Created in 2022/3/24 09:12
 * @modified By：
 * @version: 1.0.0
 */
import Mock from "mockjs";

export const queryList = (req) => {
  console.log(req);
  const json = JSON.parse(req.body);

  let dataResult = [];
  for (let i = 0; i < 100; i++) {
    dataResult.push(
      Mock.mock({
        id: "@id",
        uid: "@guid",
        ip: "@ip",
        mail: "@email",
        title: "@ctitle(5, 20)",
        word: "@cword",
        sentence: "@csentence",
        centerTitle: "@csentence(10)",
        county: "@county(true)",
        rgba: "@rgba",
        paragraph: "@cparagraph",
        name: "@cname",
        float: "@float",
        natural: "@natural",
        boolean: "@boolean",
        "isNull|1": [null, ""],
        "city|2-4": {
          110000: "北京市",
          120000: "天津市",
          130000: "河北省",
          140000: "山西省",
          310000: "上海市",
          320000: "江苏省",
          330000: "浙江省",
          340000: "安徽省",
        },
        "faultTypeName|1": ["整台区停电", "分相停电", null],
        startTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        endTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        date: "@date",
        "workStatus|1": ["处理中", "已处理", "未处理", null],
        "status|1": ["1", "2"],
        "bl|1": ["1", "2"],
      })
    );
  }
  console.log("json====>", json);
  let [index, size, total] = [json.pageIndex, json.pageSize, dataResult.length];

  let l = total / size;

  let totalPages = l - parseInt(l) > 0 ? parseInt(l) + 1 : l;
  console.log((index - 1) * size, index * size);
  let newDataList = dataResult.slice((index - 1) * size, index * size);
  return {
    code: 200,
    success: true,
    data: {
      currPage: parseInt(index),
      pageSize: parseInt(size),
      list: newDataList,
      totalCount: total,
      totalPage: totalPages,
    },
  };
};
