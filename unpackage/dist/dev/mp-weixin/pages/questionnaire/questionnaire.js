"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cache = require("../../utils/cache.js");
if (!Math) {
  question();
}
const question = () => "../../components/question.js";
const _sfc_main = {
  __name: "questionnaire",
  setup(__props) {
    let data = common_vendor.reactive({});
    let qid = "";
    let uid = "";
    const load = () => {
      uid = utils_cache.getLocalData("user-token").id;
      qid = utils_cache.getLocalData("questionnaire-id");
      utils_cache.getLocalData("questionnaire-list").filter((item, index, arr) => {
        if (item.id === qid) {
          data = common_vendor.reactive(item);
        }
      });
      utils_cache.delLocalData("questionnaire-id");
    };
    common_vendor.onBeforeMount(() => {
      load();
    });
    const submit = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "是否确认提交？",
        success: (res) => {
          if (res.confirm) {
            try {
              let userDataIndex = utils_cache.getLocalData("user-data-index") ? utils_cache.getLocalData("user-data-index") : { uid, qlist: [] };
              userDataIndex.qlist.push(qid);
              let userData = utils_cache.getLocalData("user-data") ? utils_cache.getLocalData("user-data") : { uid, qlist: [] };
              userData.qlist.push(data);
              utils_cache.setLocalData("user-data-index", userDataIndex);
              utils_cache.setLocalData("user-data", userData);
              common_vendor.index.showToast({
                title: "提交成功",
                icon: "success",
                duration: 2e3,
                success: () => {
                  setTimeout(() => {
                    common_vendor.index.navigateBack({
                      delta: 1
                    });
                  }, 1e3);
                }
              });
            } catch (e) {
              common_vendor.index.showToast({
                title: "请稍后重试",
                icon: "fail",
                duration: 2e3
              });
            }
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(data).questionList, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: "6d0a9be3-0-" + i0,
            c: common_vendor.p({
              question: item
            }),
            d: index
          };
        }),
        b: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yuanzhi/workspace/smart-community/pages/questionnaire/questionnaire.vue"]]);
wx.createPage(MiniProgramPage);
