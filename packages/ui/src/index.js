"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = void 0;
var class_variance_authority_1 = require("class-variance-authority");
var tailwind_merge_1 = require("tailwind-merge");
var cn = function () {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, class_variance_authority_1.cx)(inputs));
};
exports.cn = cn;
