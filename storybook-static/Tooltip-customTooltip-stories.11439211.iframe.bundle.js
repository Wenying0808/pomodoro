"use strict";(self.webpackChunkpromodoro_timer=self.webpackChunkpromodoro_timer||[]).push([[328],{"./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{c:()=>_inheritsLoose});var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");function _inheritsLoose(subClass,superClass){subClass.prototype=Object.create(superClass.prototype),subClass.prototype.constructor=subClass,(0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__.c)(subClass,superClass)}},"./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _setPrototypeOf(o,p){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function _setPrototypeOf(o,p){return o.__proto__=p,o},_setPrototypeOf(o,p)}__webpack_require__.d(__webpack_exports__,{c:()=>_setPrototypeOf})},"./node_modules/@mui/material/utils/useEventCallback.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{c:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("./node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js").c},"./node_modules/@mui/material/utils/useIsFocusVisible.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{c:()=>utils_useIsFocusVisible});var react=__webpack_require__("./node_modules/react/index.js"),useTimeout=__webpack_require__("./node_modules/@mui/utils/esm/useTimeout/useTimeout.js");let hadKeyboardEvent=!0,hadFocusVisibleRecently=!1;const hadFocusVisibleRecentlyTimeout=new useTimeout.S,inputTypesWhitelist={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function handleKeyDown(event){event.metaKey||event.altKey||event.ctrlKey||(hadKeyboardEvent=!0)}function handlePointerDown(){hadKeyboardEvent=!1}function handleVisibilityChange(){"hidden"===this.visibilityState&&hadFocusVisibleRecently&&(hadKeyboardEvent=!0)}function isFocusVisible(event){const{target}=event;try{return target.matches(":focus-visible")}catch(error){}return hadKeyboardEvent||function focusTriggersKeyboardModality(node){const{type,tagName}=node;return!("INPUT"!==tagName||!inputTypesWhitelist[type]||node.readOnly)||"TEXTAREA"===tagName&&!node.readOnly||!!node.isContentEditable}(target)}const utils_useIsFocusVisible=function useIsFocusVisible(){const ref=react.useCallback((node=>{null!=node&&function prepare(doc){doc.addEventListener("keydown",handleKeyDown,!0),doc.addEventListener("mousedown",handlePointerDown,!0),doc.addEventListener("pointerdown",handlePointerDown,!0),doc.addEventListener("touchstart",handlePointerDown,!0),doc.addEventListener("visibilitychange",handleVisibilityChange,!0)}(node.ownerDocument)}),[]),isFocusVisibleRef=react.useRef(!1);return{isFocusVisibleRef,onFocus:function handleFocusVisible(event){return!!isFocusVisible(event)&&(isFocusVisibleRef.current=!0,!0)},onBlur:function handleBlurVisible(){return!!isFocusVisibleRef.current&&(hadFocusVisibleRecently=!0,hadFocusVisibleRecentlyTimeout.start(100,(()=>{hadFocusVisibleRecently=!1})),isFocusVisibleRef.current=!1,!0)},ref}}},"./node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{c:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_useEnhancedEffect__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js");const __WEBPACK_DEFAULT_EXPORT__=function useEventCallback(fn){const ref=react__WEBPACK_IMPORTED_MODULE_0__.useRef(fn);return(0,_useEnhancedEffect__WEBPACK_IMPORTED_MODULE_1__.c)((()=>{ref.current=fn})),react__WEBPACK_IMPORTED_MODULE_0__.useRef(((...args)=>(0,ref.current)(...args))).current}},"./node_modules/@mui/utils/esm/useTimeout/useTimeout.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>Timeout,c:()=>useTimeout});var react=__webpack_require__("./node_modules/react/index.js");const UNINITIALIZED={};const EMPTY=[];class Timeout{constructor(){this.currentId=null,this.clear=()=>{null!==this.currentId&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Timeout}start(delay,fn){this.clear(),this.currentId=setTimeout((()=>{this.currentId=null,fn()}),delay)}}function useTimeout(){const timeout=function useLazyRef(init,initArg){const ref=react.useRef(UNINITIALIZED);return ref.current===UNINITIALIZED&&(ref.current=init(initArg)),ref}(Timeout.create).current;return function useOnMount(fn){react.useEffect(fn,EMPTY)}(timeout.disposeEffect),timeout}},"./src/Tooltip/customTooltip.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _customTooltip__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/Tooltip/customTooltip.jsx"),_colors_colors__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/colors/colors.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Tooltip",component:_customTooltip__WEBPACK_IMPORTED_MODULE_0__.c,parameters:{layout:"centered"}},Default=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{textAlign:"center",marginTop:"100px"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_customTooltip__WEBPACK_IMPORTED_MODULE_0__.c,{...args,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span",{style:{cursor:"pointer",padding:"10px",backgroundColor:_colors_colors__WEBPACK_IMPORTED_MODULE_1__.I.RoyalBlue,color:_colors_colors__WEBPACK_IMPORTED_MODULE_1__.I.White,borderRadius:"4px"},children:"Hover over me"})})})).bind({});Default.args={title:"This is a custom tooltip"};const __namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <div style={{\n  textAlign: 'center',\n  marginTop: '100px'\n}}>\n      <CustomTooltip {...args}>\n        <span style={{\n      cursor: 'pointer',\n      padding: '10px',\n      backgroundColor: colors.RoyalBlue,\n      color: colors.White,\n      borderRadius: '4px'\n    }}>\n          Hover over me\n        </span>\n      </CustomTooltip>\n    </div>",...Default.parameters?.docs?.source}}}},"./src/Tooltip/customTooltip.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{c:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _mui_material__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@mui/material/styles/styled.js"),_mui_material__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@mui/material/Tooltip/Tooltip.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__=(0,_mui_material__WEBPACK_IMPORTED_MODULE_2__.cp)((_ref=>{let{className,...props}=_ref;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.c,{...props,classes:{popper:className},placement:"top",arrow:!0})}))((()=>({"& .MuiTooltip-tooltip":{backgroundColor:"#333",color:"#fff",fontSize:"12px",borderRadius:"4px",boxShadow:"0px 2px 10px rgba(0, 0, 0, 0.1)",padding:"12px 12px"},"& .MuiTooltip-arrow":{color:"#333"}})))},"./src/colors/colors.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{I:()=>colors});const colors={Black:"#000000",Thundora:"#404040",Manatee:"#97999C",SilverSand:"#BBBCBE",Gallery:"#EFEFEF",White:"#FFFFFF",RoyalBlue:"#4758DC",Portage:"#8B9ACE",Zumtho:"#E1EBFF",Alizarin:"#E32327",Jaffa:"#F2994A",Salem:"#058F23",Lavender:"#BB6BD9"}},"./node_modules/react-transition-group/esm/TransitionGroupContext.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{c:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("./node_modules/react/index.js").createContext(null)}}]);