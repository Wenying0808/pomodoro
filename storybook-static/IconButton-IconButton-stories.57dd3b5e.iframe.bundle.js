"use strict";(self.webpackChunkpromodoro_timer=self.webpackChunkpromodoro_timer||[]).push([[316],{"./src/IconButton/IconButton.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Disabled:()=>Disabled,__namedExportsOrder:()=>__namedExportsOrder,default:()=>IconButton_stories});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const IconButton_IconButton=_ref=>{let{disabled,icon,onClick,onMouseover}=_ref;return(0,jsx_runtime.jsx)("div",{className:"IconButtonDiv "+(disabled?"disabled":""),onClick,onMouseOver:onMouseover,children:icon})},src_IconButton_IconButton=IconButton_IconButton;IconButton_IconButton.__docgenInfo={description:"",methods:[],displayName:"IconButton"};var index_es=__webpack_require__("./node_modules/@fortawesome/react-fontawesome/index.es.js"),free_solid_svg_icons=__webpack_require__("./node_modules/@fortawesome/free-solid-svg-icons/index.mjs");const IconButton_stories={title:"Components/Icon Button",component:src_IconButton_IconButton,parameters:{layout:"centered"}},Default={args:{disabled:!1,icon:(0,jsx_runtime.jsx)(index_es.u,{icon:free_solid_svg_icons.EZ,size:"lg"}),tooltipText:"Settings",effectDelay:100}},Disabled={args:{disabled:!0,icon:(0,jsx_runtime.jsx)(index_es.u,{icon:free_solid_svg_icons.EZ,size:"lg"}),tooltipText:"Settings",effectDelay:100}},__namedExportsOrder=["Default","Disabled"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  args: {\n    disabled: false,\n    icon: <FontAwesomeIcon icon={faGear} size="lg" />,\n    tooltipText: "Settings",\n    effectDelay: 100\n  }\n}',...Default.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:'{\n  args: {\n    disabled: true,\n    icon: <FontAwesomeIcon icon={faGear} size="lg" />,\n    tooltipText: "Settings",\n    effectDelay: 100\n  }\n}',...Disabled.parameters?.docs?.source}}}}}]);