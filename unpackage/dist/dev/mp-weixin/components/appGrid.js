"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "appGrid",
  props: {
    title: {
      type: String,
      default: "功能列表"
    },
    appList: {
      type: Array,
      default: () => [
        {
          name: "默认应用",
          icon: "",
          url: ""
        },
        {
          name: "默认应用",
          icon: "",
          url: ""
        },
        {
          name: "默认应用",
          icon: "",
          url: ""
        },
        {
          name: "默认应用",
          icon: "",
          url: ""
        },
        {
          name: "默认应用",
          icon: "",
          url: ""
        },
        {
          name: "默认应用",
          icon: "",
          url: ""
        },
        {
          name: "默认应用",
          icon: "",
          url: ""
        },
        {
          name: "默认应用",
          icon: "",
          url: ""
        }
      ]
    }
  },
  data() {
    return {
      bgcolors: [
        "#768BFF",
        "#FFC460",
        "#FC697B",
        "#15FDF4",
        "#0FD7FF",
        "#DF87FD",
        "#53FFC0",
        "#6CA0FC"
      ],
      cssItems: [
        { "filter": "drop-shadow(0px 3px 6px rgba(166, 133, 241, 0.502))", "background": "linear-gradient(142.24deg, #768BFF 14.61%, #776AFF 43.6%, #7838FF 87.37%)" },
        { "filter": "drop-shadow(0px 3px 6px rgba(254, 184, 131, 0.502))", "background": "linear-gradient(140.69deg, #FFC460 14.81%, #FF8531 87.27%)" },
        { "filter": "drop-shadow(0px 3px 6px rgba(253, 134, 175, 0.502))", "background": "linear-gradient(140.69deg, #FC697B 14.81%, #FC3F83 87.27%)" },
        { "filter": "drop-shadow(0px 3px 6px rgba(39, 224, 223, 0.502))", "background": "linear-gradient(140.69deg, #15FDF4 14.81%, #00DBED 87.27%)" },
        { "filter": "drop-shadow(0px 3px 6px rgba(32, 190, 253, 0.502))", "background": "linear-gradient(140.69deg, #0FD7FF 14.81%, #00B1FD 87.27%)" },
        { "filter": "drop-shadow(0px 3px 6px rgba(193, 141, 240, 0.502))", "background": "linear-gradient(140.69deg, #DF87FD 14.81%, #A048F8 87.27%)" },
        { "filter": "drop-shadow(0px 3px 6px rgba(47, 207, 159, 0.502))", "background": "linear-gradient(140.69deg, #53FFC0 14.81%, #17E083 87.27%)" },
        { "filter": "drop-shadow(0px 3px 6px rgba(123, 152, 252, 0.502))", "background": "linear-gradient(140.69deg, #6CA0FC 14.81%, #335CFA 87.27%)" }
      ]
    };
  },
  methods: {
    jump(url) {
      common_vendor.index.navigateTo({
        url
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.title),
    b: common_vendor.f($props.appList, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.o(($event) => $options.jump(item.url)),
        c: common_vendor.s($data.cssItems[index % 8]),
        d: common_vendor.t(item.name)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yuanzhi/workspace/smart-community/components/appGrid.vue"]]);
wx.createComponent(Component);
