"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cache = require("../../utils/cache.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_icon + editableQuestion)();
}
const editableQuestion = () => "../../components/editableQuestion.js";
const _sfc_main = {
  __name: "questionnaireAdmin",
  setup(__props) {
    const data = common_vendor.reactive({
      id: 0,
      name: "",
      endTime: "",
      questionList: []
    });
    const getDefaultItem = () => {
      let dm = {
        flag: 0,
        title: "",
        descr: "",
        data: [
          {
            name: "",
            selected: false
          },
          {
            name: "",
            selected: false
          },
          {
            name: "",
            selected: false
          }
        ]
      };
      return dm;
    };
    const load = () => {
      data.id = Date.now();
      data.questionList.push(getDefaultItem());
      if (utils_cache.getLocalData("questionnaire-draft")) {
        common_vendor.index.showModal({
          title: "提示",
          content: "是否继续编辑上次内容?",
          success: (res) => {
            if (res.confirm) {
              let ld = utils_cache.getLocalData("questionnaire-draft");
              data.questionList.pop();
              data.questionList.push(...ld.questionList);
              data.id = ld.id;
              data.name = ld.name;
              data.endTime = ld.endTime;
            } else {
              utils_cache.delLocalData("questionnaire-draft");
            }
          }
        });
      }
    };
    common_vendor.onBeforeMount(() => {
      load();
    });
    const addItem = (index) => {
      data.questionList.splice(index + 1, 0, getDefaultItem());
    };
    const delItem = (index) => {
      if (data.questionList.length === 1) {
        common_vendor.index.showToast({
          title: "至少一个题目",
          icon: "error",
          duration: 2e3,
          position: "top"
        });
        return;
      }
      data.questionList.splice(index, 1);
    };
    const upItem = (index) => {
      if (index === 0) {
        data.questionList.push(data.questionList.shift());
      } else {
        data.questionList[index] = data.questionList.splice(index - 1, 1, data.questionList[index])[0];
      }
    };
    const downItem = (index) => {
      if (index === data.questionList.length - 1) {
        data.questionList.splice(0, 0, data.questionList.pop());
      } else {
        data.questionList[index] = data.questionList.splice(index + 1, 1, data.questionList[index])[0];
      }
    };
    const save = () => {
      try {
        utils_cache.setLocalData("questionnaire-draft", data);
        common_vendor.index.showToast({
          title: "保存成功!",
          icon: "success",
          duration: 2e3
        });
      } catch (e) {
        common_vendor.index.showToast({
          title: "请稍后重试",
          icon: "fail",
          duration: 2e3
        });
      }
    };
    const deliver = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "是否确认发布?",
        success: (res) => {
          if (res.confirm) {
            try {
              let quesitonnaireList = utils_cache.getLocalData("questionnaire-list") ? utils_cache.getLocalData("questionnaire-list") : [];
              quesitonnaireList.push(data);
              utils_cache.setLocalData("questionnaire-list", quesitonnaireList);
              utils_cache.delLocalData("questionnaire-draft");
              common_vendor.index.showToast({
                title: "发布成功!",
                icon: "success",
                duration: 2e3,
                success: (res2) => {
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
        a: data.name,
        b: common_vendor.o(($event) => data.name = $event.detail.value),
        c: common_vendor.p({
          name: "clock",
          color: "#98A1BB"
        }),
        d: data.endTime,
        e: common_vendor.o(($event) => data.endTime = $event.detail.value),
        f: common_vendor.f(data.questionList, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: "44bfc3dc-1-" + i0,
            c: common_vendor.p({
              question: item
            }),
            d: common_vendor.o(($event) => upItem(index), index),
            e: "44bfc3dc-2-" + i0,
            f: common_vendor.o(($event) => downItem(index), index),
            g: "44bfc3dc-3-" + i0,
            h: common_vendor.o(($event) => delItem(index), index),
            i: "44bfc3dc-4-" + i0,
            j: common_vendor.o(($event) => addItem(index), index),
            k: "44bfc3dc-5-" + i0,
            l: index
          };
        }),
        g: common_vendor.p({
          name: "arrow-upward",
          color: "#22CDEE"
        }),
        h: common_vendor.p({
          name: "arrow-downward",
          color: "#22CDEE"
        }),
        i: common_vendor.p({
          name: "minus",
          color: "#22CDEE"
        }),
        j: common_vendor.p({
          name: "plus",
          color: "#22CDEE"
        }),
        k: common_vendor.o(save),
        l: common_vendor.o(deliver)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yuanzhi/workspace/smart-community/pages/questionnaire/questionnaireAdmin.vue"]]);
wx.createPage(MiniProgramPage);
