"use client";
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
exports.DropdownMenuRadioGroup = exports.DropdownMenuSubTrigger = exports.DropdownMenuSubContent = exports.DropdownMenuSub = exports.DropdownMenuPortal = exports.DropdownMenuGroup = exports.DropdownMenuShortcut = exports.DropdownMenuSeparator = exports.DropdownMenuLabel = exports.DropdownMenuRadioItem = exports.DropdownMenuCheckboxItem = exports.DropdownMenuItem = exports.DropdownMenuContent = exports.DropdownMenuTrigger = exports.DropdownMenu = void 0;
var React = require("react");
var react_icons_1 = require("@radix-ui/react-icons");
var radix_ui_1 = require("radix-ui");
var ui_1 = require("@repo/ui");
var DropdownMenu = radix_ui_1.DropdownMenu.Root;
exports.DropdownMenu = DropdownMenu;
var DropdownMenuTrigger = radix_ui_1.DropdownMenu.Trigger;
exports.DropdownMenuTrigger = DropdownMenuTrigger;
var DropdownMenuGroup = radix_ui_1.DropdownMenu.Group;
exports.DropdownMenuGroup = DropdownMenuGroup;
var DropdownMenuPortal = radix_ui_1.DropdownMenu.Portal;
exports.DropdownMenuPortal = DropdownMenuPortal;
var DropdownMenuSub = radix_ui_1.DropdownMenu.Sub;
exports.DropdownMenuSub = DropdownMenuSub;
var DropdownMenuRadioGroup = radix_ui_1.DropdownMenu.RadioGroup;
exports.DropdownMenuRadioGroup = DropdownMenuRadioGroup;
var DropdownMenuSubTrigger = React.forwardRef(function (_a, ref) {
    var className = _a.className, inset = _a.inset, children = _a.children, props = __rest(_a, ["className", "inset", "children"]);
    return (<radix_ui_1.DropdownMenu.SubTrigger ref={ref} className={(0, ui_1.cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent", inset && "pl-8", className)} {...props}>
    {children}
    <react_icons_1.ChevronRightIcon className="ml-auto size-4"/>
  </radix_ui_1.DropdownMenu.SubTrigger>);
});
exports.DropdownMenuSubTrigger = DropdownMenuSubTrigger;
DropdownMenuSubTrigger.displayName =
    radix_ui_1.DropdownMenu.SubTrigger.displayName;
var DropdownMenuSubContent = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<radix_ui_1.DropdownMenu.SubContent ref={ref} className={(0, ui_1.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className)} {...props}/>);
});
exports.DropdownMenuSubContent = DropdownMenuSubContent;
DropdownMenuSubContent.displayName =
    radix_ui_1.DropdownMenu.SubContent.displayName;
var DropdownMenuContent = React.forwardRef(function (_a, ref) {
    var className = _a.className, _b = _a.sideOffset, sideOffset = _b === void 0 ? 4 : _b, props = __rest(_a, ["className", "sideOffset"]);
    return (<radix_ui_1.DropdownMenu.Portal>
    <radix_ui_1.DropdownMenu.Content ref={ref} sideOffset={sideOffset} className={(0, ui_1.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className)} {...props}/>
  </radix_ui_1.DropdownMenu.Portal>);
});
exports.DropdownMenuContent = DropdownMenuContent;
DropdownMenuContent.displayName = radix_ui_1.DropdownMenu.Content.displayName;
var DropdownMenuItem = React.forwardRef(function (_a, ref) {
    var className = _a.className, inset = _a.inset, props = __rest(_a, ["className", "inset"]);
    return (<radix_ui_1.DropdownMenu.Item ref={ref} className={(0, ui_1.cn)("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className)} {...props}/>);
});
exports.DropdownMenuItem = DropdownMenuItem;
DropdownMenuItem.displayName = radix_ui_1.DropdownMenu.Item.displayName;
var DropdownMenuCheckboxItem = React.forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, checked = _a.checked, props = __rest(_a, ["className", "children", "checked"]);
    return (<radix_ui_1.DropdownMenu.CheckboxItem ref={ref} className={(0, ui_1.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} checked={checked} {...props}>
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <radix_ui_1.DropdownMenu.ItemIndicator>
        <react_icons_1.CheckIcon className="size-4"/>
      </radix_ui_1.DropdownMenu.ItemIndicator>
    </span>
    {children}
  </radix_ui_1.DropdownMenu.CheckboxItem>);
});
exports.DropdownMenuCheckboxItem = DropdownMenuCheckboxItem;
DropdownMenuCheckboxItem.displayName =
    radix_ui_1.DropdownMenu.CheckboxItem.displayName;
var DropdownMenuRadioItem = React.forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return (<radix_ui_1.DropdownMenu.RadioItem ref={ref} className={(0, ui_1.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}>
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <radix_ui_1.DropdownMenu.ItemIndicator>
        <react_icons_1.DotFilledIcon className="size-4 fill-current"/>
      </radix_ui_1.DropdownMenu.ItemIndicator>
    </span>
    {children}
  </radix_ui_1.DropdownMenu.RadioItem>);
});
exports.DropdownMenuRadioItem = DropdownMenuRadioItem;
DropdownMenuRadioItem.displayName = radix_ui_1.DropdownMenu.RadioItem.displayName;
var DropdownMenuLabel = React.forwardRef(function (_a, ref) {
    var className = _a.className, inset = _a.inset, props = __rest(_a, ["className", "inset"]);
    return (<radix_ui_1.DropdownMenu.Label ref={ref} className={(0, ui_1.cn)("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)} {...props}/>);
});
exports.DropdownMenuLabel = DropdownMenuLabel;
DropdownMenuLabel.displayName = radix_ui_1.DropdownMenu.Label.displayName;
var DropdownMenuSeparator = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<radix_ui_1.DropdownMenu.Separator ref={ref} className={(0, ui_1.cn)("-mx-1 my-1 h-px bg-muted", className)} {...props}/>);
});
exports.DropdownMenuSeparator = DropdownMenuSeparator;
DropdownMenuSeparator.displayName = radix_ui_1.DropdownMenu.Separator.displayName;
var DropdownMenuShortcut = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<span className={(0, ui_1.cn)("ml-auto text-xs tracking-widest opacity-60", className)} {...props}/>);
};
exports.DropdownMenuShortcut = DropdownMenuShortcut;
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
