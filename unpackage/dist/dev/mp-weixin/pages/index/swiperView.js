"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "swiperView",
  setup(__props) {
    const swiperArr = [
      "/static/img/swiper1.jpg",
      "/static/img/swiper2.jpg",
      "/static/img/swiper3.jpg",
      "/static/img/swiper4.jpg"
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiperArr, (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yuanzhi/workspace/smart-community/pages/index/swiperView.vue"]]);
wx.createComponent(Component);
