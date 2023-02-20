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

/***/ "./client/homepageClient.js":
/*!**********************************!*\
  !*** ./client/homepageClient.js ***!
  \**********************************/
/***/ (() => {

eval("// Handles a response from the server\r\nconst handleResponse = async (response, method, form) => {\r\n    const jsonRes = await response.json();\r\n    console.log(jsonRes);\r\n}\r\n\r\n// Function to Get the User\r\nconst getUser = async (loginForm) => {\r\n    const method = loginForm.getAttribute('method');\r\n    const name = loginForm.querySelector('#nameField').value;\r\n\r\n    const formData = `name=${name}`;\r\n\r\n    const response = await fetch('/getUser', {\r\n    method: method,\r\n    headers: {\r\n        'content-type': 'application/x-www-form-urlencoded',\r\n        'accept': 'application/json',\r\n    },\r\n    body: formData,\r\n    });\r\n\r\n    handleResponse(response, method);\r\n    \r\n};\r\n\r\n\r\n// Init Function\r\nconst init = () => {\r\n    const loginForm = document.querySelector(\"#loginForm\");\r\n\r\n    const login = (e) => {\r\n        e.preventDefault();\r\n        getUser(loginForm);\r\n        return false;\r\n    }\r\n\r\n    loginForm.addEventListener('submit', login);\r\n};\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://430project1/./client/homepageClient.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/homepageClient.js"]();
/******/ 	
/******/ })()
;