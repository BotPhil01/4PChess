/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ag-grid-community/dist/package/main.cjs.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ag-grid-community/dist/package/main.cjs.js ***!
  \*****************************************************************/
/***/ ((module) => {


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst ag_grid_community_1 = __webpack_require__(/*! ag-grid-community */ \"./node_modules/ag-grid-community/dist/package/main.cjs.js\");\nag_grid_community_1.ModuleRegistry.registerModules([ag_grid_community_1.ClientSideRowModelModule]);\nwindow.onload = function () {\n    buttons();\n};\nfunction buttons() {\n    var h = document.getElementById(\"homeSwap\");\n    if (h) {\n        h.onclick = swap;\n    }\n    var bb = document.getElementById(\"boardBackButton\");\n    if (bb) {\n        bb.onclick = swap;\n    }\n    var db = document.getElementById(\"debugButton\");\n    if (db) {\n        db.onclick = f;\n    }\n}\nfunction f() {\n    const gridOptions = {\n        rowData: [{ make: \"Tesla\", model: \"Model Y\", price: 64950, electric: true }],\n        columnDefs: [\n            { field: \"make\" },\n            { field: \"model\" },\n            { field: \"price\" },\n            { field: \"electric\" },\n        ],\n        defaultColDef: {\n            flex: 1,\n        },\n        getRowId: (params) => {\n            return params.data.make + params.data.model;\n        },\n        onRowSelected: (event) => {\n            if (event.data) {\n                const price = event.data.price;\n            }\n        }\n    };\n    const gridElem = document.getElementById(\"pieceGrid\");\n    if (!gridElem) {\n        console.error(\"no element found\");\n        return;\n    }\n    else {\n        console.log(\"creating grid with options\");\n        console.log(`${gridOptions}`);\n        (0, ag_grid_community_1.createGrid)(gridElem, gridOptions);\n    }\n}\nfunction swap() {\n    console.log(\"swapping\");\n    let gameDiv = document.getElementById(\"gameDiv\");\n    let homeDiv = document.getElementById(\"homeDiv\");\n    console.log(`${gameDiv}`);\n    if (!homeDiv || !gameDiv) {\n        console.error(\"No divs founds\");\n        return;\n    }\n    if ((homeDiv === null || homeDiv === void 0 ? void 0 : homeDiv.getAttribute(\"class\")) == \"centered\" && (gameDiv === null || gameDiv === void 0 ? void 0 : gameDiv.getAttribute(\"class\")) == \"destroy\") {\n        homeDiv.setAttribute(\"class\", \"destroy\");\n        gameDiv.setAttribute(\"class\", \"block\");\n    }\n    else {\n        homeDiv.setAttribute(\"class\", \"centered\");\n        gameDiv.setAttribute(\"class\", \"destroy\");\n    }\n}\n\n\n//# sourceURL=webpack://4pchess/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;