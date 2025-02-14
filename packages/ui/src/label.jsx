"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
var React = require("react");
var class_variance_authority_1 = require("class-variance-authority");
var radix_ui_1 = require("radix-ui");
var ui_1 = require("@repo/ui");
var labelVariants = (0, class_variance_authority_1.cva)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<radix_ui_1.Label.Root ref={ref} className={(0, ui_1.cn)(labelVariants(), className)} {...props}/>);
});
exports.Label = Label;
Label.displayName = radix_ui_1.Label.Root.displayName;
