"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "question",
  props: {
    question: {
      type: Object,
      default: {
        flag: 0,
        title: "题目名称",
        descr: "在此处输入说明",
        data: [
          {
            name: "选项1",
            selected: false
          },
          {
            name: "选项2",
            selected: false
          },
          {
            name: "选项3",
            selected: false
          }
        ]
      }
    }
  },
  data() {
    return {
      selRadio: "",
      selCheckboxList: []
    };
  },
  methods: {
    radioGroupChange(n) {
      this.question.data.filter((item, index, arr) => {
        if (item.name === n) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
    },
    checkboxGroupChange(n) {
      this.question.data.filter((qitem, qindex, qarr) => {
        qitem.selected = false;
        n.filter((nitem, nindex, narr) => {
          if (qitem.name === nitem) {
            qitem.selected = true;
          }
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u_checkbox2 = common_vendor.resolveComponent("u-checkbox");
  const _easycom_u_checkbox_group2 = common_vendor.resolveComponent("u-checkbox-group");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  (_easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u_checkbox2 + _easycom_u_checkbox_group2 + _easycom_up_input2)();
}
const _easycom_u_radio = () => "../uni_modules/uview-plus/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../uni_modules/uview-plus/components/u-radio-group/u-radio-group.js";
const _easycom_u_checkbox = () => "../uni_modules/uview-plus/components/u-checkbox/u-checkbox.js";
const _easycom_u_checkbox_group = () => "../uni_modules/uview-plus/components/u-checkbox-group/u-checkbox-group.js";
const _easycom_up_input = () => "../node-modules/uview-plus/components/u-input/u-input.js";
if (!Math) {
  (_easycom_u_radio + _easycom_u_radio_group + _easycom_u_checkbox + _easycom_u_checkbox_group + _easycom_up_input)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.question.title),
    b: common_vendor.t($props.question.descr),
    c: $props.question.flag === 0
  }, $props.question.flag === 0 ? {
    d: common_vendor.f($props.question.data, (item, index, i0) => {
      return {
        a: index,
        b: "023b0cf6-1-" + i0 + ",023b0cf6-0",
        c: common_vendor.p({
          customStyle: {
            marginBottom: "8px"
          },
          label: item.name,
          name: item.name
        })
      };
    }),
    e: common_vendor.o($options.radioGroupChange),
    f: common_vendor.o(($event) => $data.selRadio = $event),
    g: common_vendor.p({
      placement: "column",
      modelValue: $data.selRadio
    })
  } : $props.question.flag === 1 ? {
    i: common_vendor.f($props.question.data, (item, index, i0) => {
      return {
        a: index,
        b: "023b0cf6-3-" + i0 + ",023b0cf6-2",
        c: common_vendor.p({
          customStyle: {
            marginBottom: "8px"
          },
          label: item.name,
          name: item.name
        })
      };
    }),
    j: common_vendor.o($options.checkboxGroupChange),
    k: common_vendor.o(($event) => $data.selCheckboxList = $event),
    l: common_vendor.p({
      placement: "column",
      modelValue: $data.selCheckboxList
    })
  } : $props.question.flag === 2 ? {
    n: common_vendor.o(($event) => $props.question.data[0].name = $event),
    o: common_vendor.p({
      border: "surround",
      modelValue: $props.question.data[0].name
    })
  } : {}, {
    h: $props.question.flag === 1,
    m: $props.question.flag === 2
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yuanzhi/workspace/smart-community/components/question.vue"]]);
wx.createComponent(Component);
