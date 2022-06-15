/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js":
/*!******************************************************************!*\
  !*** ./node_modules/@googlemaps/js-api-loader/dist/index.esm.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_ID": () => (/* binding */ DEFAULT_ID),
/* harmony export */   "Loader": () => (/* binding */ Loader),
/* harmony export */   "LoaderStatus": () => (/* binding */ LoaderStatus)
/* harmony export */ });
// do not edit .js files directly - edit src/index.jst



var fastDeepEqual = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at.
 *
 *      Http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_ID = "__googleMapsScriptId";
/**
 * The status of the [[Loader]].
 */
var LoaderStatus;
(function (LoaderStatus) {
    LoaderStatus[LoaderStatus["INITIALIZED"] = 0] = "INITIALIZED";
    LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
    LoaderStatus[LoaderStatus["SUCCESS"] = 2] = "SUCCESS";
    LoaderStatus[LoaderStatus["FAILURE"] = 3] = "FAILURE";
})(LoaderStatus || (LoaderStatus = {}));
/**
 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
 * dynamically using
 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 * It works by dynamically creating and appending a script node to the the
 * document head and wrapping the callback function so as to return a promise.
 *
 * ```
 * const loader = new Loader({
 *   apiKey: "",
 *   version: "weekly",
 *   libraries: ["places"]
 * });
 *
 * loader.load().then((google) => {
 *   const map = new google.maps.Map(...)
 * })
 * ```
 */
