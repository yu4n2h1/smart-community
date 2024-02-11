"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-input",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props],
  data() {
    return {
      // 输入框的值
      innerValue: "",
      // 是否处于获得焦点状态
      focused: false,
      // value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
      firstChange: true,
      // value绑定值的变化是由内部还是外部引起的
      changeFromInner: false,
      // 过滤处理方法
      innerFormatter: (value) => value
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newVal, oldVal) {
        this.innerValue = newVal;
        this.firstChange = false;
        this.changeFromInner = false;
      }
    }
  },
  computed: {
    // 是否显示清除控件
    isShowClear() {
      const { clearable, readonly, focused, innerValue } = this;
      return !!clearable && !readonly && !!focused && innerValue !== "";
    },
    // 组件的类名
    inputClass() {
      let classes = [], { border, disabled, shape } = this;
      border === "surround" && (classes = classes.concat(["u-border", "u-input--radius"]));
      classes.push(`u-input--${shape}`);
      border === "bottom" && (classes = classes.concat([
        "u-border-bottom",
        "u-input--no-radius"
      ]));
      return classes.join(" ");
    },
    // 组件的样式
    wrapperStyle() {
      const style = {};
      if (this.disabled) {
        style.backgroundColor = this.disabledColor;
      }
      if (this.border === "none") {
        style.padding = "0";
      } else {
        style.paddingTop = "6px";
        style.paddingBottom = "6px";
        style.paddingLeft = "9px";
        style.paddingRight = "9px";
      }
      return common_vendor.index.$u.deepMerge(style, common_vendor.index.$u.addStyle(this.customStyle));
    },
    // 输入框的样式
    inputStyle() {
      const style = {
        color: this.color,
        fontSize: common_vendor.index.$u.addUnit(this.fontSize),
        textAlign: this.inputAlign
      };
      return style;
    }
  },
  emits: ["update:modelValue", "focus", "blur", "change", "confirm", "clear", "keyboardheightchange"],
  methods: {
    // 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
    setFormatter(e) {
      this.innerFormatter = e;
    },
    // 当键盘输入时，触发input事件
    onInput(e) {
      let { value = "" } = e.detail || {};
      const formatter = this.formatter || this.innerFormatter;
      const formatValue = formatter(value);
      this.innerValue = value;
      this.$nextTick(() => {
        this.innerValue = formatValue;
        this.valueChange();
      });
    },
    // 输入框失去焦点时触发
    onBlur(event) {
      this.$emit("blur", event.detail.value);
      common_vendor.index.$u.sleep(150).then(() => {
        this.focused = false;
      });
      common_vendor.index.$u.formValidate(this, "blur");
    },
    // 输入框聚焦时触发
    onFocus(event) {
      this.focused = true;
      this.$emit("focus");
    },
    // 点击完成按钮时触发
    onConfirm(event) {
      this.$emit("confirm", this.innerValue);
    },
    // 键盘高度发生变化的时候触发此事件
    // 兼容性：微信小程序2.7.0+、App 3.1.0+
    onkeyboardheightchange(event) {
      this.$emit("keyboardheightchange", event);
    },
    // 内容发生变化，进行处理
    valueChange() {
      const value = this.innerValue;
      this.$nextTick(() => {
        this.$emit("update:modelValue", value);
        this.changeFromInner = true;
        this.$emit("change", value);
        common_vendor.index.$u.formValidate(this, "change");
      });
    },
    // 点击清除控件
    onClear() {
      this.innerValue = "";
      this.$nextTick(() => {
        this.valueChange();
        this.$emit("clear");
      });
    },
    /**
     * 在安卓nvue上，事件无法冒泡
     * 在某些时间，我们希望监听u-from-item的点击事件，此时会导致点击u-form-item内的u-input后
     * 无法触发u-form-item的点击事件，这里通过手动调用u-form-item的方法进行触发
     */
    clickHandler() {
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.prefixIcon || _ctx.$slots.prefix
  }, _ctx.prefixIcon || _ctx.$slots.prefix ? {
    b: common_vendor.p({
      name: _ctx.prefixIcon,
      size: "18",
      customStyle: _ctx.prefixIconStyle
    })
  } : {}, {
    c: common_vendor.s($options.inputStyle),
    d: _ctx.type,
    e: _ctx.focus,
    f: _ctx.cursor,
    g: $data.innerValue,
    h: _ctx.autoBlur,
    i: _ctx.disabled || _ctx.readonly,
    j: _ctx.maxlength,
    k: _ctx.placeholder,
    l: _ctx.placeholderStyle,
    m: _ctx.placeholderClass,
    n: _ctx.confirmType,
    o: _ctx.confirmHold,
    p: _ctx.holdKeyboard,
    q: _ctx.cursorSpacing,
    r: _ctx.adjustPosition,
    s: _ctx.selectionEnd,
    t: _ctx.selectionStart,
    v: _ctx.password || _ctx.type === "password" || void 0,
    w: _ctx.ignoreCompositionEvent,
    x: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    y: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args)),
    z: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    A: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args)),
    B: common_vendor.o((...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args)),
    C: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    D: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args)),
    E: $options.isShowClear
  }, $options.isShowClear ? {
    F: common_vendor.p({
      name: "close",
      size: "11",
      color: "#ffffff",
      customStyle: "line-height: 12px"
    }),
    G: common_vendor.o((...args) => $options.onClear && $options.onClear(...args))
  } : {}, {
    H: _ctx.suffixIcon || _ctx.$slots.suffix
  }, _ctx.suffixIcon || _ctx.$slots.suffix ? {
    I: common_vendor.p({
      name: _ctx.suffixIcon,
      size: "18",
      customStyle: _ctx.suffixIconStyle
    })
  } : {}, {
    J: common_vendor.n($options.inputClass),
    K: common_vendor.s($options.wrapperStyle)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5904192e"], ["__file", "/Users/yuanzhi/workspace/smart-community/node_modules/uview-plus/components/u-input/u-input.vue"]]);
wx.createComponent(Component);
