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

eval("// Handles a response from the server\r\nconst handleResponse = async (response, method, user) => {\r\n    const content = document.querySelector('#content');\r\n    const message = document.querySelector('#messages');\r\n    const status = response.status;\r\n\r\n    switch (status){\r\n        case 200:\r\n            message.innerHTML = '<h1>Success</h1>';\r\n            break;\r\n\r\n        case 201:\r\n            message.innerHTML = '<h1>Created</h1>';\r\n            break;\r\n\r\n        case 400:\r\n            message.innerHTML = '<h1>Bad Request: Check Console<h1>';\r\n            break;\r\n\r\n        case 404:\r\n            message.innerHTML = '<h1>Content Not Found</h1>';\r\n            break;\r\n\r\n        default:\r\n            message.innerHTML = '<h1>Status Code Not Implemented</h1>';\r\n            break;\r\n    }\r\n\r\n    // Gets the JSON response\r\n    const resJSON = await response.json();\r\n\r\n    if (status === 400) {\r\n        console.log(resJSON['message']);\r\n    }\r\n\r\n    if (status === 200 || status === 201){\r\n        // Clears the content section of the file\r\n        content.innerHTML = '';\r\n\r\n        // Removes the login System, shows the Squadron Creator System\r\n        document.querySelector('#login').style.display = 'none';\r\n        document.querySelector('#squadronCreation').style.display = 'block';\r\n\r\n        for (let x in resJSON['content']){\r\n            const div = document.createElement('div');\r\n            div.classList.add(\"squadron\");\r\n\r\n            content.appendChild(document.createElement('hr'));\r\n\r\n            const name = document.createElement('h2');\r\n            const points = document.createElement('p');\r\n            const faction = document.createElement('p');\r\n            const btn = document.createElement('button');\r\n\r\n            name.textContent = `${resJSON['content'][x]['name']}`;\r\n            //activeUser = name.textContent;\r\n            points.textContent = `Points Max: ${resJSON['content'][x]['points']}`;\r\n            faction.textContent = `Faction: ${resJSON['content'][x]['faction']}`;\r\n\r\n            btn.textContent = 'Edit Squadron';\r\n            btn.addEventListener('click', async () => {\r\n                try{\r\n                    // Need to figure out how to pass username and squadron name to the next page\r\n                    window.location.href = `/editSquadron?user=${user}&name=${name.textContent}`;\r\n                } catch (err) {\r\n                    console.log(err);\r\n                }\r\n            });\r\n\r\n            div.appendChild(name);\r\n            div.appendChild(points);\r\n            div.appendChild(faction);\r\n            div.appendChild(btn);\r\n\r\n            content.appendChild(div);\r\n        }\r\n    }\r\n}\r\n\r\n// Function to Get the User\r\nconst getUser = async (loginForm) => {\r\n    const method = loginForm.getAttribute('method');\r\n    const name = loginForm.querySelector('#userNameField').value;\r\n\r\n    const formData = `name=${name}`;\r\n\r\n    const response = await fetch('/getUser', {\r\n        method: method,\r\n        headers: {\r\n            'content-type': 'application/x-www-form-urlencoded',\r\n            'accept': 'application/json',\r\n        },\r\n        body: formData,\r\n    });\r\n\r\n    handleResponse(response, method, name);\r\n};\r\n\r\n\r\n// Function to Create a Squadron\r\nconst createSquadron = async (squadronForm, loginForm) => {\r\n    const method = squadronForm.getAttribute('method');\r\n    const userName = loginForm.querySelector('#userNameField').value;\r\n    const name = squadronForm.querySelector('#squadronNameField').value;\r\n    const faction = squadronForm.querySelector('#factionSelect').value;\r\n    const points = squadronForm.querySelector('#pointsLimit').value;\r\n\r\n    const formData = `userName=${userName}&name=${name}&faction=${faction}&points=${points}`;\r\n\r\n    const response = await fetch('/createSquadron', {\r\n        method: method,\r\n        headers: {\r\n            'content-type': 'application/x-www-form-urlencoded',\r\n            'accept': 'application/json',\r\n        },\r\n        body: formData,\r\n    });\r\n\r\n    handleResponse(response, method, userName);\r\n};\r\n\r\n// Init Function\r\nconst init = () => {\r\n    const loginForm = document.querySelector('#loginForm');\r\n    const squadronForm = document.querySelector('#squadronForm');\r\n\r\n    const login = (e) => {\r\n        e.preventDefault();\r\n        getUser(loginForm);\r\n        return false;\r\n    };\r\n\r\n    const create = (e) => {\r\n        e.preventDefault();\r\n        createSquadron(squadronForm, loginForm);\r\n        return false;\r\n    };\r\n\r\n    loginForm.addEventListener('submit', login);\r\n    squadronForm.addEventListener('submit', create);\r\n};\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://430project1/./client/homepageClient.js?");

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