class Loader {
    /**
     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
     * using this library, instead the defaults are set by the Google Maps
     * JavaScript API server.
     *
     * ```
     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
     * ```
     */
    constructor({ apiKey, authReferrerPolicy, channel, client, id = DEFAULT_ID, language, libraries = [], mapIds, nonce, region, retries = 3, url = "https://maps.googleapis.com/maps/api/js", version, }) {
        this.CALLBACK = "__googleMapsCallback";
        this.callbacks = [];
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.apiKey = apiKey;
        this.authReferrerPolicy = authReferrerPolicy;
        this.channel = channel;
        this.client = client;
        this.id = id || DEFAULT_ID; // Do not allow empty string
        this.language = language;
        this.libraries = libraries;
        this.mapIds = mapIds;
        this.nonce = nonce;
        this.region = region;
        this.retries = retries;
        this.url = url;
        this.version = version;
        if (Loader.instance) {
            if (!fastDeepEqual(this.options, Loader.instance.options)) {
                throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
            }
            return Loader.instance;
        }
        Loader.instance = this;
    }
    get options() {
        return {
            version: this.version,
            apiKey: this.apiKey,
            channel: this.channel,
            client: this.client,
            id: this.id,
            libraries: this.libraries,
            language: this.language,
            region: this.region,
            mapIds: this.mapIds,
            nonce: this.nonce,
            url: this.url,
            authReferrerPolicy: this.authReferrerPolicy,
        };
    }
    get status() {
        if (this.errors.length) {
            return LoaderStatus.FAILURE;
        }
        if (this.done) {
            return LoaderStatus.SUCCESS;
        }
        if (this.loading) {
            return LoaderStatus.LOADING;
        }
        return LoaderStatus.INITIALIZED;
    }
    get failed() {
        return this.done && !this.loading && this.errors.length >= this.retries + 1;
    }
    /**
     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
     *
     * @ignore
     */
    createUrl() {
        let url = this.url;
        url += `?callback=${this.CALLBACK}`;
        if (this.apiKey) {
            url += `&key=${this.apiKey}`;
        }
        if (this.channel) {
            url += `&channel=${this.channel}`;
        }
        if (this.client) {
            url += `&client=${this.client}`;
        }
        if (this.libraries.length > 0) {
            url += `&libraries=${this.libraries.join(",")}`;
        }
        if (this.language) {
            url += `&language=${this.language}`;
        }
        if (this.region) {
            url += `&region=${this.region}`;
        }
        if (this.version) {
            url += `&v=${this.version}`;
        }
        if (this.mapIds) {
            url += `&map_ids=${this.mapIds.join(",")}`;
        }
        if (this.authReferrerPolicy) {
            url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
        }
        return url;
    }
    deleteScript() {
        const script = document.getElementById(this.id);
        if (script) {
            script.remove();
        }
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     */
    load() {
        return this.loadPromise();
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     *
     * @ignore
     */
    loadPromise() {
        return new Promise((resolve, reject) => {
            this.loadCallback((err) => {
                if (!err) {
                    resolve(window.google);
                }
                else {
                    reject(err.error);
                }
            });
        });
    }
    /**
     * Load the Google Maps JavaScript API script with a callback.
     */
    loadCallback(fn) {
        this.callbacks.push(fn);
        this.execute();
    }
    /**
     * Set the script on document.
     */
    setScript() {
        if (document.getElementById(this.id)) {
            // TODO wrap onerror callback for cases where the script was loaded elsewhere
            this.callback();
            return;
        }
        const url = this.createUrl();
        const script = document.createElement("script");
        script.id = this.id;
        script.type = "text/javascript";
        script.src = url;
        script.onerror = this.loadErrorCallback.bind(this);
        script.defer = true;
        script.async = true;
        if (this.nonce) {
            script.nonce = this.nonce;
        }
        document.head.appendChild(script);
    }
    /**
     * Reset the loader state.
     */
    reset() {
        this.deleteScript();
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.onerrorEvent = null;
    }
    resetIfRetryingFailed() {
        if (this.failed) {
            this.reset();
        }
    }
    loadErrorCallback(e) {
        this.errors.push(e);
        if (this.errors.length <= this.retries) {
            const delay = this.errors.length * Math.pow(2, this.errors.length);
            console.log(`Failed to load Google Maps script, retrying in ${delay} ms.`);
            setTimeout(() => {
                this.deleteScript();
                this.setScript();
            }, delay);
        }
        else {
            this.onerrorEvent = e;
            this.callback();
        }
    }
    setCallback() {
        window.__googleMapsCallback = this.callback.bind(this);
    }
    callback() {
        this.done = true;
        this.loading = false;
        this.callbacks.forEach((cb) => {
            cb(this.onerrorEvent);
        });
        this.callbacks = [];
    }
    execute() {
        this.resetIfRetryingFailed();
        if (this.done) {
            this.callback();
        }
        else {
            // short circuit and warn if google.maps is already loaded
            if (window.google && window.google.maps && window.google.maps.version) {
                console.warn("Google Maps already loaded outside @googlemaps/js-api-loader." +
                    "This may result in undesirable behavior as options and script parameters may not match.");
                this.callback();
                return;
            }
            if (this.loading) ;
            else {
                this.loading = true;
                this.setCallback();
                this.setScript();
            }
        }
    }
}


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/main.css":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/main.css ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../src/img/gabriella-clare-marino-F6AkaAzN4lk-unsplash.jpg */ "./src/img/gabriella-clare-marino-F6AkaAzN4lk-unsplash.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Akshar&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Courgette&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* font-family: 'Akshar', sans-serif; */\n/* font-family: 'Courgette', cursive; */\n\n* {\n    font-family: 'Akshar', sans-serif;\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\n\n/* Navbar, container, and footer */\n#container {\n    height: 100vh;\n    display: flex;\n    flex: auto;\n    flex-direction: column;\n    justify-content: space-between;\n    align-content: center;\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    background-repeat: no-repeat;\n    background-attachment: fixed;\n    background-size: cover;\n}\n\n#navbar {\n    flex-grow: 0;\n    overflow: hidden;\n    width: 100vw;\n    padding: 20px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background-color: rgba(0, 0, 0, .5);\n}\n\n#navbar button {\n    background: none;\n    border: none;\n    color: #FFF;\n    font-size: 1.3rem;\n    margin: 0 15px;\n}\n\n#navbar button:hover {\n    text-decoration: underline;\n}\n\n.footer {\n    flex-grow: 0;\n    display: flex;\n    justify-content: center;\n    align-content: center;\n    margin: 15px;\n    color: #FFF;\n}\n\n#page-content-container {\n    flex: 1;\n    overflow-y: auto;\n}\n\n/* Main page */\n.words {\n    color: #FFF;\n    text-align: center;\n    padding: 10px;\n    display: flex;\n    flex-direction: column;\n    align-content: center;\n    justify-content: center;\n}\n\n.main-container .name {\n    font-size: 4rem;\n    font-family: 'Courgette', cursive;\n}\n\n.main-container .name-text {\n    font-size: 2rem;\n    font-family: 'Akshar', sans-serif;\n}\n\n\n/* Menu Page */\n\n.menu-content {\n    width: 100%;\n    background-color: #FFF;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-start;\n    align-items: center;\n}\n\n.menu-header {\n    margin: 20px;\n}\n\n.menu-selector {\n    margin-bottom: 40px;\n    display: flex;\n    justify-content: center;\n\n}\n\n.menu-selector button {\n    background: none;\n    border: none;\n    color: black;\n    font-size: 1.2rem;\n    margin: 0 15px;\n}\n\n.menu-selector button:hover {\n    transform: scale(.95);\n    transition: 300ms;\n\n}\n\n.menu-display {\n    max-width: 450px;\n    text-align: center;\n}\n\n/* menu title*/\n\n.menu-title {\n    margin: 20px 0;\n    font-size: 1.8rem;\n}\n\n.menu-title-p {\n    margin-top: -10px;\n    margin-bottom: 20px;\n    font-size: 1rem;\n}\n\n.menu-item{\n    margin-bottom: 15px;\n}\n\n.menu-item h2{\n    font-size: 1.5rem;\n}\n\n.menu-item p {\n    font-size: 1rem\n}\n\n.menu-item-top-space {\n    margin-top: 40px;\n}\n\n/* About page */\n\n\n.about-content {\n    display: flex;\n    flex-direction: column;\n    align-content: center;\n    align-items: center;\n    justify-content: flex-start;\n    background-color: #FFF;\n    \n}\n\n.about-header {\n    text-align: center;\n    margin: 20px 0;\n}\n\n.carousel {\n    margin: 20px 0;\n    height: 400px;\n    width: 400px;\n    margin-left: 5px;\n    position: relative;\n}\n\n.slide {\n    margin-top: 20px;\n    position: absolute;\n    list-style: none;\n    opacity: 0;\n    transition: 300ms opacity ease-in-out;\n    transition-delay: 300ms;\n    height: 400px;\n    width: 400px;\n}\n\n.slide.active {\n    opacity: 1;\n    z-index: 1;\n    transition-delay: 0ms;\n}\n\n.slide img {\n    /* display: block; */\n    object-fit: cover;\n    height: 100%;\n    width: 100%;\n    object-position: center;\n}\n\n.carousel-button {\n    position: absolute;\n    z-index: 2;\n    background: none;\n    border: none;\n    vertical-align: center;\n    font-size: 2rem;\n    top: 97%;\n    transform: translateY(-50%);\n    color: rgba(255, 255, 255, .8);\n    cursor: pointer;\n    border-radius: .25rem;\n    padding: 0 .5rem;\n    background-color: rgba(0, 0, 0, .4);\n}\n\n.nav-div {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 2;\n    position: absolute;\n    width: 250px;\n    top: 97%;\n    right: 75px;\n    cursor: pointer;\n}\n\n.img-nav-button {\n    width: 1rem;\n    height: 1rem;\n    position: relative;\n}\n\n.img-nav-button::before,\n.img-nav-button::after {\n    content: '';\n    position: absolute;\n    border-radius: 50%;\n}\n\n.img-nav-button::before {\n    width: .5rem;\n    height: .5rem;\n    border: #fff 2px solid;\n}\n\n.nav-div > .active::after {\n    width: .7rem;\n    height: .7rem;\n    background-color: white;\n}\n\n.carousel-button:hover,\n.carousel-button:focus {\n    color: #fff;\n    background-color: rgba(0, 0, 0, .2);\n}\n\n.carousel-button:focus {\n    outline: 1px solid black;\n}\n\n.carousel-button.prev {\n    left: .2rem;\n}\n\n.carousel-button.next {\n    right: .2rem;\n}\n\n.chef-info,\n.restaurant-info {\n    max-width: 400px;\n    margin: 20px 0;\n}\n\n.restaurant-info h2 {\n    font-size: 1.8rem;\n    text-align: center;\n    margin-bottom: 5px;\n}\n\n.about-content img {\n    max-width: 400px; \n    margin-bottom: 5px;\n}\n\n.chef-text {\n    text-align: center;\n}\n\n/* contact page */\n\n.contact-content {\n    background-color: #FFF;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: flex-start;\n}\n\n.contact-header {\n    margin-top: 20px;\n    text-align: center;\n}\n\n#map {\n    margin: 20px 0;\n    height: 400px;\n    width: 400px;\n}\n\nform h2 {\n    text-align: center;\n    margin-bottom: 15px;;\n}\n\n.contact-content form {\n    margin-top: 40px;\n    max-width: 500px;\n}\n\n.contact-content ul {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n}\n\nform li + li {\n    margin-top: 1em;\n}\n\n.text-input label {\n    display: inline-block;\n    width: 90px;\n    text-align: right;\n    margin-right: 1rem;\n}\n\ntext input,\nform textarea {\n  font: 1em;\n  width: 300px;\n  box-sizing: border-box;\n  border: 1px solid #999;\n}\n\nform input:focus,\nform textarea:focus {\n  border-color: blue;\n}\n\n[type=\"checkbox\"] {\n    vertical-align: middle;\n    margin-left: 5rem;\n    margin-right: 1rem;\n}\n\n\ntextarea {\n  vertical-align: top;\n  height: 5em;\n  resize: none;\n}\n\n.form-button {\n  margin-left: 5rem;\n}\n\nform button {\n    padding: 5px 10px;\n    background-color: #0b7df0;\n    border: 1px solid #0b7df0;\n    color: #FFF;\n    border-radius: 5px;\n}\n\nform button:hover {\n    background-color: #FFF;\n    color: #0b7df0;\n}\n\n/* Media query */\n@media (max-width: 500px) {\n    #navbar {\n        flex-direction: column;\n    }\n\n    .menu-selector {\n        flex-direction: column;\n    }\n\n    .menu-selector button {\n        margin-bottom: 10px;;\n    }\n}", "",{"version":3,"sources":["webpack://./src/main.css"],"names":[],"mappings":"AACA,uCAAuC;AAEvC,uCAAuC;;AAEvC;IACI,iCAAiC;IACjC,UAAU;IACV,SAAS;IACT,sBAAsB;AAC1B;;AAEA,kCAAkC;AAClC;IACI,aAAa;IACb,aAAa;IACb,UAAU;IACV,sBAAsB;IACtB,8BAA8B;IAC9B,qBAAqB;IACrB,yDAAiF;IACjF,4BAA4B;IAC5B,4BAA4B;IAC5B,sBAAsB;AAC1B;;AAEA;IACI,YAAY;IACZ,gBAAgB;IAChB,YAAY;IACZ,aAAa;IACb,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,mCAAmC;AACvC;;AAEA;IACI,gBAAgB;IAChB,YAAY;IACZ,WAAW;IACX,iBAAiB;IACjB,cAAc;AAClB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,uBAAuB;IACvB,qBAAqB;IACrB,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,OAAO;IACP,gBAAgB;AACpB;;AAEA,cAAc;AACd;IACI,WAAW;IACX,kBAAkB;IAClB,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,qBAAqB;IACrB,uBAAuB;AAC3B;;AAEA;IACI,eAAe;IACf,iCAAiC;AACrC;;AAEA;IACI,eAAe;IACf,iCAAiC;AACrC;;;AAGA,cAAc;;AAEd;IACI,WAAW;IACX,sBAAsB;IACtB,aAAa;IACb,sBAAsB;IACtB,2BAA2B;IAC3B,mBAAmB;AACvB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,mBAAmB;IACnB,aAAa;IACb,uBAAuB;;AAE3B;;AAEA;IACI,gBAAgB;IAChB,YAAY;IACZ,YAAY;IACZ,iBAAiB;IACjB,cAAc;AAClB;;AAEA;IACI,qBAAqB;IACrB,iBAAiB;;AAErB;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA,cAAc;;AAEd;IACI,cAAc;IACd,iBAAiB;AACrB;;AAEA;IACI,iBAAiB;IACjB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI;AACJ;;AAEA;IACI,gBAAgB;AACpB;;AAEA,eAAe;;;AAGf;IACI,aAAa;IACb,sBAAsB;IACtB,qBAAqB;IACrB,mBAAmB;IACnB,2BAA2B;IAC3B,sBAAsB;;AAE1B;;AAEA;IACI,kBAAkB;IAClB,cAAc;AAClB;;AAEA;IACI,cAAc;IACd,aAAa;IACb,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,gBAAgB;IAChB,UAAU;IACV,qCAAqC;IACrC,uBAAuB;IACvB,aAAa;IACb,YAAY;AAChB;;AAEA;IACI,UAAU;IACV,UAAU;IACV,qBAAqB;AACzB;;AAEA;IACI,oBAAoB;IACpB,iBAAiB;IACjB,YAAY;IACZ,WAAW;IACX,uBAAuB;AAC3B;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,gBAAgB;IAChB,YAAY;IACZ,sBAAsB;IACtB,eAAe;IACf,QAAQ;IACR,2BAA2B;IAC3B,8BAA8B;IAC9B,eAAe;IACf,qBAAqB;IACrB,gBAAgB;IAChB,mCAAmC;AACvC;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,UAAU;IACV,kBAAkB;IAClB,YAAY;IACZ,QAAQ;IACR,WAAW;IACX,eAAe;AACnB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;AACtB;;AAEA;;IAEI,WAAW;IACX,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,uBAAuB;AAC3B;;AAEA;;IAEI,WAAW;IACX,mCAAmC;AACvC;;AAEA;IACI,wBAAwB;AAC5B;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,YAAY;AAChB;;AAEA;;IAEI,gBAAgB;IAChB,cAAc;AAClB;;AAEA;IACI,iBAAiB;IACjB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;AACtB;;AAEA,iBAAiB;;AAEjB;IACI,sBAAsB;IACtB,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,2BAA2B;AAC/B;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,cAAc;IACd,aAAa;IACb,YAAY;AAChB;;AAEA;IACI,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;IAChB,gBAAgB;AACpB;;AAEA;IACI,gBAAgB;IAChB,UAAU;IACV,SAAS;AACb;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,qBAAqB;IACrB,WAAW;IACX,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;;EAEE,SAAS;EACT,YAAY;EACZ,sBAAsB;EACtB,sBAAsB;AACxB;;AAEA;;EAEE,kBAAkB;AACpB;;AAEA;IACI,sBAAsB;IACtB,iBAAiB;IACjB,kBAAkB;AACtB;;;AAGA;EACE,mBAAmB;EACnB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,iBAAiB;AACnB;;AAEA;IACI,iBAAiB;IACjB,yBAAyB;IACzB,yBAAyB;IACzB,WAAW;IACX,kBAAkB;AACtB;;AAEA;IACI,sBAAsB;IACtB,cAAc;AAClB;;AAEA,gBAAgB;AAChB;IACI;QACI,sBAAsB;IAC1B;;IAEA;QACI,sBAAsB;IAC1B;;IAEA;QACI,mBAAmB;IACvB;AACJ","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Akshar&display=swap');\n/* font-family: 'Akshar', sans-serif; */\n@import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');\n/* font-family: 'Courgette', cursive; */\n\n* {\n    font-family: 'Akshar', sans-serif;\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\n\n/* Navbar, container, and footer */\n#container {\n    height: 100vh;\n    display: flex;\n    flex: auto;\n    flex-direction: column;\n    justify-content: space-between;\n    align-content: center;\n    background-image: url(../src/img/gabriella-clare-marino-F6AkaAzN4lk-unsplash.jpg);\n    background-repeat: no-repeat;\n    background-attachment: fixed;\n    background-size: cover;\n}\n\n#navbar {\n    flex-grow: 0;\n    overflow: hidden;\n    width: 100vw;\n    padding: 20px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background-color: rgba(0, 0, 0, .5);\n}\n\n#navbar button {\n    background: none;\n    border: none;\n    color: #FFF;\n    font-size: 1.3rem;\n    margin: 0 15px;\n}\n\n#navbar button:hover {\n    text-decoration: underline;\n}\n\n.footer {\n    flex-grow: 0;\n    display: flex;\n    justify-content: center;\n    align-content: center;\n    margin: 15px;\n    color: #FFF;\n}\n\n#page-content-container {\n    flex: 1;\n    overflow-y: auto;\n}\n\n/* Main page */\n.words {\n    color: #FFF;\n    text-align: center;\n    padding: 10px;\n    display: flex;\n    flex-direction: column;\n    align-content: center;\n    justify-content: center;\n}\n\n.main-container .name {\n    font-size: 4rem;\n    font-family: 'Courgette', cursive;\n}\n\n.main-container .name-text {\n    font-size: 2rem;\n    font-family: 'Akshar', sans-serif;\n}\n\n\n/* Menu Page */\n\n.menu-content {\n    width: 100%;\n    background-color: #FFF;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-start;\n    align-items: center;\n}\n\n.menu-header {\n    margin: 20px;\n}\n\n.menu-selector {\n    margin-bottom: 40px;\n    display: flex;\n    justify-content: center;\n\n}\n\n.menu-selector button {\n    background: none;\n    border: none;\n    color: black;\n    font-size: 1.2rem;\n    margin: 0 15px;\n}\n\n.menu-selector button:hover {\n    transform: scale(.95);\n    transition: 300ms;\n\n}\n\n.menu-display {\n    max-width: 450px;\n    text-align: center;\n}\n\n/* menu title*/\n\n.menu-title {\n    margin: 20px 0;\n    font-size: 1.8rem;\n}\n\n.menu-title-p {\n    margin-top: -10px;\n    margin-bottom: 20px;\n    font-size: 1rem;\n}\n\n.menu-item{\n    margin-bottom: 15px;\n}\n\n.menu-item h2{\n    font-size: 1.5rem;\n}\n\n.menu-item p {\n    font-size: 1rem\n}\n\n.menu-item-top-space {\n    margin-top: 40px;\n}\n\n/* About page */\n\n\n.about-content {\n    display: flex;\n    flex-direction: column;\n    align-content: center;\n    align-items: center;\n    justify-content: flex-start;\n    background-color: #FFF;\n    \n}\n\n.about-header {\n    text-align: center;\n    margin: 20px 0;\n}\n\n.carousel {\n    margin: 20px 0;\n    height: 400px;\n    width: 400px;\n    margin-left: 5px;\n    position: relative;\n}\n\n.slide {\n    margin-top: 20px;\n    position: absolute;\n    list-style: none;\n    opacity: 0;\n    transition: 300ms opacity ease-in-out;\n    transition-delay: 300ms;\n    height: 400px;\n    width: 400px;\n}\n\n.slide.active {\n    opacity: 1;\n    z-index: 1;\n    transition-delay: 0ms;\n}\n\n.slide img {\n    /* display: block; */\n    object-fit: cover;\n    height: 100%;\n    width: 100%;\n    object-position: center;\n}\n\n.carousel-button {\n    position: absolute;\n    z-index: 2;\n    background: none;\n    border: none;\n    vertical-align: center;\n    font-size: 2rem;\n    top: 97%;\n    transform: translateY(-50%);\n    color: rgba(255, 255, 255, .8);\n    cursor: pointer;\n    border-radius: .25rem;\n    padding: 0 .5rem;\n    background-color: rgba(0, 0, 0, .4);\n}\n\n.nav-div {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 2;\n    position: absolute;\n    width: 250px;\n    top: 97%;\n    right: 75px;\n    cursor: pointer;\n}\n\n.img-nav-button {\n    width: 1rem;\n    height: 1rem;\n    position: relative;\n}\n\n.img-nav-button::before,\n.img-nav-button::after {\n    content: '';\n    position: absolute;\n    border-radius: 50%;\n}\n\n.img-nav-button::before {\n    width: .5rem;\n    height: .5rem;\n    border: #fff 2px solid;\n}\n\n.nav-div > .active::after {\n    width: .7rem;\n    height: .7rem;\n    background-color: white;\n}\n\n.carousel-button:hover,\n.carousel-button:focus {\n    color: #fff;\n    background-color: rgba(0, 0, 0, .2);\n}\n\n.carousel-button:focus {\n    outline: 1px solid black;\n}\n\n.carousel-button.prev {\n    left: .2rem;\n}\n\n.carousel-button.next {\n    right: .2rem;\n}\n\n.chef-info,\n.restaurant-info {\n    max-width: 400px;\n    margin: 20px 0;\n}\n\n.restaurant-info h2 {\n    font-size: 1.8rem;\n    text-align: center;\n    margin-bottom: 5px;\n}\n\n.about-content img {\n    max-width: 400px; \n    margin-bottom: 5px;\n}\n\n.chef-text {\n    text-align: center;\n}\n\n/* contact page */\n\n.contact-content {\n    background-color: #FFF;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: flex-start;\n}\n\n.contact-header {\n    margin-top: 20px;\n    text-align: center;\n}\n\n#map {\n    margin: 20px 0;\n    height: 400px;\n    width: 400px;\n}\n\nform h2 {\n    text-align: center;\n    margin-bottom: 15px;;\n}\n\n.contact-content form {\n    margin-top: 40px;\n    max-width: 500px;\n}\n\n.contact-content ul {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n}\n\nform li + li {\n    margin-top: 1em;\n}\n\n.text-input label {\n    display: inline-block;\n    width: 90px;\n    text-align: right;\n    margin-right: 1rem;\n}\n\ntext input,\nform textarea {\n  font: 1em;\n  width: 300px;\n  box-sizing: border-box;\n  border: 1px solid #999;\n}\n\nform input:focus,\nform textarea:focus {\n  border-color: blue;\n}\n\n[type=\"checkbox\"] {\n    vertical-align: middle;\n    margin-left: 5rem;\n    margin-right: 1rem;\n}\n\n\ntextarea {\n  vertical-align: top;\n  height: 5em;\n  resize: none;\n}\n\n.form-button {\n  margin-left: 5rem;\n}\n\nform button {\n    padding: 5px 10px;\n    background-color: #0b7df0;\n    border: 1px solid #0b7df0;\n    color: #FFF;\n    border-radius: 5px;\n}\n\nform button:hover {\n    background-color: #FFF;\n    color: #0b7df0;\n}\n\n/* Media query */\n@media (max-width: 500px) {\n    #navbar {\n        flex-direction: column;\n    }\n\n    .menu-selector {\n        flex-direction: column;\n    }\n\n    .menu-selector button {\n        margin-bottom: 10px;;\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/main.css":
/*!**********************!*\
  !*** ./src/main.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/about-page.js":
/*!***************************!*\
  !*** ./src/about-page.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAbout": () => (/* binding */ createAbout)
/* harmony export */ });
/* harmony import */ var _main_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-page */ "./src/main-page.js");
/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @googlemaps/js-api-loader */ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js");
/* harmony import */ var _img_dining_area_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/dining-area.jpg */ "./src/img/dining-area.jpg");
/* harmony import */ var _img_abdalla_m_uTaSlu2Jfsg_unsplash_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/abdalla-m-uTaSlu2Jfsg-unsplash.jpg */ "./src/img/abdalla-m-uTaSlu2Jfsg-unsplash.jpg");
/* harmony import */ var _img_chicken_2308650312_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img/chicken-2308650312.jpg */ "./src/img/chicken-2308650312.jpg");
/* harmony import */ var _img_dushanbe_serena_hotel_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./img/dushanbe-serena-hotel.jpg */ "./src/img/dushanbe-serena-hotel.jpg");
/* harmony import */ var _img_main_qimg_ad38fef62b1b7156b19aeee7e96571d7_lq_jpeg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./img/main-qimg-ad38fef62b1b7156b19aeee7e96571d7-lq.jpeg */ "./src/img/main-qimg-ad38fef62b1b7156b19aeee7e96571d7-lq.jpeg");
/* harmony import */ var _img_worst_pasta_ive_ever_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./img/worst-pasta-ive-ever.jpg */ "./src/img/worst-pasta-ive-ever.jpg");
/* harmony import */ var _img_same_bad_sauce_smothered_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./img/same-bad-sauce-smothered.jpg */ "./src/img/same-bad-sauce-smothered.jpg");










