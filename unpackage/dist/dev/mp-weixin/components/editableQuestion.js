"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "question",
  props: {
    question: {
      type: Object,
      default: {
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
      }
    }
  },
  data() {
    return {
      show: false,
      flagList: [
        "单选题",
        "多选题",
        "问答题"
      ]
    };
  },
  methods: {
    getDefaultItem() {
      let dm = {
        name: "",
        selected: false
      };
      return dm;
    },
    showFlag() {
      this.show = !this.show;
    },
    setFlag(index) {
      this.showFlag();
      if (this.question.flag === index)
        return;
      this.question.data.splice(0, this.question.data.length);
      this.question.data.push(this.getDefaultItem());
      this.question.flag = index;
    },
    delItem(index) {
      if (this.question.data.length === 1) {
        common_vendor.index.showToast({
          title: "至少一个选项",
          icon: "error",
          position: "top",
          duration: 2e3
        });
        return;
      }
      this.question.data.splice(index, 1);
    },
    addItem(index) {
      this.question.data.splice(index + 1, 0, this.getDefaultItem());
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  (_easycom_u_icon2 + _easycom_u_button2 + _easycom_u_input2)();
}
const _easycom_u_icon = () => "../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_input = () => "../uni_modules/uview-plus/components/u-input/u-input.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_button + _easycom_u_input)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.question.title,
    b: common_vendor.o(($event) => $props.question.title = $event.detail.value),
    c: common_vendor.o($options.showFlag),
    d: common_vendor.p({
      name: "list",
      color: "#22CDEE"
    }),
    e: common_vendor.f($data.flagList, (name, index, i0) => {
      return {
        a: common_vendor.t(name),
        b: common_vendor.o(($event) => $options.setFlag(index), index),
        c: index,
        d: "7c743d0c-1-" + i0
      };
    }),
    f: common_vendor.p({
      type: "primary",
      plain: true,
      size: "small"
    }),
    g: common_vendor.s({
      height: $data.show ? "220rpx" : "0"
    }),
    h: $props.question.descr,
    i: common_vendor.o(($event) => $props.question.descr = $event.detail.value),
    j: $props.question.flag === 0
  }, $props.question.flag === 0 ? {
    k: common_vendor.f($props.question.data, (item, index, i0) => {
      return {
        a: item.name,
        b: common_vendor.o(($event) => item.name = $event.detail.value),
        c: common_vendor.o(($event) => $options.delItem(index)),
        d: "7c743d0c-2-" + i0,
        e: common_vendor.o(($event) => $options.addItem(index)),
        f: "7c743d0c-3-" + i0
      };
    }),
    l: common_vendor.p({
      name: "minus",
      color: "#22CDEE"
    }),
    m: common_vendor.p({
      name: "plus",
      color: "#22CDEE"
    })
  } : $props.question.flag === 1 ? {
    o: common_vendor.f($props.question.data, (item, index, i0) => {
      return {
        a: item.name,
        b: common_vendor.o(($event) => item.name = $event.detail.value),
        c: common_vendor.o(($event) => $options.delItem(index)),
        d: "7c743d0c-4-" + i0,
        e: common_vendor.o(($event) => $options.addItem(index)),
        f: "7c743d0c-5-" + i0
      };
    }),
    p: common_vendor.p({
      name: "minus",
      color: "#22CDEE"
    }),
    q: common_vendor.p({
      name: "plus",
      color: "#22CDEE"
    })
  } : $props.question.flag === 2 ? {
    s: common_vendor.o(($event) => $props.question.data[0].name = $event),
    t: common_vendor.p({
      border: "surround",
      modelValue: $props.question.data[0].name
    })
  } : {}, {
    n: $props.question.flag === 1,
    r: $props.question.flag === 2
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yuanzhi/workspace/smart-community/components/editableQuestion.vue"]]);
wx.createComponent(Component);
