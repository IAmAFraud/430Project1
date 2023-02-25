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

/***/ "./client/editorClient.js":
/*!********************************!*\
  !*** ./client/editorClient.js ***!
  \********************************/
/***/ (() => {

eval("// Faction Ship Types\r\nconst rebelShips = ['A-wing', 'ARC-170', 'Attack Shuttle', 'B-wing', 'CR90 Corvette', 'E-wing', 'GR-75 Medium Transport',\r\n    'HWK-290', 'K-wing', 'Scurrg H-6 Bomber', 'TIE Fighter', 'U-wing', 'VCX-100', 'X-wing', 'Y-wing',\r\n    'YT-1300', 'YT-2400', 'Z-95 Headhunter'];\r\n\r\nconst handleResponse = async (response, key) => {\r\n    const status = response.status;\r\n    switch (status){\r\n        case 200:\r\n            break;\r\n\r\n        case 204:\r\n            return;\r\n\r\n        case 400:\r\n            break;\r\n\r\n        case 404:\r\n            break;\r\n\r\n        default:\r\n            break;\r\n    }\r\n\r\n    const resJSON = await response.json();\r\n    if (status === 200){\r\n        if (key === 'squadron'){\r\n            document.querySelector('#squadronName').textContent += resJSON['content']['name'];\r\n            document.querySelector('#stats').textContent = `Points: 0/${resJSON['content']['points']}     Faction: ${resJSON['content']['faction']}`;\r\n\r\n            // Creates Tabs for Ships\r\n            const pilots = document.querySelector('#pilots');\r\n            pilots.innerHTML = \"\";\r\n            for (let ship in rebelShips){\r\n                const div = document.createElement('div');\r\n                div.textContent = rebelShips[ship];\r\n                div.id = rebelShips[ship].replace(/ /g, '-');\r\n                div.addEventListener('click', () => {                \r\n                });\r\n                pilots.appendChild(div);\r\n            }\r\n\r\n            // Loads in the faction's pilots if the squadron is loaded in\r\n            const pilotResponse = await fetch (`/getFactionData?faction=${resJSON['content']['faction']}`, {\r\n                method: 'get',\r\n                headers: {\r\n                    'accept': 'application/json',\r\n                },\r\n            });\r\n\r\n            handleResponse(pilotResponse, 'pilots');\r\n        } else if (key === 'pilots'){\r\n            console.log(resJSON['content']);\r\n\r\n            for (let ship in rebelShips){\r\n                const filtered = resJSON['content'].filter(x => x.ship === rebelShips[ship]);\r\n                console.log(filtered);\r\n\r\n                let tab = document.querySelector(`#${rebelShips[ship].replace(/ /g, '-')}`);\r\n                console.log(tab.id);\r\n                for (let pilot in filtered){\r\n                    let div = document.createElement('div');\r\n                    div.id = filtered[pilot]['name'];\r\n                    div.innerHTML = `<p>Pilot: ${filtered[pilot]['name']}  Points: ${filtered[pilot]['points']}</p>`;\r\n                    tab.appendChild(div);\r\n                }\r\n            }\r\n\r\n        }\r\n    } else if (status === 400) {\r\n        console.log(resJSON['message']);\r\n    }\r\n}\r\n\r\n\r\nconst init = async () => {\r\n    const squadronResponse = await fetch ('/getSquadronInfo' + window.location.search, {\r\n        method: 'get',\r\n        headers: {\r\n            'content-type': 'application:x-www-form-urlencoded',\r\n            'accept': 'application/json',\r\n        },\r\n    });\r\n    handleResponse(squadronResponse, 'squadron');\r\n};\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://430project1/./client/editorClient.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/editorClient.js"]();
/******/ 	
/******/ })()
;