function createAbout() {
    const contentDiv = document.getElementById('content');
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.classList.add('about-container');
    contentDiv.appendChild(container);
    (0,_main_page__WEBPACK_IMPORTED_MODULE_0__.createNavbar)();
    const aboutContent = document.createElement('div');
    aboutContent.classList.add('about-content');
    aboutContent.setAttribute('id', 'page-content-container')
    container.appendChild(aboutContent);
    const aboutHeader = document.createElement('div');
    aboutHeader.classList.add('about-header');
    aboutContent.appendChild(aboutHeader);
    const aboutHeaderH1 = document.createElement('h1');
    aboutHeaderH1.innerText = 'Ristorante Ingozzarsi on the Canal';
    aboutHeader.appendChild(aboutHeaderH1);
    const aboutHeaderH3 = document.createElement('h3');
    aboutHeaderH3.innerText = '26 Passaic St, Trenton, NJ 08618';
    aboutHeader.appendChild(aboutHeaderH3);
    const imgCarousel = document.createElement('div');
    imgCarousel.setAttribute('id', 'carousel');
    imgCarousel.classList.add('carousel');
    imgCarousel.setAttribute('aria-label', 'Photos of our wonderful grub')
    aboutHeader.appendChild(imgCarousel);
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('carousel-button');
    prevBtn.classList.add('prev');
    prevBtn.innerText = '⇽';
    imgCarousel.appendChild(prevBtn);
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('carousel-button');
    nextBtn.classList.add('next');
    nextBtn.innerText = '⇾';
    imgCarousel.appendChild(nextBtn);
    const navDiv = document.createElement('div')
    navDiv.classList.add('nav-div')
    imgCarousel.appendChild(navDiv)
    const navRadio1 = document.createElement('div')
    navRadio1.classList.add('img-nav-button')
    navDiv.appendChild(navRadio1)
    const navRadio2 = document.createElement('div')
    navRadio2.classList.add('img-nav-button')
    navDiv.appendChild(navRadio2)
    const navRadio3 = document.createElement('div')
    navRadio3.classList.add('img-nav-button')
    navDiv.appendChild(navRadio3)
    const navRadio4 = document.createElement('div')
    navRadio4.classList.add('img-nav-button')
    navDiv.appendChild(navRadio4)
    const navRadio5 = document.createElement('div')
    navRadio5.classList.add('img-nav-button')
    navRadio5.classList.add('active')
    navDiv.appendChild(navRadio5)

    const slidesList = document.createElement('ul');
    slidesList.classList.add('slides');
    imgCarousel.appendChild(slidesList);
    
    const slide1 = document.createElement('li');
    slide1.classList.add('slide');
    slidesList.appendChild(slide1);
    const slide1Img = document.createElement('img');
    slide1Img.classList.add('slide-img')
    slide1Img.setAttribute('src', _img_chicken_2308650312_jpg__WEBPACK_IMPORTED_MODULE_4__);
    slide1Img.setAttribute('alt', 'Photo of our beautiful mozarella stick parm.');
    slide1.appendChild(slide1Img);

    const slide2 = document.createElement('li');
    slide2.classList.add('slide');
    slidesList.appendChild(slide2);
    const slide2Img = document.createElement('img');
    slide2Img.classList.add('slide-img')
    slide2Img.setAttribute('src', _img_dushanbe_serena_hotel_jpg__WEBPACK_IMPORTED_MODULE_5__);
    slide2Img.setAttribute('alt', 'Photo of our delectable calamari.');
    slide2.appendChild(slide2Img);

    const slide3 = document.createElement('li');
    slide3.classList.add('slide');
    slidesList.appendChild(slide3);
    const slide3Img = document.createElement('img');
    slide3Img.classList.add('slide-img')
    slide3Img.setAttribute('src', _img_main_qimg_ad38fef62b1b7156b19aeee7e96571d7_lq_jpeg__WEBPACK_IMPORTED_MODULE_6__);
    slide3Img.setAttribute('alt', 'Photo of our unrivaled pizza.');
    slide3.appendChild(slide3Img);

    const slide4 = document.createElement('li');
    slide4.classList.add('slide');
    slidesList.appendChild(slide4);
    const slide4Img = document.createElement('img');
    slide4Img.classList.add('slide-img')
    slide4Img.setAttribute('src', _img_worst_pasta_ive_ever_jpg__WEBPACK_IMPORTED_MODULE_7__);
    slide4Img.setAttribute('alt', 'Photo of our wonderful alfredo pasta.');
    slide4.appendChild(slide4Img);

    const slide5 = document.createElement('li');
    slide5.classList.add('slide');
    slide5.classList.add('active');
    slidesList.appendChild(slide5);
    const slide5Img = document.createElement('img');
    slide5Img.classList.add('slide-img')
    slide5Img.setAttribute('src', _img_same_bad_sauce_smothered_jpg__WEBPACK_IMPORTED_MODULE_8__);
    slide5Img.setAttribute('alt', 'Photo of our scrumptious lasagna.');
    slide5.appendChild(slide5Img);

    carouselBtnEvent(prevBtn);
    carouselBtnEvent(nextBtn);


    const restaurantInfo = document.createElement('div');
    restaurantInfo.classList.add('restaurant-info');
    aboutContent.appendChild(restaurantInfo);
    const restaurantPhoto = document.createElement('div');
    restaurantPhoto.classList.add('restaurant-photo');
    restaurantInfo.appendChild(restaurantPhoto);
    const restaurantInfoHeader = document.createElement('h2');
    restaurantInfoHeader.classList.add('rest-info-header');
    restaurantInfoHeader.innerText = 'Our Story';
    restaurantPhoto.appendChild(restaurantInfoHeader);
    const restaurantPhotoImg = document.createElement('img');
    // restaurantPhotoImg.setAttribute('src', '../src/img/dining-area.jpg');
    restaurantPhotoImg.src = _img_dining_area_jpg__WEBPACK_IMPORTED_MODULE_2__;
    restaurantPhotoImg.setAttribute('alt', 'Beautiful photo of the interior of Ristorante Ingozzarsi');
    restaurantPhoto.appendChild(restaurantPhotoImg);
    const restaurantText = document.createElement('div');
    restaurantText.classList.add('restaurant-text');
    restaurantInfo.appendChild(restaurantText);
    const restaurantTextPara = document.createElement('p');
    restaurantTextPara.innerText = 'Ristorante Ingozzarsi first opened its doors in 1999 after principal owner and CEO Mike Hagerty earned a windfall from investments in pets.com. Ristorante Ingozzarsi is proud to have served the Trenton community for more than 20 years and looks forward to making lasting memories for each and every one of our guests.'
    restaurantText.appendChild(restaurantTextPara);
    const restaurantTextParaTwo = document.createElement('p');
    restaurantTextParaTwo.innerText = 'Smoke free environment since 2015.'
    restaurantText.appendChild(restaurantTextParaTwo);
    const chefInfo = document.createElement('div');
    chefInfo.classList.add('chef-info');
    aboutContent.appendChild(chefInfo);
    const chefPhoto = document.createElement('div');
    chefPhoto.classList.add('chef-photo');
    chefInfo.appendChild(chefPhoto);
    const chefPhotoImg = document.createElement('img');
    chefPhotoImg.src = _img_abdalla_m_uTaSlu2Jfsg_unsplash_jpg__WEBPACK_IMPORTED_MODULE_3__;
    // chefPhotoImg.setAttribute('src', '../src/img/abdalla-m-uTaSlu2Jfsg-unsplash.jpg');
    chefPhotoImg.setAttribute('alt', 'Photo of executive chef Randal \'Big Tony\' Kowolski')
    chefPhoto.appendChild(chefPhotoImg);
    const chefText = document.createElement('div');
    chefText.classList.add('chef-text');
    chefInfo.appendChild(chefText);
    const chefTextH2 = document.createElement('h2');
    chefTextH2.innerText = 'Chef Randal "Big Tony" Kowolski';
    chefText.appendChild(chefTextH2);
    const chefTextP = document.createElement('p');
    chefTextP.innerText = 'Executive chef Randal A. Kowolski has studied under the master Italian chefs of the greater Trenton area for more than 20 years. His life journey has allowed him to explore the depths of Italian cuisine and emboldened him to experiment with the timeless culinary history. As Randal always says, \"When your here, you\'re a member of my family\"'
    chefText.appendChild(chefTextP);
    (0,_main_page__WEBPACK_IMPORTED_MODULE_0__.createFooter)();
    
    advanceSlider();
}


