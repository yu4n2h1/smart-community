"use strict";
const utils_cache = require("../../utils/cache.js");
const common_vendor = require("../../common/vendor.js");
const appGrid = () => "../../components/appGrid.js";
const _sfc_main = {
  components: {
    appGrid
  },
  data() {
    return {
      appList: [
        {
          name: "问卷填写",
          icon: "/static/img/question.png",
          url: "/pages/questionnaire/questionnaireList"
        },
        {
          name: "问卷管理",
          icon: "/static/img/question.png",
          url: "/pages/questionnaire/questionnaireAdminList"
        },
        {
          name: "",
          icon: "/static/img/like.png",
          url: "/pages/index/index"
        },
        {
          name: "点",
          icon: "/static/img/like.png",
          url: "/pages/index/index"
        },
        {
          name: "点赞",
          icon: "/static/img/like.png",
          url: "/pages/index/index"
        },
        {
          name: "点赞加",
          icon: "/static/img/like.png",
          url: "/pages/index/index"
        },
        {
          name: "点赞加关",
          icon: "/static/img/like.png",
          url: "/pages/index/index"
        },
        {
          name: "点赞加关注",
          icon: "/static/img/like.png",
          url: "/pages/index/index"
        },
        {
          name: "点赞加关注点",
          icon: "/static/img/like.png",
          url: "/pages/index/index"
        },
        {
          name: "点赞加关注点赞",
          icon: "/static/img/like.png",
          url: "/pages/index/index"
        }
      ]
    };
  },
  methods: {},
  onLoad() {
    if (!utils_cache.getLocalData("user-token")) {
      utils_cache.setLocalData("user-token", {
        id: 0,
        username: "admin",
        password: "123"
      });
    }
    console.log("设置测试用户");
    console.log(utils_cache.getLocalData("user-token"), "admin");
  }
};
if (!Array) {
  const _component_app_grid = common_vendor.resolveComponent("app-grid");
  _component_app_grid();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "推荐应用",
      appList: $data.appList
    }),
    b: common_vendor.p({
      title: ""
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yuanzhi/workspace/smart-community/pages/service/service.vue"]]);
wx.createPage(MiniProgramPage);
