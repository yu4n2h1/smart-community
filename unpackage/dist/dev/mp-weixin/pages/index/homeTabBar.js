"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "homeTabBar",
  setup(__props) {
    const navItems = [
      {
        "path": "/pages/test/test",
        "text": "人口报备",
        "imgSrc": "/static/img/homeBar/Population_reporting.png"
      },
      {
        "path": "/pages/test/test",
        "text": "公告通知",
        "imgSrc": "/static/img/homeBar/Announcement_Notice.png"
      },
      {
        "path": "/pages/test/test",
        "text": "政务发布",
        "imgSrc": "/static/img/homeBar/Chief.png"
      },
      {
        "path": "/pages/test/test",
        "text": "政务发布",
        "imgSrc": "/static/img/homeBar/Residents_demands.png"
      },
      {
        "path": "/pages/test/test",
        "text": "社区信息",
        "imgSrc": "/static/img/homeBar/Community_Information.png"
      },
      {
        "path": "/pages/test/test",
        "text": "业主诉求",
        "imgSrc": "/static/img/homeBar/Owner_Appeal.png"
      },
      {
        "path": "/pages/test/test",
        "text": "团购",
        "imgSrc": "/static/img/homeBar/Buy.png"
      },
      {
        "path": "/pages/test/test",
        "text": "便民组织",
        "imgSrc": "/static/img/homeBar/Convenient_service.png"
      }
    ];
    const cssItems = [
      { "filter": "drop-shadow(0px 3px 6px rgba(166, 133, 241, 0.502))", "background": "linear-gradient(142.24deg, #768BFF 14.61%, #776AFF 43.6%, #7838FF 87.37%)" },
      { "filter": "drop-shadow(0px 3px 6px rgba(254, 184, 131, 0.502))", "background": "linear-gradient(140.69deg, #FFC460 14.81%, #FF8531 87.27%)" },
      { "filter": "drop-shadow(0px 3px 6px rgba(253, 134, 175, 0.502))", "background": "linear-gradient(140.69deg, #FC697B 14.81%, #FC3F83 87.27%)" },
      { "filter": "drop-shadow(0px 3px 6px rgba(39, 224, 223, 0.502))", "background": "linear-gradient(140.69deg, #15FDF4 14.81%, #00DBED 87.27%)" },
      { "filter": "drop-shadow(0px 3px 6px rgba(32, 190, 253, 0.502))", "background": "linear-gradient(140.69deg, #0FD7FF 14.81%, #00B1FD 87.27%)" },
      { "filter": "drop-shadow(0px 3px 6px rgba(193, 141, 240, 0.502))", "background": "linear-gradient(140.69deg, #DF87FD 14.81%, #A048F8 87.27%)" },
      { "filter": "drop-shadow(0px 3px 6px rgba(47, 207, 159, 0.502))", "background": "linear-gradient(140.69deg, #53FFC0 14.81%, #17E083 87.27%)" },
      { "filter": "drop-shadow(0px 3px 6px rgba(123, 152, 252, 0.502))", "background": "linear-gradient(140.69deg, #6CA0FC 14.81%, #335CFA 87.27%)" }
    ];
    function navClick(url) {
      common_vendor.index.switchTab({
        url
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(navItems, (item, index, i0) => {
          return {
            a: item.imgSrc,
            b: common_vendor.s(cssItems[index % 8]),
            c: common_vendor.t(item.text),
            d: index,
            e: common_vendor.o(($event) => navClick(item.path), index)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yuanzhi/workspace/smart-community/pages/index/homeTabBar.vue"]]);
wx.createComponent(Component);