function carouselBtnEvent(button) {
    button.addEventListener('click', () => {
        const offset = button.classList.contains('next') ? 1 : -1
        advanceSlider(offset);
    })
}

let timeoutId

function advanceSlider(offset = 1) {
    const slides = document.querySelector('.slides')
    const activeSlide = slides.querySelector('.active')
    const navButtonDiv = document.querySelector('.nav-div')
    const activeNavBtn = navButtonDiv.querySelector('.active')
    let newSlideIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newSlideIndex < 0) newSlideIndex = slides.children.length - 1
    if (newSlideIndex >= slides.children.length) newSlideIndex = 0

    slides.children[newSlideIndex].classList.add('active');
    activeSlide.classList.remove('active')

    navButtonDiv.children[newSlideIndex].classList.add('active')
    activeNavBtn.classList.remove('active')

    clearTimeout(timeoutId)
    timeoutId = setTimeout(advanceSlider, 5000)
}

/***/ }),

/***/ "./src/contact-page.js":
/*!*****************************!*\
  !*** ./src/contact-page.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createContact": () => (/* binding */ createContact)
/* harmony export */ });
/* harmony import */ var _main_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-page */ "./src/main-page.js");
/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @googlemaps/js-api-loader */ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js");



function createContact() {
    const contentDiv = document.getElementById('content');
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.classList.add('contact-container');
    contentDiv.appendChild(container);
    (0,_main_page__WEBPACK_IMPORTED_MODULE_0__.createNavbar)();
    const contactContent = document.createElement('div');
    contactContent.classList.add('contact-content');
    contactContent.setAttribute('id', 'page-content-container');
    container.appendChild(contactContent);
    const contactHeader = document.createElement('div');
    contactHeader.classList.add('contact-header');
    contactContent.appendChild(contactHeader);
    const contactHeaderH1 = document.createElement('h1');
    contactHeaderH1.innerText = 'Ristorante Ingozzarsi';
    contactHeader.appendChild(contactHeaderH1)
    const contactHeaderH3One = document.createElement('h3');
    contactHeaderH3One.innerText = '26 Passaic St, Trenton, NJ 08618';
    contactHeader.appendChild(contactHeaderH3One);
    const contactHeaderH3Two = document.createElement('h3');
    contactHeaderH3Two.innerText = '609-571-3230';
    contactHeader.appendChild(contactHeaderH3Two);
    const contactHeaderH3Three = document.createElement('h3');
    contactHeaderH3Three.innerText = 'Open Tues. - Sun. 11am to 10pm';
    contactHeader.appendChild(contactHeaderH3Three);

    const mapDiv = document.createElement('div');
    mapDiv.setAttribute('id', 'map');
    contactHeader.appendChild(mapDiv);
    const loader = new _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_1__.Loader({
        apiKey: "/////",
        version: "weekly",
        });
        
        let restPos = { lat: 40.2235464, lng: -74.7702636 };
        loader.load().then(() => {
        let map = new google.maps.Map(document.getElementById("map"), {
            center: restPos,
            zoom: 18,
        })
        let marker = new google.maps.Marker({
            position: restPos,
            map: map
        })
    });

    const form = document.createElement('form');
    form.setAttribute('action', '#');
    form.setAttribute('method', 'post');
    contactContent.appendChild(form);
    const formH2 = document.createElement('h2');
    formH2.innerText = 'Contact Us:';
    form.appendChild(formH2);
    const formUl = document.createElement('ul');
    form.appendChild(formUl);

    const li1 = document.createElement('li');
    li1.classList.add('text-input');
    formUl.appendChild(li1);
    const li1Label = document.createElement('label');
    li1Label.setAttribute('for', 'name');
    li1Label.innerText = 'Name:';
    li1.appendChild(li1Label);
    const li1Input = document.createElement('input');
    li1Input.setAttribute('type', 'text');
    li1Input.setAttribute('id', 'name');
    li1Input.setAttribute('name', 'user_name');
    li1Input.required = true;
    li1.appendChild(li1Input);

    const li2 = document.createElement('li');
    li2.classList.add('text-input');
    formUl.appendChild(li2);
    const li2Label = document.createElement('label');
    li2Label.setAttribute('for', 'mail');
    li2Label.innerText = 'Email:';
    li2.appendChild(li2Label);
    const li2Input = document.createElement('input');
    li2Input.setAttribute('type', 'email');
    li2Input.setAttribute('id', 'mail');
    li2Input.setAttribute('name', 'user_email');
    li2Input.required = true;
    li2.appendChild(li2Input);

    const li3 = document.createElement('li');
    li3.classList.add('text-input');
    formUl.appendChild(li3);
    const li3Label = document.createElement('label');
    li3Label.setAttribute('for', 'msg');
    li3Label.innerText = 'Message:';
    li3.appendChild(li3Label);
    const li3Input = document.createElement('textarea');
    li3Input.setAttribute('cols', '30');
    li3Input.setAttribute('rows', '10');
    li3Input.setAttribute('id', 'msg');
    li3Input.setAttribute('name', 'user_message');
    li3Input.required = true;
    li3.appendChild(li3Input);

    const li4 = document.createElement('li');
    formUl.appendChild(li4);
    const li4Label = document.createElement('label');
    li4Label.setAttribute('for', 'privacy');
    li4Label.classList.add('checkbox-label');
    li4.appendChild(li4Label);
    const li4input = document.createElement('input');
    li4input.setAttribute('type', 'checkbox');
    li4input.setAttribute('id', 'privacy');
    li4input.setAttribute('name', 'privacy');
    li4input.setAttribute('value', 'agree');
    li4input.classList.add('checkbox-input');
    li4input.required = true;
    li4Label.appendChild(li4input);
    const li4LabelSpan = document.createElement('span');
    li4LabelSpan.innerText = 'Agree to our privacy policy and use/sale of personal data.';
    li4Label.appendChild(li4LabelSpan);

    const li5 = document.createElement('li');
    formUl.appendChild(li5);
    const li5Label = document.createElement('label');
    li5Label.setAttribute('for', 'maillist');
    li5Label.classList.add('checkbox-label');
    li5.appendChild(li5Label);
    const li5input = document.createElement('input');
    li5input.setAttribute('type', 'checkbox');
    li5input.setAttribute('id', 'maillist');
    li5input.setAttribute('name', 'maillist');
    li5input.setAttribute('value', 'agree');
    li5input.classList.add('checkbox-input');
    li5Label.appendChild(li5input);
    const li5LabelSpan = document.createElement('span');
    li5LabelSpan.innerText = 'Recieve emails about new dishes and specials.';
    li5Label.appendChild(li5LabelSpan);

    const li6 = document.createElement('li');
    formUl.appendChild(li6);
    const li6Label = document.createElement('label');
    li6Label.setAttribute('for', 'rants');
    li6Label.classList.add('checkbox-label');
    li6.appendChild(li6Label);
    const li6input = document.createElement('input');
    li6input.setAttribute('type', 'checkbox');
    li6input.setAttribute('id', 'rants');
    li6input.setAttribute('name', 'rants');
    li6input.setAttribute('value', 'agree');
    li6input.classList.add('checkbox-input');
    li6input.checked = true;
    li6Label.appendChild(li6input);
    const li6LabelSpan = document.createElement('span');
    li6LabelSpan.innerText = 'Recieve "Randal\'s Rants" emails from our executive chef.';
    li6Label.appendChild(li6LabelSpan);

    const li7 = document.createElement('li');
    li7.classList.add('form-button');
    formUl.appendChild(li7);
    const li7button = document.createElement('button');
    li7button.setAttribute('type', 'submit');
    li7button.innerText = 'Submit';
    li7.appendChild(li7button);


    (0,_main_page__WEBPACK_IMPORTED_MODULE_0__.createFooter)();
}

