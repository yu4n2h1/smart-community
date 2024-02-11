"use strict";
const common_vendor = require("../common/vendor.js");
function setLocalData(key, data) {
  if (typeof data !== "object" && typeof data !== void 0) {
    common_vendor.index.setStorageSync(key, data);
  } else {
    common_vendor.index.setStorageSync(key, JSON.stringify(data));
  }
}
const getLocalData = (key) => common_vendor.index.getStorageSync(key) ? JSON.parse(common_vendor.index.getStorageSync(key)) : null;
const delLocalData = (key) => common_vendor.index.removeStorageSync(key);
exports.delLocalData = delLocalData;
exports.getLocalData = getLocalData;
exports.setLocalData = setLocalData;
