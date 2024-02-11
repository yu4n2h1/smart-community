"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cache = require("../../utils/cache.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = {
  __name: "questionnaireList",
  setup(__props) {
    let data = common_vendor.reactive([]);
    const toQuestionnaire = (id) => {
      utils_cache.setLocalData("questionnaire-id", id);
      common_vendor.index.navigateTo({
        url: "/pages/questionnaire/questionnaire"
      });
    };
    const load = () => {
      data.splice(0, data.length);
      if (!utils_cache.getLocalData("questionnaire-list"))
        return;
      data.push(...utils_cache.getLocalData("questionnaire-list"));
    };
    common_vendor.onBeforeMount(() => {
      load();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(data).length === 0
      }, common_vendor.unref(data).length === 0 ? {} : {}, {
        b: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: "3212d7be-0-" + i0,
            c: common_vendor.t(item.endTime),
            d: common_vendor.t(item.flag ? "已完成" : "未完成"),
            e: common_vendor.s({
              color: item.flag ? "green" : "red"
            }),
            f: item.id,
            g: common_vendor.o(($event) => toQuestionnaire(item.id), item.id)
          };
        }),
        c: common_vendor.p({
          name: "clock",
          color: "#98A1BB"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yuanzhi/workspace/smart-community/pages/questionnaire/questionnaireList.vue"]]);
wx.createPage(MiniProgramPage);