/***/ }),

/***/ "./src/main-page.js":
/*!**************************!*\
  !*** ./src/main-page.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFooter": () => (/* binding */ createFooter),
/* harmony export */   "createMain": () => (/* binding */ createMain),
/* harmony export */   "createNavbar": () => (/* binding */ createNavbar)
/* harmony export */ });
function createMain() {
    const contentDiv = document.getElementById('content');
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.classList.add('main-container');
    contentDiv.appendChild(container);
    createNavbar();
    const words = document.createElement('div');
    words.classList.add('words');
    words.setAttribute('id', 'page-content-container')
    container.appendChild(words);
    const name = document.createElement('div');
    name.classList.add('name');
    name.innerText = 'Ristorante Ingozzarsi'
    words.appendChild(name);
    const nameText = document.createElement('div');
    nameText.classList.add('name-text');
    nameText.innerText = 'New Jersey\'s finest Italian eatery'
    words.appendChild(nameText);
    createFooter();
}

function createNavbar() {
    const container = document.getElementById('container');
    const navBar = document.createElement('div');
    navBar.setAttribute('id', 'navbar');
    container.appendChild(navBar);
    const navButtons = document.createElement('div');
    navButtons.classList.add('nav-buttons');
    navBar.appendChild(navButtons);
    const homeBtn = document.createElement('button');
    homeBtn.setAttribute('id', 'home-nav-button');
    homeBtn.innerText = 'Home';
    navButtons.appendChild(homeBtn);
    const menuBtn = document.createElement('button');
    menuBtn.setAttribute('id', 'menu-nav-button');
    menuBtn.innerText = 'Menu'
    navButtons.appendChild(menuBtn);
    const aboutBtn = document.createElement('button');
    aboutBtn.innerText = 'About'
    aboutBtn.setAttribute('id', 'about-nav-button');
    navButtons.appendChild(aboutBtn);
    const contactBtn = document.createElement('button');
    contactBtn.setAttribute('id', 'contact-nav-button');
    contactBtn.innerText = 'Contact'
    navButtons.appendChild(contactBtn);
}

function createFooter() {
    const container = document.getElementById('container');
    const footer = document.createElement('div');
    footer.classList.add('footer');
    container.appendChild(footer);
    const footerText = document.createElement('p');
    footerText.innerText = 'Ristorante Ingozzarsi LLC © 2022 | All Rights Reserved';
    footer.appendChild(footerText);
}



/***/ }),

/***/ "./src/menu-page.js":
/*!**************************!*\
  !*** ./src/menu-page.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addAntipasto": () => (/* binding */ addAntipasto),
/* harmony export */   "addDessert": () => (/* binding */ addDessert),
/* harmony export */   "addMeatSeafood": () => (/* binding */ addMeatSeafood),
/* harmony export */   "addPizzaPasta": () => (/* binding */ addPizzaPasta),
/* harmony export */   "addSoupSalad": () => (/* binding */ addSoupSalad),
/* harmony export */   "createMenu": () => (/* binding */ createMenu)
/* harmony export */ });
/* harmony import */ var _main_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-page */ "./src/main-page.js");


function createMenu() {
    const contentDiv = document.getElementById('content');
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.classList.add('menu-container');
    contentDiv.appendChild(container);
    (0,_main_page__WEBPACK_IMPORTED_MODULE_0__.createNavbar)();
    const menuContent = document.createElement('div');
    menuContent.classList.add('menu-content');
    menuContent.setAttribute('id', 'page-content-container');
    container.appendChild(menuContent);
    const menuHeader = document.createElement('div');
    menuHeader.classList.add('menu-header');
    menuContent.appendChild(menuHeader);
    const menuHeaderH1 = document.createElement('h1');
    menuHeaderH1.innerText = 'Menu';
    menuHeader.appendChild(menuHeaderH1);
    const menuSelector = document.createElement('div');
    menuSelector.classList.add('menu-selector');
    menuContent.appendChild(menuSelector);
    const antipasto = document.createElement('button');
    antipasto.setAttribute('id', 'antipasto');
    antipasto.innerText = 'Antipasto';
    menuSelector.appendChild(antipasto);
    const soupSalad = document.createElement('button');
    soupSalad.setAttribute('id', 'soup-salad');
    soupSalad.innerText = 'Soup & Salad'
    menuSelector.appendChild(soupSalad);
    const pizzaPasta = document.createElement('button');
    pizzaPasta.setAttribute('id', 'pizza-pasta');
    pizzaPasta.innerText = 'Pizza & Pasta';
    menuSelector.appendChild(pizzaPasta);
    const meatSeafood = document.createElement('button');
    meatSeafood.setAttribute('id', 'meat-seafood');
    meatSeafood.innerText = 'Meat & Seafood';
    menuSelector.appendChild(meatSeafood);
    const deserts = document.createElement('button');
    deserts.setAttribute('id', 'desserts');
    deserts.innerText = 'Desserts';
    menuSelector.appendChild(deserts);
    const menuDisplayContainer = document.createElement('div');
    menuDisplayContainer.setAttribute('id', 'menu-display-container');
    menuContent.appendChild(menuDisplayContainer)
    addAntipasto();
    (0,_main_page__WEBPACK_IMPORTED_MODULE_0__.createFooter)();
}

