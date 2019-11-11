/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.config.js":
/*!***********************!*\
  !*** ./app.config.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n    apiUrl : \"http://localhost:4545\"\n};\n\n//# sourceURL=webpack:///./app.config.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const appConfig = __webpack_require__(/*! ./app.config */ \"./app.config.js\");\nconst JetpackService = __webpack_require__(/*! ./src/Service/Api/JetpackApi */ \"./src/Service/Api/JetpackApi.js\");\nconst HttpClient = __webpack_require__(/*! ./src/HttpClient */ \"./src/HttpClient.js\");\nconst Jetpack = __webpack_require__(/*! ./src/Entity/Jetpack */ \"./src/Entity/Jetpack.js\");\n\nconst httpClient = new HttpClient(appConfig.apiUrl);\nconst jetpackService = new JetpackService(httpClient);\n\njetpackService.getJetpacks().then(jetpacks => {\n    let html =  ' <div class=\"card-columns\" id=\"cardColumn\">\\n';\n    jetpacks.forEach((jetpack) => {\n        html +=\n            '<div class=\"card\" style=\"width: 18rem;\">\\n' +\n            '  <img src=\"'+ jetpack.image +'\" class=\"card-img-top\" alt=\"...\" id=\"edit-image-'+jetpack.id+'\" value=\"'+jetpack.image+'\">\\n' +\n            '  <div class=\"card-body\">\\n' +\n            '    <h5 class=\"card-title\" id=\"edit-name-'+jetpack.id+'\" value=\"' + jetpack.name + '\">' + jetpack.name + '</h5>\\n' +\n            '    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#modalEdit\"  id=\"'+jetpack.id+'\" onclick=\"editJetpack(this.id)\" > Edit </button>\\n' +\n            '  </div>\\n' +\n            '</div>\\n'\n\n    });\n    html +='</div>';\n    document.getElementById('jetpacks').innerHTML = html;\n\n});\n\ndocument.getElementById('save').onclick = () =>{\n\n  name = document.getElementById('nom').value;\n  image = document.getElementById('image').value;\n\n  jetpackService.save(name,image).then(jetpack => {\n    //alert(jetpack.id);\n      let html =  '';\n          html +=\n              '<div class=\"card\" style=\"width: 18rem;\">\\n' +\n              '  <img src=\"'+ jetpack.image +'\" class=\"card-img-top\" alt=\"...\" id=\"edit-image-'+jetpack.id+'\" value=\"'+ jetpack.image +'\">\\n' +\n              '  <div class=\"card-body\">\\n' +\n              '    <h5 class=\"card-title\" id=\"edit-name-'+jetpack.id+'\" value=\"' + jetpack.name + '\">' + jetpack.name + '</h5>\\n' +\n              '    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#modalEdit\" id=\"'+jetpack.id+'\" onclick=\"editJetpack(this.id)\" > Edit </button>\\n' +\n              '  </div>\\n' +\n              '</div>';\n      //alert(html);\n      document.getElementById('cardColumn').innerHTML += html;\n\n  });\n  $('#modalCreate').modal('hide');\n\n}\n\ndocument.getElementById('edit').onclick = () =>{\n  name = document.getElementById('EditNom').value;\n  image = document.getElementById('EditImage').value;\n  id = document.getElementById('edit-id').value;\n\n  jetpackService.edit(id,name,image).then(jetpack => {\n      document.getElementById(\"edit-name-\" + id).textContent = jetpack.name;\n      document.getElementById(\"edit-image-\" + id).src = jetpack.image;\n      document.getElementById(\"edit-image-\" + id).value = jetpack.image;\n\n      document.getElementById('EditNom').value = \"\"\n      document.getElementById('EditImage').value = \"\"\n  });\n  $('#modalEdit').modal('hide');\n}\n\ndocument.getElementById('book').onclick = () =>{\n  id = document.getElementById('book-id').value;\n  jetpackService.reserver(id).then(jetpack => {\n      let html =\n        '<div class=\"card\" style=\"width: 18rem;\">\\n' +\n        '  <img src=\"'+ jetpack.image +'\" class=\"card-img-top\" alt=\"...\" id=\"book-image-'+jetpack.id+'\" value=\"'+ jetpack.image +'\">\\n' +\n        '  <div class=\"card-body\">\\n' +\n        '    <h5 class=\"card-title\" id=\"book-name-'+jetpack.id+'\" value=\"' + jetpack.name + '\">' + jetpack.name + '</h5>\\n' +\n        '  </div>\\n' +\n        '</div>';\n      document.getElementById('cardColumnBook').innerHTML +=html;\n      document.getElementById('cardColumnAvailable').innerHTML = \"\";\n  });\n  $('#modalReserver').modal('hide');\n}\n\neditJetpack = function (id) {\n  /// Rajouter dans le modal edit les valeur de nom et url + un hidden avec l'id du jetpack a edit grace au bouton\n  document.getElementById('EditNom').value = document.getElementById('edit-name-'+id+'').innerHTML;\n  document.getElementById('EditImage').value = document.getElementById('edit-image-'+id+'').src;\n  document.getElementById('edit-id').value = id;\n}\n\nsearch = function() {\n    const startDate = document.getElementById('startDate').value;\n    const endDate = document.getElementById('endDate').value;\n    let backgroundColorStartDate = \"white\";\n    let backgroundColorEndDate = \"white\";\n    if(isValidDates(startDate, endDate)) {\n        jetpackService.searchJetpack(startDate, endDate).then(jetpacks => {\n            document.getElementById('cardColumnAvailable').innerHTML = \"\";\n\n            if(jetpacks.length<1){\n              html = ' <div class=\"container center\" style=\"margin-top: 30px; margin-bottom: 30px;\">\\n'+\n                      ' <div class=\" inner\" style=\"width: 30rem; border: 3px solid green;\">          \\n'+\n                      ' <h4 class=\"center\"> Désolé, aucun Jetpack n\\'est diponible dans cette periode</h4>\\n'+\n                      ' </div>\\n'+\n                      ' </div>'\n              document.getElementById('jetpacksAvailable').innerHTML +=html;\n            }\n            else{\n            jetpacks.forEach((jetpack) => {\n                let html =  '';\n                  html +=\n                      '<div class=\"card\" style=\"width: 18rem;\">\\n' +\n                      '  <img src=\"'+ jetpack.image +'\" class=\"card-img-top\" alt=\"...\" id=\"book-image-'+jetpack.id+'\" value=\"'+ jetpack.image +'\">\\n' +\n                      '  <div class=\"card-body\">\\n' +\n                      '    <h5 class=\"card-title\" id=\"book-name-'+jetpack.id+'\" value=\"' + jetpack.name + '\">' + jetpack.name + '</h5>\\n' +\n                      '    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#modalReserver\" id=\"'+jetpack.id+'\" onclick=\"ReserverJetpack(this.id)\" > Reserver </button>\\n' +\n                      '  </div>\\n' +\n                      '</div>';\n                document.getElementById('cardColumnAvailable').innerHTML +=html;\n\n            });\n          }\n        });\n    }else{\n         backgroundColorStartDate = \"red\";\n         backgroundColorEndDate = \"red\";\n    }\n\n    document.getElementById('startDate').style.backgroundColor = backgroundColorStartDate;\n    document.getElementById('endDate').style.backgroundColor = backgroundColorEndDate;\n};\n\nisValidDates = function (startDate, endDate) {\n    return new Date(startDate) <= new Date(endDate);\n};\n\nReserverJetpack = function (id){\n  document.getElementById('BookName').innerHTML = document.getElementById('book-name-'+id+'').innerHTML;\n  document.getElementById('book-id').value = id;\n}\n\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/Entity/Jetpack.js":
