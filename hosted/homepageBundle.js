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

eval("// Handles a response from the server\r\nconst handleResponse = async (response, method, form) => {\r\n    const htmlContent = document.querySelector('#content');\r\n    const status = response.status;\r\n\r\n    switch (status){\r\n        case 200:\r\n            htmlContent.innerHTML = '<h1>Welcome Back</h1>';\r\n            break;\r\n\r\n        case 201:\r\n            htmlContent.innerHTML = '<h1>Created User</h1>';\r\n            break;\r\n\r\n        case 400:\r\n            htmlContent.innerHTML = '<h1>Bad Request: Please Input a Name<h1>';\r\n            break;\r\n\r\n        case 404:\r\n            htmlContent.innerHTML = '<h1>Content Not Found';\r\n            return;\r\n\r\n        default:\r\n            htmlContent.innerHTML = '<h1>Status Code Not Implemented</h1>';\r\n            break;\r\n    }\r\n\r\n    if (status === 200 || status === 201){\r\n        // Gets the JSON response\r\n        const resJSON = await response.json();\r\n        console.log(resJSON);\r\n\r\n        // Removes the login System, shows the Squadron Creator System\r\n        document.querySelector('#login').style.display = 'none';\r\n        document.querySelector('#squadronCreation').style.display = 'block';\r\n\r\n        for (let x in resJSON['content']){\r\n            const div = document.createElement('div');\r\n            div.classList.add(\"squadron\");\r\n\r\n            content.appendChild(document.createElement('hr'));\r\n\r\n            const name = document.createElement('h2');\r\n            const points = document.createElement('p');\r\n            const faction = document.createElement('p');\r\n\r\n            name.textContent = `${resJSON['content'][x]['name']}`;\r\n            points.textContent = `Points Max: ${resJSON['content'][x]['points']}`;\r\n            faction.textContent = `Faction: ${resJSON['content'][x]['faction']}`;\r\n\r\n            div.appendChild(name);\r\n            div.appendChild(points);\r\n            div.appendChild(faction);\r\n\r\n            content.appendChild(div);\r\n        }\r\n    }\r\n}\r\n\r\n// Function to Get the User\r\nconst getUser = async (loginForm) => {\r\n    const method = loginForm.getAttribute('method');\r\n    const name = loginForm.querySelector('#userNameField').value;\r\n\r\n    const formData = `name=${name}`;\r\n\r\n    const response = await fetch('/getUser', {\r\n        method: method,\r\n        headers: {\r\n            'content-type': 'application/x-www-form-urlencoded',\r\n            'accept': 'application/json',\r\n        },\r\n        body: formData,\r\n    });\r\n\r\n    handleResponse(response, method);\r\n};\r\n\r\n\r\n// Init Function\r\nconst init = () => {\r\n    const loginForm = document.querySelector('#loginForm');\r\n    const createButton = document.querySelector('#createBtn');\r\n\r\n    const login = (e) => {\r\n        e.preventDefault();\r\n        getUser(loginForm);\r\n        return false;\r\n    }\r\n\r\n    loginForm.addEventListener('submit', login);\r\n};\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://430project1/./client/homepageClient.js?");

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