function addAntipasto() {
    const menuDisplayContainer = document.getElementById('menu-display-container');
    const menuDisplay = document.createElement('div');
    menuDisplay.classList.add('menu-display');
    menuDisplay.setAttribute('id', 'menu-display');
    menuDisplayContainer.appendChild(menuDisplay);

    const antipastoTitle = document.createElement('h2');
    antipastoTitle.classList.add('menu-title');
    antipastoTitle.innerText = 'Antipasto';
    menuDisplay.appendChild(antipastoTitle);

    const menuItem1 = document.createElement('div');
    menuItem1.classList.add('menu-item');
    menuDisplay.appendChild(menuItem1);
    const menuItem1H2 = document.createElement('h2');
    menuItem1H2.innerText = 'Mac & Cheese Poppers de Napoli';
    menuItem1.appendChild(menuItem1H2);
    const menuItem1P1 = document.createElement('p');
    menuItem1P1.innerText = 'Classic american mac and cheese prepared in an authentic fritto preparation from the city of Naples';
    menuItem1.appendChild(menuItem1P1);
    const menuItem1P2 = document.createElement('p');
    menuItem1P2.innerText = '8';
    menuItem1.appendChild(menuItem1P2);
    
    const menuItem2 = document.createElement('div');
    menuItem2.classList.add('menu-item');
    menuDisplay.appendChild(menuItem2);
    const menuItem2H2 = document.createElement('h2');
    menuItem2H2.innerText = 'Prosciutto by the Pound';
    menuItem2.appendChild(menuItem2H2);
    const menuItem2P1 = document.createElement('p');
    menuItem2P1.innerText = 'A heaping plate of prosciutto for you and your party to dine on. Served with crostini.';
    menuItem2.appendChild(menuItem2P1);
    const menuItem2P2 = document.createElement('p');
    menuItem2P2.innerText = 'market';
    menuItem2.appendChild(menuItem2P2);
    
    const menuItem3 = document.createElement('div');
    menuItem3.classList.add('menu-item');
    menuDisplay.appendChild(menuItem3);
    const menuItem3H2 = document.createElement('h2');
    menuItem3H2.innerText = 'Oysters Randal';
    menuItem3.appendChild(menuItem3H2);
    const menuItem3P1 = document.createElement('p');
    menuItem3P1.innerText = 'Our chef\'s take on the classic Oysters Rockerfeller. Voted Treton\'s best starter in 2017.';
    menuItem3.appendChild(menuItem3P1);
    const menuItem3P2 = document.createElement('p');
    menuItem3P2.innerText = '11';
    menuItem3.appendChild(menuItem3P2);
    
    const menuItem4 = document.createElement('div');
    menuItem4.classList.add('menu-item');
    menuDisplay.appendChild(menuItem4);
    const menuItem4H2 = document.createElement('h2');
    menuItem4H2.innerText = 'Bang Bang Calarmari';
    menuItem4.appendChild(menuItem4H2);
    const menuItem4P1 = document.createElement('p');
    menuItem4P1.innerText = 'Tender calamari rings dusted with parmesan and covered in a creamy and spicy sauce.';
    menuItem4.appendChild(menuItem4P1);
    const menuItem4P2 = document.createElement('p');
    menuItem4P2.innerText = '10';
    menuItem4.appendChild(menuItem4P2);
    
    const menuItem5 = document.createElement('div');
    menuItem5.classList.add('menu-item');
    menuDisplay.appendChild(menuItem5);
    const menuItem5H2 = document.createElement('h2');
    menuItem5H2.innerText = 'Formaggio Fondue Fountain';
    menuItem5.appendChild(menuItem5H2);
    const menuItem5P1 = document.createElement('p');
    menuItem5P1.innerText = 'Fondue fountain loaded with jack cheese and served with all requisite accoutrements.';
    menuItem5.appendChild(menuItem5P1);
    const menuItem5P2 = document.createElement('p');
    menuItem5P2.innerText = '2 per minute';
    menuItem5.appendChild(menuItem5P2);


}


function addSoupSalad() {
    const menuDisplayContainer = document.getElementById('menu-display-container');
    const menuDisplay = document.createElement('div');
    menuDisplay.classList.add('menu-display');
    menuDisplay.setAttribute('id', 'menu-display');
    menuDisplayContainer.appendChild(menuDisplay);

    const menuTitle = document.createElement('div');
    menuDisplay.appendChild(menuTitle);
    const menuTitleH2 = document.createElement('h2');
    menuTitleH2.classList.add('menu-title');
    menuTitleH2.innerText = 'Soup & Salad';
    menuTitle.appendChild(menuTitleH2);
    const menuTitleP1 = document.createElement('p');
    menuTitleP1.classList.add('menu-title-p')
    menuTitleP1.innerText = 'Dressings: Creamy Italian, Ranch, Thousand Island, Honey Mustard';
    menuTitle.appendChild(menuTitleP1);

    const menuItem1 = document.createElement('div');
    menuItem1.classList.add('menu-item');
    menuDisplay.appendChild(menuItem1);
    const menuItem1H2 = document.createElement('h2');
    menuItem1H2.innerText = 'House Salad';
    menuItem1.appendChild(menuItem1H2);
    const menuItem1P1 = document.createElement('p');
    menuItem1P1.innerText = 'Iceberg lettuce, grape tomatoes, cucumbers, carrots. Choice of dressing';
    menuItem1.appendChild(menuItem1P1);
    const menuItem1P2 = document.createElement('p');
    menuItem1P2.innerText = '7.5';
    menuItem1.appendChild(menuItem1P2);

    const menuItem2 = document.createElement('div');
    menuItem2.classList.add('menu-item');
    menuDisplay.appendChild(menuItem2);
    const menuItem2H2 = document.createElement('h2');
    menuItem2H2.innerText = 'Caesar Salad';
    menuItem2.appendChild(menuItem2H2);
    const menuItem2P1 = document.createElement('p');
    menuItem2P1.innerText = 'Classic caesar salad topped with a heaping glob of caesar dressing made fresh everyday.';
    menuItem2.appendChild(menuItem2P1);
    const menuItem2P2 = document.createElement('p');
    menuItem2P2.innerText = '8';
    menuItem2.appendChild(menuItem2P2);

    const menuItem3 = document.createElement('div');
    menuItem3.classList.add('menu-item');
    menuDisplay.appendChild(menuItem3);
    const menuItem3H2 = document.createElement('h2');
    menuItem3H2.innerText = 'Tuscan Formaggio Salad';
    menuItem3.appendChild(menuItem3H2);
    const menuItem3P1 = document.createElement('p');
    menuItem3P1.innerText = 'A selection cubbed cheeses tossed together with dressing of your choice.';
    menuItem3.appendChild(menuItem3P1);
    const menuItem3P2 = document.createElement('p');
    menuItem3P2.innerText = '10';
    menuItem3.appendChild(menuItem3P2);

    const menuItem4 = document.createElement('div');
    menuItem4.classList.add('menu-item');
    menuDisplay.appendChild(menuItem4);
    const menuItem4H2 = document.createElement('h2');
    menuItem4H2.innerText = 'Alfredo Soup Bread Bowl';
    menuItem4.appendChild(menuItem4H2);
    const menuItem4P1 = document.createElement('p');
    menuItem4P1.innerText = 'Bread bowl baked each morning by our chefs. Filled with a delectable alfredo-based soup.';
    menuItem4.appendChild(menuItem4P1);
    const menuItem4P2 = document.createElement('p');
    menuItem4P2.innerText = '11';
    menuItem4.appendChild(menuItem4P2);

    const menuItem5 = document.createElement('div');
    menuItem5.classList.add('menu-item');
    menuDisplay.appendChild(menuItem5);
    const menuItem5H2 = document.createElement('h2');
    menuItem5H2.innerText = 'Double Cream Lobster Bisque';
    menuItem5.appendChild(menuItem5H2);
    const menuItem5P1 = document.createElement('p');
    menuItem5P1.innerText = 'Creamy lobster bisque made from the world-famous Italian lobster variety langoustine.';
    menuItem5.appendChild(menuItem5P1);
    const menuItem5P2 = document.createElement('p');
    menuItem5P2.innerText = '10';
    menuItem5.appendChild(menuItem5P2);

    const menuItem6 = document.createElement('div');
    menuItem6.classList.add('menu-item');
    menuDisplay.appendChild(menuItem6);
    const menuItem6H2 = document.createElement('h2');
    menuItem6H2.innerText = 'Soup DuJour';
    menuItem6.appendChild(menuItem6H2);
    const menuItem6P1 = document.createElement('p');
    menuItem6P1.innerText = 'Hot or Cold \"Chef Randal\'s Whim\"';
    menuItem6.appendChild(menuItem6P1);
    const menuItem6P2 = document.createElement('p');
    menuItem6P2.innerText = 'market';
    menuItem6.appendChild(menuItem6P2);
}