/*!*******************************!*\
  !*** ./src/Entity/Jetpack.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class  {\n    constructor() {\n        this._id = null;\n        this._name = null;\n        this._image = null;\n    }\n\n    get id() {\n        return this._id;\n    }\n\n    set id(value) {\n        this._id = value;\n    }\n\n    get name() {\n        return this._name;\n    }\n\n    set name(value) {\n        this._name = value;\n    }\n\n    get image() {\n        return this._image;\n    }\n\n    set image(value) {\n        this._image = value;\n    }\n}\n\n//# sourceURL=webpack:///./src/Entity/Jetpack.js?");

/***/ }),

/***/ "./src/HttpClient.js":
/*!***************************!*\
  !*** ./src/HttpClient.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = class  {\n    constructor(url) {\n        this.url = url;\n    }\n\n    fetch (path, options) {\n        return fetch(this.url + path, options).then(response => response.json());\n    }\n};\n\n//# sourceURL=webpack:///./src/HttpClient.js?");

/***/ }),

/***/ "./src/Service/Api/JetpackApi.js":
/*!***************************************!*\
  !*** ./src/Service/Api/JetpackApi.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const JetpackApi = __webpack_require__(/*! ../../Entity/Jetpack */ \"./src/Entity/Jetpack.js\");\nmodule.exports = class  {\n    constructor(httpClient) {\n        this.httpClient = httpClient;\n    }\n\n    getJetpacks() {\n        return this.httpClient.fetch('/jetpacks', {}).then(rows => {\n\n            return rows.map(row => {\n                let jetpack = new JetpackApi();\n                jetpack.id = row.id;\n                jetpack.name = row.name;\n                jetpack.image = row.image;\n                return jetpack\n            });\n        });\n    }\n\n    save(name,image) {\n        return this.httpClient.fetch('/jetpacks',\n        {\n            method:'POST',\n            body:\"name=\"+name+\"&image=\"+image+\"\"\n          }).then(row => {\n              let jetpack = new JetpackApi();\n              jetpack.id = row.id;\n              jetpack.name = row.name;\n              jetpack.image = row.image;\n              return jetpack;\n        });\n    }\n\n    edit(id,name, image) {\n        return this.httpClient.fetch('/jetpacks',\n        {\n          method:'POST',\n          body:\"name=\"+name+\"&image=\"+image+\"&id=\"+id+\"\"\n        }).then(row => {\n              let jetpack = new JetpackApi();\n              jetpack.id = row.id;\n              jetpack.name = row.name;\n              jetpack.image = row.image;\n              return jetpack;\n        });\n    }\n\n    searchJetpack(startDate, endDate){\n        return this.httpClient.fetch('/jetpacks',\n            {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/x-www-form-urlencoded'\n                },\n                body: \"startDate=\" +(new Date(startDate)).getTime() / 1000  + \"&endDate=\" + (new Date(endDate)).getTime() / 1000\n            }\n\n        ).then(rows => {\n            return rows.map(row => {\n                let jetpack = new JetpackApi();\n                jetpack.id      = row.id;\n                jetpack.name    = row.name;\n                jetpack.image   = row.image;\n\n                return jetpack\n            });\n        });\n    }\n\n    reserver(id) {\n        return this.httpClient.fetch('/jetpacks',\n          {\n              method:'POST',\n              body:\"id=\"+id\n          }).then(row => {\n              let jetpack = new JetpackApi();\n              jetpack.id = row.id;\n              jetpack.name = row.name\n              jetpack.image = row.image;\n              return jetpack;\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/Service/Api/JetpackApi.js?");

/***/ })

/******/ });