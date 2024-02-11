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
  __name: "questionnaireAdminList",
  setup(__props) {
    let data = common_vendor.reactive([]);
    let mored = common_vendor.ref(false);
    let delmode = common_vendor.ref(false);
    let dellist = common_vendor.reactive([]);
    const load = () => {
      data.splice(0, data.length);
      if (!utils_cache.getLocalData("questionnaire-list"))
        return;
      data.push(...utils_cache.getLocalData("questionnaire-list"));
      for (let i in data) {
        dellist.push(false);
      }
    };
    common_vendor.onShow(() => {
      load();
    });
    const showDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/questionnaire/questionnaireDetail"
      });
    };
    const addItem = () => {
      if (mored) {
        common_vendor.index.navigateTo({
          url: "/pages/questionnaire/questionnaireAdmin"
        });
      }
    };
    const selItem = (index) => {
      if (!delmode._value)
        showDetail();
      else
        dellist[index] = !dellist[index];
    };
    const delItem = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "是否确认删除?",
        success: (res) => {
          if (res.confirm) {
            let d = data.filter((item, index, arr) => {
              if (!dellist[index])
                return item;
            });
            data.splice(0, data.length);
            data.push(...d);
            try {
              utils_cache.setLocalData("questionnaire-list", data);
              common_vendor.index.showToast({
                title: "删除成功!",
                icon: "success",
                duration: 2e3,
                success: (res2) => {
                }
              });
            } catch (e) {
              console.log(e);
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
      return common_vendor.e({
        a: common_vendor.o(($event) => delItem()),
        b: common_vendor.o(($event) => common_vendor.isRef(delmode) ? delmode.value = !common_vendor.unref(delmode) : delmode = !common_vendor.unref(delmode)),
        c: common_vendor.s({
          height: common_vendor.unref(delmode) ? "100rpx" : "0"
        }),
        d: common_vendor.unref(data).length === 0
      }, common_vendor.unref(data).length === 0 ? {} : {}, {
        e: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.s({
              backgroundColor: common_vendor.unref(dellist)[index] ? "#22cdee" : "#fff",
              transform: common_vendor.unref(delmode) ? "scale(1)" : "scale(0)"
            }),
            c: "0f75179a-0-" + i0,
            d: common_vendor.t(item.endTime),
            e: common_vendor.t(item.cnt),
            f: item.id,
            g: common_vendor.o(($event) => selItem(index), item.id)
          };
        }),
        f: common_vendor.p({
          name: "clock",
          color: "#98A1BB"
        }),
        g: common_vendor.p({
          name: "grid-fill",
          color: "#fff",
          size: "80rpx"
        }),
        h: common_vendor.s({
          transform: common_vendor.unref(mored) ? "scale(0.8)" : "scale(1)"
        }),
        i: common_vendor.o(($event) => addItem()),
        j: common_vendor.p({
          name: "plus",
          color: "#fff",
          size: "60rpx"
        }),
        k: common_vendor.s({
          top: common_vendor.unref(mored) ? "-20rpx" : "-100rpx",
          left: common_vendor.unref(mored) ? "-80rpx" : "0rpx",
          transform: common_vendor.unref(mored) ? "scale(0.8)" : "scale(0)",
          backgroundColor: common_vendor.unref(mored) ? "#768BFF" : "transparent"
        }),
        l: common_vendor.o(($event) => common_vendor.isRef(delmode) ? delmode.value = !common_vendor.unref(delmode) : delmode = !common_vendor.unref(delmode)),
        m: common_vendor.p({
          name: "minus",
          color: "#fff",
          size: "60rpx"
        }),
        n: common_vendor.s({
          top: common_vendor.unref(mored) ? "-180rpx" : "-100rpx",
          left: common_vendor.unref(mored) ? "-80rpx" : "0rpx",
          transform: common_vendor.unref(mored) ? "scale(0.8)" : "scale(0)",
          backgroundColor: common_vendor.unref(mored) ? "#768BFF" : "transparent"
        }),
        o: common_vendor.o(($event) => common_vendor.isRef(mored) ? mored.value = !common_vendor.unref(mored) : mored = !common_vendor.unref(mored))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yuanzhi/workspace/smart-community/pages/questionnaire/questionnaireAdminList.vue"]]);
wx.createPage(MiniProgramPage);