function addPizzaPasta() {
    const menuDisplayContainer = document.getElementById('menu-display-container');
    const menuDisplay = document.createElement('div');
    menuDisplay.classList.add('menu-display');
    menuDisplay.setAttribute('id', 'menu-display');
    menuDisplayContainer.appendChild(menuDisplay);

    const pizzaTitle = document.createElement('h2');
    pizzaTitle.classList.add('menu-title');
    pizzaTitle.innerText = 'Pizza';
    menuDisplay.appendChild(pizzaTitle);

    const menuItem1 = document.createElement('div');
    menuItem1.classList.add('menu-item');
    menuDisplay.appendChild(menuItem1);
    const menuItem1H2 = document.createElement('h2');
    menuItem1H2.innerText = 'Sicilian Meat Lovers';
    menuItem1.appendChild(menuItem1H2);
    const menuItem1P1 = document.createElement('p');
    menuItem1P1.innerText = 'Thin crust pizza stacked high with a layer each of salami, pepperoni, ground beef, ground italian sausage, bacon, and sliced ham';
    menuItem1.appendChild(menuItem1P1);
    const menuItem1P2 = document.createElement('p');
    menuItem1P2.innerText = '21';
    menuItem1.appendChild(menuItem1P2);

    const menuItem2 = document.createElement('div');
    menuItem2.classList.add('menu-item');
    menuDisplay.appendChild(menuItem2);
    const menuItem2H2 = document.createElement('h2');
    menuItem2H2.innerText = 'The Fisherman\'s Wife';
    menuItem2.appendChild(menuItem2H2);
    const menuItem2P1 = document.createElement('p');
    menuItem2P1.innerText = 'Gorgonzola pizza topped with an entire octopus personally tenderized by our team of chefs.';
    menuItem2.appendChild(menuItem2P1);
    const menuItem2P2 = document.createElement('p');
    menuItem2P2.innerText = '19';
    menuItem2.appendChild(menuItem2P2);

    const menuItem3 = document.createElement('div');
    menuItem3.classList.add('menu-item');
    menuDisplay.appendChild(menuItem3);
    const menuItem3H2 = document.createElement('h2');
    menuItem3H2.innerText = 'Pizza alla Yorba Linda';
    menuItem3.appendChild(menuItem3H2);
    const menuItem3P1 = document.createElement('p');
    menuItem3P1.innerText = 'Pizza topped with cottage cheese and sliced pineapple.';
    menuItem3.appendChild(menuItem3P1);
    const menuItem3P2 = document.createElement('p');
    menuItem3P2.innerText = '17';
    menuItem3.appendChild(menuItem3P2);

    const menuItem4 = document.createElement('div');
    menuItem4.classList.add('menu-item');
    menuDisplay.appendChild(menuItem4);
    const menuItem4H2 = document.createElement('h2');
    menuItem4H2.innerText = 'Quattro Fromaggi Pizza';
    menuItem4.appendChild(menuItem4H2);
    const menuItem4P1 = document.createElement('p');
    menuItem4P1.innerText = 'Pizza topped with part-skim mozzarella, jack cheese, colby cheese, and Velveeta® cheese.';
    menuItem4.appendChild(menuItem4P1);
    const menuItem4P2 = document.createElement('p');
    menuItem4P2.innerText = '16';
    menuItem4.appendChild(menuItem4P2);

    const pastaTitle = document.createElement('h2');
    pastaTitle.classList.add('menu-title');
    pastaTitle.classList.add('menu-item-top-space')
    pastaTitle.innerText = 'Pasta';
    menuDisplay.appendChild(pastaTitle);

    const menuItem5 = document.createElement('div');
    menuItem5.classList.add('menu-item');
    menuDisplay.appendChild(menuItem5);
    const menuItem5H2 = document.createElement('h2');
    menuItem5H2.innerText = 'Spaghetti with New Jersey\'s Biggest Meatballs';
    menuItem5.appendChild(menuItem5H2);
    const menuItem5P1 = document.createElement('p');
    menuItem5P1.innerText = 'Spaghetti with 3 large meatballs topped with tomato sauce. Same as our classic dish, just with a name change that reflects order from NJ Division of EEO/AA.';
    menuItem5.appendChild(menuItem5P1);
    const menuItem5P2 = document.createElement('p');
    menuItem5P2.innerText = '18';
    menuItem5.appendChild(menuItem5P2);

    const menuItem6 = document.createElement('div');
    menuItem6.classList.add('menu-item');
    menuDisplay.appendChild(menuItem6);
    const menuItem6H2 = document.createElement('h2');
    menuItem6H2.innerText = 'Mozzarella Stick Parmigiana';
    menuItem6.appendChild(menuItem6H2);
    const menuItem6P1 = document.createElement('p');
    menuItem6P1.innerText = 'A bed of mozzarela sticks topped with mozzarella cheese and served over spaghetti with tomato sauce.';
    menuItem6.appendChild(menuItem6P1);
    const menuItem6P2 = document.createElement('p');
    menuItem6P2.innerText = '16';
    menuItem6.appendChild(menuItem6P2);

    const menuItem7 = document.createElement('div');
    menuItem7.classList.add('menu-item');
    menuDisplay.appendChild(menuItem7);
    const menuItem7H2 = document.createElement('h2');
    menuItem7H2.innerText = 'Barbecue Chicken Lasagna';
    menuItem7.appendChild(menuItem7H2);
    const menuItem7P1 = document.createElement('p');
    menuItem7P1.innerText = 'A portion of our reknowned seven-layer lasagna made with layers of juicy chicken and barbecue sauce.';
    menuItem7.appendChild(menuItem7P1);
    const menuItem7P2 = document.createElement('p');
    menuItem7P2.innerText = '19';
    menuItem7.appendChild(menuItem7P2);

    const menuItem8 = document.createElement('div');
    menuItem8.classList.add('menu-item');
    menuDisplay.appendChild(menuItem8);
    const menuItem8H2 = document.createElement('h2');
    menuItem8H2.innerText = 'Spaghetti Napolitan (ナポリタン)';
    menuItem8.appendChild(menuItem8H2);
    const menuItem8P1 = document.createElement('p');
    menuItem8P1.innerText = 'A sumptuous treat from the far east. Green peppers, smoked sausage, and onions in a tomato ketchup based sauce.';
    menuItem8.appendChild(menuItem8P1);
    const menuItem8P2 = document.createElement('p');
    menuItem8P2.innerText = '17';
    menuItem8.appendChild(menuItem8P2);
}


function addMeatSeafood() {
    const menuDisplayContainer = document.getElementById('menu-display-container');
    const menuDisplay = document.createElement('div');
    menuDisplay.classList.add('menu-display');
    menuDisplay.setAttribute('id', 'menu-display');
    menuDisplayContainer.appendChild(menuDisplay);

    const meatTitle = document.createElement('h2');
    meatTitle.classList.add('menu-title');
    meatTitle.innerText = 'Meat & Chicken Entrées';
    menuDisplay.appendChild(meatTitle);


    const menuItem1 = document.createElement('div');
    menuItem1.classList.add('menu-item');
    menuDisplay.appendChild(menuItem1);
    const menuItem1H2 = document.createElement('h2');
    menuItem1H2.innerText = 'Carbonara Steak';
    menuItem1.appendChild(menuItem1H2);
    const menuItem1P1 = document.createElement('p');
    menuItem1P1.innerText = 'Thick-cut New York Strip cooked to your desired doneness. Cubbed and tossed in an egg based carbonara sauce.';
    menuItem1.appendChild(menuItem1P1);
    const menuItem1P2 = document.createElement('p');
    menuItem1P2.innerText = '26';
    menuItem1.appendChild(menuItem1P2);

    const menuItem2 = document.createElement('div');
    menuItem2.classList.add('menu-item');
    menuDisplay.appendChild(menuItem2);
    const menuItem2H2 = document.createElement('h2');
    menuItem2H2.innerText = 'Italian Nachos';
    menuItem2.appendChild(menuItem2H2);
    const menuItem2P1 = document.createElement('p');
    menuItem2P1.innerText = 'A generous plate of steak nachos topped with alfredo suace.';
    menuItem2.appendChild(menuItem2P1);
    const menuItem2P2 = document.createElement('p');
    menuItem2P2.innerText = '23';
    menuItem2.appendChild(menuItem2P2);

    const menuItem3 = document.createElement('div');
    menuItem3.classList.add('menu-item');
    menuDisplay.appendChild(menuItem3);
    const menuItem3H2 = document.createElement('h2');
    menuItem3H2.innerText = 'Sanguinaccio on a Bun';
    menuItem3.appendChild(menuItem3H2);
    const menuItem3P1 = document.createElement('p');
    menuItem3P1.innerText = 'Two juicy saguinaccio suasages on fresh made hot dog buns.';
    menuItem3.appendChild(menuItem3P1);
    const menuItem3P2 = document.createElement('p');
    menuItem3P2.innerText = '22';
    menuItem3.appendChild(menuItem3P2);

    const menuItem4 = document.createElement('div');
    menuItem4.classList.add('menu-item');
    menuDisplay.appendChild(menuItem4);
    const menuItem4H2 = document.createElement('h2');
    menuItem4H2.innerText = 'Trippa alla Jersey';
    menuItem4.appendChild(menuItem4H2);
    const menuItem4P1 = document.createElement('p');
    menuItem4P1.innerText = 'Our chef\'s take on the classic trippa alla Romana. Tripe slathered in a New Jersey style Sunday gravy.';
    menuItem4.appendChild(menuItem4P1);
    const menuItem4P2 = document.createElement('p');
    menuItem4P2.innerText = '19';
    menuItem4.appendChild(menuItem4P2);

    const seafoodTitle = document.createElement('h2');
    seafoodTitle.classList.add('menu-title');
    seafoodTitle.classList.add('menu-item-top-space')
    seafoodTitle.innerText = 'Seafood';
    menuDisplay.appendChild(seafoodTitle);

    const menuItem5 = document.createElement('div');
    menuItem5.classList.add('menu-item');
    menuDisplay.appendChild(menuItem5);
    const menuItem5H2 = document.createElement('h2');
    menuItem5H2.innerText = 'Shrimp Fritto';
    menuItem5.appendChild(menuItem5H2);
    const menuItem5P1 = document.createElement('p');
    menuItem5P1.innerText = 'Fried shrimp covered in some of chef Randall\'s special sauce.';
    menuItem5.appendChild(menuItem5P1);
    const menuItem5P2 = document.createElement('p');
    menuItem5P2.innerText = '25';
    menuItem5.appendChild(menuItem5P2);

    const menuItem6 = document.createElement('div');
    menuItem6.classList.add('menu-item');
    menuDisplay.appendChild(menuItem6);
    const menuItem6H2 = document.createElement('h2');
    menuItem6H2.innerText = 'Losters Trenton';
    menuItem6.appendChild(menuItem6H2);
    const menuItem6P1 = document.createElement('p');
    menuItem6P1.innerText = 'Freshwater lobsters caught fresh in the very canal on which our restaurant sits. Steamed and served with a lemon butter sauce.';
    menuItem6.appendChild(menuItem6P1);
    const menuItem6P2 = document.createElement('p');
    menuItem6P2.innerText = '27';
    menuItem6.appendChild(menuItem6P2);

    const menuItem7 = document.createElement('div');
    menuItem7.classList.add('menu-item');
    menuDisplay.appendChild(menuItem7);
    const menuItem7H2 = document.createElement('h2');
    menuItem7H2.innerText = 'Sorpresa di Polpo';
    menuItem7.appendChild(menuItem7H2);
    const menuItem7P1 = document.createElement('p');
    menuItem7P1.innerText = 'An entire octopus boiled for hours until tender. Served in own juices. Please call ahead to ensure your order is out in a timely manner.';
    menuItem7.appendChild(menuItem7P1);
    const menuItem7P2 = document.createElement('p');
    menuItem7P2.innerText = '32';
    menuItem7.appendChild(menuItem7P2);
}


function addDessert() {
    const menuDisplayContainer = document.getElementById('menu-display-container');
    const menuDisplay = document.createElement('div');
    menuDisplay.classList.add('menu-display');
    menuDisplay.setAttribute('id', 'menu-display');
    menuDisplayContainer.appendChild(menuDisplay);

    const desertTitle = document.createElement('h2');
    desertTitle.classList.add('menu-title');
    desertTitle.innerText = 'Desserts';
    menuDisplay.appendChild(desertTitle);


    const menuItem1 = document.createElement('div');
    menuItem1.classList.add('menu-item');
    menuDisplay.appendChild(menuItem1);
    const menuItem1H2 = document.createElement('h2');
    menuItem1H2.innerText = 'Randal\'s Baked Alaska™';
    menuItem1.appendChild(menuItem1H2);
    const menuItem1P1 = document.createElement('p');
    menuItem1P1.innerText = 'Chef Randal\'s famed baked alaska. Known for its large size, this desert towers more than two feet high.';
    menuItem1.appendChild(menuItem1P1);
    const menuItem1P2 = document.createElement('p');
    menuItem1P2.innerText = '25';
    menuItem1.appendChild(menuItem1P2);

    const menuItem2 = document.createElement('div');
    menuItem2.classList.add('menu-item');
    menuDisplay.appendChild(menuItem2);
    const menuItem2H2 = document.createElement('h2');
    menuItem2H2.innerText = 'Salame di Cioccolato';
    menuItem2.appendChild(menuItem2H2);
    const menuItem2P1 = document.createElement('p');
    menuItem2P1.innerText = 'A few delectable slices of this famous Italian desert. Contains meat and/or meat products.';
    menuItem2.appendChild(menuItem2P1);
    const menuItem2P2 = document.createElement('p');
    menuItem2P2.innerText = '12';
    menuItem2.appendChild(menuItem2P2);

    const menuItem3 = document.createElement('div');
    menuItem3.classList.add('menu-item');
    menuDisplay.appendChild(menuItem3);
    const menuItem3H2 = document.createElement('h2');
    menuItem3H2.innerText = '4-inch Torrone';
    menuItem3.appendChild(menuItem3H2);
    const menuItem3P1 = document.createElement('p');
    menuItem3P1.innerText = 'A piece of torrone measuring 4 inches in depth.';
    menuItem3.appendChild(menuItem3P1);
    const menuItem3P2 = document.createElement('p');
    menuItem3P2.innerText = '13';
    menuItem3.appendChild(menuItem3P2);

    const menuItem4 = document.createElement('div');
    menuItem4.classList.add('menu-item');
    menuDisplay.appendChild(menuItem4);
    const menuItem4H2 = document.createElement('h2');
    menuItem4H2.innerText = 'Jello di Colosseo';
    menuItem4.appendChild(menuItem4H2);
    const menuItem4P1 = document.createElement('p');
    menuItem4P1.innerText = 'A dessert gelatin molded in the shape of the colosseum.';
    menuItem4.appendChild(menuItem4P1);
    const menuItem4P2 = document.createElement('p');
    menuItem4P2.innerText = '11';
    menuItem4.appendChild(menuItem4P2);

}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearContainer": () => (/* binding */ clearContainer),
/* harmony export */   "clearMenuDisplay": () => (/* binding */ clearMenuDisplay),
/* harmony export */   "menuSelectorListen": () => (/* binding */ menuSelectorListen),
/* harmony export */   "navbarListen": () => (/* binding */ navbarListen)
/* harmony export */ });
/* harmony import */ var _main_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-page */ "./src/main-page.js");
/* harmony import */ var _about_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./about-page */ "./src/about-page.js");
/* harmony import */ var _menu_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-page */ "./src/menu-page.js");
/* harmony import */ var _contact_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contact-page */ "./src/contact-page.js");





function clearContainer() {
    const container = document.getElementById('container');
    container.remove();
}

function navbarListen() {
    const navbarHome = document.getElementById('home-nav-button');
    const navbarMenu = document.getElementById('menu-nav-button');
    const navbarAbout = document.getElementById('about-nav-button');
    const navbarContact = document.getElementById('contact-nav-button');

    navbarHome.addEventListener('click', e => {
        clearContainer();
        (0,_main_page__WEBPACK_IMPORTED_MODULE_0__.createMain)();
        navbarListen();
    })
    navbarMenu.addEventListener('click', e => {
        clearContainer();
        (0,_menu_page__WEBPACK_IMPORTED_MODULE_2__.createMenu)();
        navbarListen();
        menuSelectorListen();
    })
    navbarAbout.addEventListener('click', e => {
        clearContainer();
        (0,_about_page__WEBPACK_IMPORTED_MODULE_1__.createAbout)();
        navbarListen();
    })
    navbarContact.addEventListener('click', e => {
        clearContainer();
        (0,_contact_page__WEBPACK_IMPORTED_MODULE_3__.createContact)();
        navbarListen();
    })


};

function clearMenuDisplay() {
    const menuDisplay = document.getElementById('menu-display');
    menuDisplay.remove()
}

function menuSelectorListen() {
    const antipasto = document.getElementById('antipasto');
    const soupSalad = document.getElementById('soup-salad');
    const pizzaPasta = document.getElementById('pizza-pasta');
    const meatSeafood = document.getElementById('meat-seafood');
    const deserts = document.getElementById('desserts');

    antipasto.addEventListener('click', e => {
        clearMenuDisplay()
        ;(0,_menu_page__WEBPACK_IMPORTED_MODULE_2__.addAntipasto)();
        menuSelectorListen();
    })

    soupSalad.addEventListener('click', e => {
        clearMenuDisplay()
        ;(0,_menu_page__WEBPACK_IMPORTED_MODULE_2__.addSoupSalad)();
        menuSelectorListen();
    })

    pizzaPasta.addEventListener('click', e => {
        clearMenuDisplay()
        ;(0,_menu_page__WEBPACK_IMPORTED_MODULE_2__.addPizzaPasta)();
        menuSelectorListen();
    })

    meatSeafood.addEventListener('click', e => {
        clearMenuDisplay()
        ;(0,_menu_page__WEBPACK_IMPORTED_MODULE_2__.addMeatSeafood)();
        menuSelectorListen();
    })

    deserts.addEventListener('click', e => {
        clearMenuDisplay()
        ;(0,_menu_page__WEBPACK_IMPORTED_MODULE_2__.addDessert)();
        menuSelectorListen();
    })

    
}

/***/ }),

/***/ "./src/img/abdalla-m-uTaSlu2Jfsg-unsplash.jpg":
/*!****************************************************!*\
  !*** ./src/img/abdalla-m-uTaSlu2Jfsg-unsplash.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "abdalla-m-uTaSlu2Jfsg-unsplash..jpg";

/***/ }),

/***/ "./src/img/chicken-2308650312.jpg":
/*!****************************************!*\
  !*** ./src/img/chicken-2308650312.jpg ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "chicken-2308650312..jpg";

/***/ }),

/***/ "./src/img/dining-area.jpg":
/*!*********************************!*\
  !*** ./src/img/dining-area.jpg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "dining-area..jpg";

/***/ }),

/***/ "./src/img/dushanbe-serena-hotel.jpg":
/*!*******************************************!*\
  !*** ./src/img/dushanbe-serena-hotel.jpg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "dushanbe-serena-hotel..jpg";

/***/ }),

/***/ "./src/img/gabriella-clare-marino-F6AkaAzN4lk-unsplash.jpg":
/*!*****************************************************************!*\
  !*** ./src/img/gabriella-clare-marino-F6AkaAzN4lk-unsplash.jpg ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "gabriella-clare-marino-F6AkaAzN4lk-unsplash..jpg";

/***/ }),

/***/ "./src/img/main-qimg-ad38fef62b1b7156b19aeee7e96571d7-lq.jpeg":
/*!********************************************************************!*\
  !*** ./src/img/main-qimg-ad38fef62b1b7156b19aeee7e96571d7-lq.jpeg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "main-qimg-ad38fef62b1b7156b19aeee7e96571d7-lq..jpeg";

/***/ }),

/***/ "./src/img/same-bad-sauce-smothered.jpg":
/*!**********************************************!*\
  !*** ./src/img/same-bad-sauce-smothered.jpg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "same-bad-sauce-smothered..jpg";

/***/ }),

/***/ "./src/img/worst-pasta-ive-ever.jpg":
/*!******************************************!*\
  !*** ./src/img/worst-pasta-ive-ever.jpg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "worst-pasta-ive-ever..jpg";

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
/******/ 			id: moduleId,
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-page */ "./src/main-page.js");
/* harmony import */ var _about_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./about-page */ "./src/about-page.js");
/* harmony import */ var _menu_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-page */ "./src/menu-page.js");
/* harmony import */ var _contact_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contact-page */ "./src/contact-page.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./main.css */ "./src/main.css");







(0,_main_page__WEBPACK_IMPORTED_MODULE_0__.createMain)();
(0,_utils__WEBPACK_IMPORTED_MODULE_4__.navbarListen)();

})();

/******/ })()
;
//# sourceMappingURL=main.ed04e78cf770fa109a24.js.map