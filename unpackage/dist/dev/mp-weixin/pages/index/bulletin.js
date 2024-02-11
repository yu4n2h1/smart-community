"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
const _sfc_main = {
  __name: "bulletin",
  setup(__props) {
    const textArr = [
      {
        "title": "智慧社区：上线了！",
        "url": "11",
        "date": "2024-2-5 21:48"
      },
      {
        "title": "祝愿社区各位居民欢度春节！",
        "url": "22",
        "date": "2024-1-6 13:50"
      },
      {
        "title": "大雪预警",
        "url": "333",
        "date": "2023-11-11 11:11"
      }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(textArr, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.date),
            c: index
          };
        }),
        b: common_vendor.p({
          title: "社区公告",
          ["sub-title"]: "",
          type: "line"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yuanzhi/workspace/smart-community/pages/index/bulletin.vue"]]);
wx.createComponent(Component);
