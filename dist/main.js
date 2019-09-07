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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Task.js":
/*!*********************!*\
  !*** ./src/Task.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Task; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Task =\n/*#__PURE__*/\nfunction () {\n  function Task() {\n    _classCallCheck(this, Task);\n\n    var tasks = [];\n  }\n  /**\r\n   * helps to add a task to list of tasks\r\n   * @param {object} task\r\n   */\n\n\n  _createClass(Task, [{\n    key: \"addTask\",\n    value: function addTask(task) {\n      console.log(\"calling addTask method\");\n    }\n  }, {\n    key: \"removeTask\",\n\n    /**\r\n     * helps to remove a task from list of tasks\r\n     * @param {integer} taskId\r\n     */\n    value: function removeTask(taskId) {\n      console.log(\"calling removeTask method\");\n    }\n  }, {\n    key: \"updateTask\",\n\n    /**\r\n     * helps to update a task\r\n     * @param {integer} taskId\r\n     */\n    value: function updateTask(taskId) {\n      console.log(\"calling updateTask method\");\n    }\n  }, {\n    key: \"markTask\",\n\n    /**\r\n     * helps to mark a task as completed or uncompleted.\r\n     * when this function is called on a completed task, it makes\r\n     * that task to be uncompleted\r\n     * @param {integer} taskId\r\n     */\n    value: function markTask(taskId) {\n      console.log(\"calling markTask method\");\n    }\n  }]);\n\n  return Task;\n}();\n\n\n\n//# sourceURL=webpack:///./src/Task.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ \"./src/Task.js\");\n// ### this file helps to incorporate interaction to app\n // test import\n\nvar task = new _Task__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ntask.addTask();\ntask.updateTask();\ntask.markTask();\ntask.removeTask();\n/**\r\n * simplify the process of retrieving a DOM element\r\n *\r\n * @param element_identifier: an identifier represening the element\r\n * to be retrieved from DOM e.g\r\n *\r\n * for class referencing --->   .wrapper\r\n *\r\n * for id referencing    --->   #wrapper\r\n */\n\nvar get = function get(element_identifier) {\n  if (element_identifier.charAt(0) === \"#\") {\n    return document.getElementById(element_identifier.slice(1));\n  }\n\n  if (element_identifier.charAt(0) === \".\") {\n    return document.getElementsByClassName(element_identifier.slice(1));\n  }\n\n  throw new SyntaxError(\"no identifying symbol e.g (# --> id or . --> class)\");\n};\n/**\r\n * helps to toggle modal for adding a task\r\n */\n\n\nvar toggle_add_task_modal = function toggle_add_task_modal() {\n  var modal = get(\"#add_task_modal\"); //   if (modal.classList.contains(\"hide\")) {\n  //     modal.classList.remove(\".hide\");\n  //   }\n\n  modal.classList.toggle(\"show\");\n};\n/** Plugging event handlers to event listeners */\n\n\nvar add_task_modal_opener = get(\"#open_add_task_modal--js\");\nvar add_task_modal_closer__lg = get(\"#close_add_task_modal--lg\");\nvar add_task_modal_closer__sm = get(\"#close_add_task_modal--sm\");\nadd_task_modal_opener.addEventListener(\"click\", toggle_add_task_modal);\nadd_task_modal_closer__lg.addEventListener(\"click\", toggle_add_task_modal);\nadd_task_modal_closer__sm.addEventListener(\"click\", toggle_add_task_modal);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });