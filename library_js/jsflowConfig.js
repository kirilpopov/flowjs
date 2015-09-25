var JsFlowConfig = (function () {
    function JsFlowConfig(config) {
        this.canvasId = "container";
        this.canvasWidth = 1000;
        this.canvasHeight = 1000;
        for (var configProp in config) {
            this[configProp] = config[configProp];
        }
    }
    return JsFlowConfig;
})();
exports.__esModule = true;
exports["default"] = JsFlowConfig;
//# sourceMappingURL=jsflowConfig.js.map