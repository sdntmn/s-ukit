"use strict";(self.webpackChunks_ukit=self.webpackChunks_ukit||[]).push([[740],{"./src/stories/TableSort.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,__namedExportsOrder:()=>__namedExportsOrder,default:()=>TableSort_stories});var react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),types=__webpack_require__("./src/components/types.ts"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),styles=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./src/components/TableSort/styles.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(styles.Z,options);styles.Z&&styles.Z.locals&&styles.Z.locals;var utils=__webpack_require__("./src/components/utils.ts"),Icons=__webpack_require__("./src/components/_elements/Icons/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Cell=_ref=>{let{id="",onPressCell,value,...rest}=_ref;return(0,jsx_runtime.jsx)("td",{id,className:classnames_default()("itpc-table__cell",onPressCell&&"itpc-table__cell_clickable"),onClick:onPressCell&&onPressCell,...rest,children:value})};Cell.displayName="Cell";const Row=_ref2=>{let{onPressRow,rowData,...rest}=_ref2;return(0,jsx_runtime.jsx)("tr",{className:classnames_default()("itpc-table__row",onPressRow&&"itpc-table__row_clickable"),onClick:onPressRow&&onPressRow,...rest,children:rowData&&Object.entries(rowData).map((cellData=>{if("key"!==cellData[0])return(0,jsx_runtime.jsx)(Cell,{value:cellData[1]},cellData[0])}))})};Row.displayName="Row";const TableBody=_ref3=>{let{id,sourceData,...rest}=_ref3;return(0,jsx_runtime.jsx)("tbody",{className:"itpc-table__body",...rest,children:sourceData&&sourceData.map(((items,index)=>(0,jsx_runtime.jsx)(Row,{id:items.key,rowData:items,"data-index":index+1},items.key)))})};TableBody.displayName="TableBody";const TableHeader=_ref4=>{let{titleColumns,iconSortUp,iconSortDown,isIconClickable,isHeaderCellClickable,isCellHover=!0,orderSortColumn,currentColumnSort,setKeySort}=_ref4;return(0,jsx_runtime.jsx)("thead",{className:"itpc-table__head",children:(0,jsx_runtime.jsx)("tr",{children:titleColumns&&Object.entries(titleColumns).map((item=>(console.info(currentColumnSort===item[1]?.dataIndex),(0,jsx_runtime.jsx)("th",{className:classnames_default()("itpc-table__head",isHeaderCellClickable&&"itpc-icon__sort_clickable"),id:item[1].key,"aria-label":item[1].value,"data-column-key":item[1].dataIndex,onClick:()=>setKeySort?.(item[1]?.dataIndex),children:(0,jsx_runtime.jsxs)("div",{className:"itpc-table-sort__wrap-cell",children:[item[1].title,(0,jsx_runtime.jsxs)("div",{className:"itpc-table__wrap-icon",children:[orderSortColumn===types.t.ASCENDING&&currentColumnSort===item[1]?.dataIndex&&(0,jsx_runtime.jsx)(Icons.fA,{isClickable:isIconClickable,isActiveIcon:currentColumnSort===item[1]?.dataIndex}),orderSortColumn===types.t.NONE&&currentColumnSort===item[1]?.dataIndex&&(0,jsx_runtime.jsx)(Icons.fA,{isClickable:isIconClickable}),orderSortColumn===types.t.DESCENDING&&currentColumnSort===item[1]?.dataIndex&&(0,jsx_runtime.jsx)(Icons.fr,{isClickable:isIconClickable,isActiveIcon:currentColumnSort===item[1]?.dataIndex}),currentColumnSort!==item[1]?.dataIndex&&(0,jsx_runtime.jsx)(Icons.fA,{isClickable:isIconClickable})]})]})},item[0]))))})})};TableHeader.displayName="TableHeader";const TableCaption=_ref5=>{let{captionTable,className=""}=_ref5;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:captionTable&&(0,jsx_runtime.jsx)("caption",{className:classnames_default()("itpc-table-sort__caption",className),children:captionTable})})},TableSort=_ref6=>{let{id,captionTable,titleColumns,sourceData,colorSortableColumn,arrKeySortAsNumber,className="",isHeaderCellClickable,isIconClickable=!1,iconSortUp,iconSortDown,sortedTable,...rest}=_ref6;const newArrObj=sourceData?.map((item=>Object.assign(item))),[keyColumn,setKeyColumn]=(0,react.useState)(""),[orderSortColumn,setOrderSort]=(0,react.useState)(types.t.NONE),[data,setData]=(0,react.useState)(newArrObj),doSort=function(key){let order=arguments.length>1&&void 0!==arguments[1]?arguments[1]:orderSortColumn;const isNumber=arrKeySortAsNumber?.includes(key),sortData=data?.sort((0,utils.u)(key,isNumber));switch(order){case types.t.NONE:setData(sortData),setOrderSort(types.t.ASCENDING);break;case types.t.ASCENDING:setData(sortData?.reverse()),setOrderSort(types.t.DESCENDING);break;case types.t.DESCENDING:setData(newArrObj),setOrderSort(types.t.NONE);break;default:setData(newArrObj),setOrderSort(types.t.NONE),setKeyColumn("")}};return console.log(orderSortColumn),(0,jsx_runtime.jsxs)("table",{id,className:classnames_default()("itpc-table-sort",className),...rest,children:[captionTable&&(0,jsx_runtime.jsx)(TableCaption,{captionTable}),titleColumns&&(0,jsx_runtime.jsx)(TableHeader,{titleColumns,setKeySort:function(){let key=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";setKeyColumn(key),Boolean(key)&&key!==keyColumn?doSort(key,types.t.NONE):doSort(key)},orderSortColumn,currentColumnSort:keyColumn,isHeaderCellClickable,isIconClickable,iconSortUp,iconSortDown}),data&&(0,jsx_runtime.jsx)(TableBody,{sourceData:data})]})};TableSort.displayName="TableSort";try{Cell.displayName="Cell",Cell.__docgenInfo={description:"",displayName:"Cell",props:{id:{defaultValue:{value:""},description:"",name:"id",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string"}},onPressCell:{defaultValue:null,description:"",name:"onPressCell",required:!1,type:{name:"((event?: MouseEvent<HTMLTableCellElement, MouseEvent>) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/TableSort/TableSort.tsx#Cell"]={docgenInfo:Cell.__docgenInfo,name:"Cell",path:"src/components/TableSort/TableSort.tsx#Cell"})}catch(__react_docgen_typescript_loader_error){}try{Row.displayName="Row",Row.__docgenInfo={description:"",displayName:"Row",props:{id:{defaultValue:{value:""},description:"",name:"id",required:!1,type:{name:"string"}},rowData:{defaultValue:null,description:"",name:"rowData",required:!1,type:{name:"{ [key: string]: string; key: string; }"}},onPressRow:{defaultValue:null,description:"",name:"onPressRow",required:!1,type:{name:"((event?: MouseEvent<HTMLTableRowElement, MouseEvent>) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/TableSort/TableSort.tsx#Row"]={docgenInfo:Row.__docgenInfo,name:"Row",path:"src/components/TableSort/TableSort.tsx#Row"})}catch(__react_docgen_typescript_loader_error){}try{TableBody.displayName="TableBody",TableBody.__docgenInfo={description:"",displayName:"TableBody",props:{id:{defaultValue:{value:""},description:"",name:"id",required:!1,type:{name:"string"}},sourceData:{defaultValue:null,description:"",name:"sourceData",required:!1,type:{name:"{ [key: string]: string; key: string; }[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/TableSort/TableSort.tsx#TableBody"]={docgenInfo:TableBody.__docgenInfo,name:"TableBody",path:"src/components/TableSort/TableSort.tsx#TableBody"})}catch(__react_docgen_typescript_loader_error){}try{TableHeader.displayName="TableHeader",TableHeader.__docgenInfo={description:"",displayName:"TableHeader",props:{iconSortUp:{defaultValue:null,description:"",name:"iconSortUp",required:!1,type:{name:"ReactNode"}},iconSortDown:{defaultValue:null,description:"",name:"iconSortDown",required:!1,type:{name:"ReactNode"}},isIconClickable:{defaultValue:{value:"false"},description:"",name:"isIconClickable",required:!1,type:{name:"boolean"}},isHeaderCellClickable:{defaultValue:null,description:"",name:"isHeaderCellClickable",required:!1,type:{name:"boolean"}},isCellHover:{defaultValue:{value:"true"},description:"",name:"isCellHover",required:!1,type:{name:"boolean"}},titleColumns:{defaultValue:null,description:"",name:"titleColumns",required:!1,type:{name:"{ key: string; dataIndex: string; title: string; }[]"}},orderSortColumn:{defaultValue:null,description:"",name:"orderSortColumn",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"ascending"'},{value:'"descending"'},{value:'"other"'}]}},currentColumnSort:{defaultValue:null,description:"",name:"currentColumnSort",required:!1,type:{name:"string"}},setKeySort:{defaultValue:null,description:"",name:"setKeySort",required:!1,type:{name:"((key: string) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/TableSort/TableSort.tsx#TableHeader"]={docgenInfo:TableHeader.__docgenInfo,name:"TableHeader",path:"src/components/TableSort/TableSort.tsx#TableHeader"})}catch(__react_docgen_typescript_loader_error){}try{TableCaption.displayName="TableCaption",TableCaption.__docgenInfo={description:"",displayName:"TableCaption",props:{captionTable:{defaultValue:null,description:"",name:"captionTable",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/TableSort/TableSort.tsx#TableCaption"]={docgenInfo:TableCaption.__docgenInfo,name:"TableCaption",path:"src/components/TableSort/TableSort.tsx#TableCaption"})}catch(__react_docgen_typescript_loader_error){}try{TableSort.displayName="TableSort",TableSort.__docgenInfo={description:"",displayName:"TableSort",props:{id:{defaultValue:{value:""},description:"",name:"id",required:!1,type:{name:"string"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}},captionTable:{defaultValue:null,description:"",name:"captionTable",required:!1,type:{name:"string"}},titleColumns:{defaultValue:null,description:"",name:"titleColumns",required:!1,type:{name:"{ key: string; dataIndex: string; title: string; }[]"}},sourceData:{defaultValue:null,description:"",name:"sourceData",required:!1,type:{name:"{ [key: string]: string; key: string; }[]"}},colorSortableColumn:{defaultValue:null,description:"",name:"colorSortableColumn",required:!1,type:{name:"boolean"}},arrKeySortAsNumber:{defaultValue:null,description:"",name:"arrKeySortAsNumber",required:!1,type:{name:"string[]"}},isHeaderCellClickable:{defaultValue:null,description:"",name:"isHeaderCellClickable",required:!1,type:{name:"boolean"}},isIconClickable:{defaultValue:{value:"false"},description:"",name:"isIconClickable",required:!1,type:{name:"boolean"}},iconSortUp:{defaultValue:null,description:"",name:"iconSortUp",required:!1,type:{name:"ReactNode"}},iconSortDown:{defaultValue:null,description:"",name:"iconSortDown",required:!1,type:{name:"ReactNode"}},sortedTable:{defaultValue:null,description:"",name:"sortedTable",required:!1,type:{name:"((typeSort: string, nameColumn: string) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/TableSort/TableSort.tsx#TableSort"]={docgenInfo:TableSort.__docgenInfo,name:"TableSort",path:"src/components/TableSort/TableSort.tsx#TableSort"})}catch(__react_docgen_typescript_loader_error){}const TableSort_stories={title:"Table/TableSort",component:TableSort},header=[{key:"id1",dataIndex:"name",title:"Name"},{key:"id2",dataIndex:"age",title:"Age"},{key:"id3",dataIndex:"duty",title:"Duty"}],rows=[{key:"1",name:"Сергей",age:"35",duty:"50"},{key:"2",name:"Рома",age:"42",duty:"500.02"},{key:"3",name:"Алексей",age:"18",duty:"1.10"},{key:"4",name:"Борис",age:"9",duty:"250"},{key:"5",name:"Яша",age:"100",duty:"250.02"}],arrKeySortAsNumber=["age","duty"],Base={render:args=>(0,jsx_runtime.jsx)(TableSort,{captionTable:"Table caption",titleColumns:header,sourceData:rows,arrKeySortAsNumber,...args})};Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:'{\n  render: (args: ITableSortProps | null) => <TableSort captionTable="Table caption" titleColumns={header} sourceData={rows} arrKeySortAsNumber={arrKeySortAsNumber} {...args} />\n}',...Base.parameters?.docs?.source}}};const __namedExportsOrder=["Base"]},"./src/components/types.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>AriaSort});let AriaSort=function(AriaSort){return AriaSort.NONE="none",AriaSort.ASCENDING="ascending",AriaSort.DESCENDING="descending",AriaSort.OTHER="other",AriaSort}({})},"./src/components/utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{u:()=>byKey});const byKey=(key,isNumber)=>(a,b)=>isNumber?Number(a[key])-Number(b[key]):a[key].toLowerCase()<b[key].toLowerCase()?-1:a[key].toLowerCase()>b[key].toLowerCase()?1:0},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./src/components/TableSort/styles.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".itpc-table-sort {\n  width: 100%;\n  table-layout: unset;\n  border-spacing: 0;\n  border-radius: 4px;\n  text-align: left;\n  overflow: hidden;\n}\n\n.itpc-icon__sort_clickable {\n  cursor: pointer;\n}\n\n.itpc-table-sort__caption {\n  margin-bottom: 0.5rem;\n  font-size: 14px;\n}\n\n.itpc-table-sort__head {\n  background-color: transparent;\n  cursor: default;\n}\n\n.itpc-table-sort__wrap-cell {\n  display: flex;\n  align-items: center;\n}\n\n.itpc-table__wrap-icon {\n}\n\n.itpc-table__column {\n  padding: 10px;\n  font-weight: 400;\n  border-bottom: 1px solid #b2b7c7;\n  border-radius: 0;\n  cursor: default;\n}\n\n.itpc-table__column_clickable {\n  cursor: pointer;\n}\n\n.itpc-table__body {\n}\n\n.itpc-table__cell {\n  padding: 10px;\n  font-weight: 400;\n  border: none;\n  border-radius: 0;\n  cursor: default;\n}\n\n.itpc-table__cell_clickable {\n  cursor: pointer;\n}\n\n.itpc-table__row {\n  cursor: default;\n  background-color: transparent;\n}\n\n.itpc-table__row_clickable {\n  cursor: pointer;\n}\n\n.itpc-table__row:hover {\n  background-color: #e5e5e5;\n}\n\n.itpc-table__footer {\n}\n","",{version:3,sources:["webpack://./src/components/TableSort/styles.css"],names:[],mappings:"AAAA;EACE,WAAW;EACX,mBAAmB;EACnB,iBAAiB;EACjB,kBAAkB;EAClB,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,qBAAqB;EACrB,eAAe;AACjB;;AAEA;EACE,6BAA6B;EAC7B,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;AACA;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,gCAAgC;EAChC,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;AACA;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,YAAY;EACZ,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,6BAA6B;AAC/B;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;AACA",sourcesContent:[".itpc-table-sort {\r\n  width: 100%;\r\n  table-layout: unset;\r\n  border-spacing: 0;\r\n  border-radius: 4px;\r\n  text-align: left;\r\n  overflow: hidden;\r\n}\r\n\r\n.itpc-icon__sort_clickable {\r\n  cursor: pointer;\r\n}\r\n\r\n.itpc-table-sort__caption {\r\n  margin-bottom: 0.5rem;\r\n  font-size: 14px;\r\n}\r\n\r\n.itpc-table-sort__head {\r\n  background-color: transparent;\r\n  cursor: default;\r\n}\r\n\r\n.itpc-table-sort__wrap-cell {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.itpc-table__wrap-icon {\r\n}\r\n\r\n.itpc-table__column {\r\n  padding: 10px;\r\n  font-weight: 400;\r\n  border-bottom: 1px solid #b2b7c7;\r\n  border-radius: 0;\r\n  cursor: default;\r\n}\r\n\r\n.itpc-table__column_clickable {\r\n  cursor: pointer;\r\n}\r\n\r\n.itpc-table__body {\r\n}\r\n\r\n.itpc-table__cell {\r\n  padding: 10px;\r\n  font-weight: 400;\r\n  border: none;\r\n  border-radius: 0;\r\n  cursor: default;\r\n}\r\n\r\n.itpc-table__cell_clickable {\r\n  cursor: pointer;\r\n}\r\n\r\n.itpc-table__row {\r\n  cursor: default;\r\n  background-color: transparent;\r\n}\r\n\r\n.itpc-table__row_clickable {\r\n  cursor: pointer;\r\n}\r\n\r\n.itpc-table__row:hover {\r\n  background-color: #e5e5e5;\r\n}\r\n\r\n.itpc-table__footer {\r\n}\r\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);