"use strict";(self.webpackChunkpromodoro_timer=self.webpackChunkpromodoro_timer||[]).push([[284],{"./src/toggleButton/toggleButton.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>toggleButton_stories});var react=__webpack_require__("./node_modules/react/index.js"),colors=__webpack_require__("./src/colors/colors.js"),ToggleButton=__webpack_require__("./node_modules/@mui/material/ToggleButton/ToggleButton.js"),ToggleButtonGroup=__webpack_require__("./node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js"),Alarm=__webpack_require__("./node_modules/@mui/icons-material/Alarm.js"),ListAlt=__webpack_require__("./node_modules/@mui/icons-material/ListAlt.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const CustomToggleButton=_ref=>{let{value,onChange}=_ref;return(0,jsx_runtime.jsxs)(ToggleButtonGroup.c,{size:"small",value,onChange,exclusive:!0,children:[(0,jsx_runtime.jsxs)(ToggleButton.c,{value:"timer",sx:{gap:"8px",color:colors.I.RoyalBlue,backgroundColor:colors.I.White,"&:hover":{backgroundColor:colors.I.Zumtho},"&.Mui-selected":{color:colors.I.White,backgroundColor:colors.I.RoyalBlue,"&:hover":{backgroundColor:colors.I.RoyalBlue}}},children:[(0,jsx_runtime.jsx)(Alarm.c,{fontSize:"small"}),"Timer"]}),(0,jsx_runtime.jsxs)(ToggleButton.c,{value:"tasks",sx:{gap:"8px",color:colors.I.RoyalBlue,backgroundColor:colors.I.White,"&:hover":{backgroundColor:colors.I.Zumtho},"&.Mui-selected":{color:colors.I.White,backgroundColor:colors.I.RoyalBlue,"&:hover":{backgroundColor:colors.I.RoyalBlue}}},children:[(0,jsx_runtime.jsx)(ListAlt.c,{fontSize:"small"}),"Tasks"]})]})},toggleButton=CustomToggleButton;CustomToggleButton.__docgenInfo={description:"",methods:[],displayName:"CustomToggleButton"};const toggleButton_stories={title:"Components/Toggle Button",component:toggleButton},Default=()=>{const[selectedValue,setSelectedValue]=(0,react.useState)("timer");return(0,jsx_runtime.jsx)(toggleButton,{value:selectedValue,onChange:(event,newValue)=>{null!==newValue&&setSelectedValue(newValue)}})},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => {\n  const [selectedValue, setSelectedValue] = useState('timer');\n  const handleChange = (event, newValue) => {\n    if (newValue !== null) {\n      setSelectedValue(newValue);\n    }\n  };\n  return <CustomToggleButton value={selectedValue} onChange={handleChange} />;\n}",...Default.parameters?.docs?.source}}}},"./src/colors/colors.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{I:()=>colors});const colors={Black:"#000000",Thundora:"#404040",Manatee:"#97999C",SilverSand:"#BBBCBE",Gallery:"#EFEFEF",White:"#FFFFFF",RoyalBlue:"#4758DC",Portage:"#8B9ACE",Zumtho:"#E1EBFF",Alizarin:"#E32327",Jaffa:"#F2994A",Salem:"#058F23",Lavender:"#BB6BD9"}}}]);