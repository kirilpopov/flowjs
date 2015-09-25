var drawingLogic_1 = require('./drawingLogic');
var jsonParser_1 = require('./jsonParser');
var raphaelAdapter_1 = require('./raphaelAdapter');
var jsflowConfig_1 = require('./jsflowConfig');
jsflow = function (config) {
    var jsConfig = new jsflowConfig_1["default"](config);
    function loadJson(json) {
        var parser = new jsonParser_1["default"](json);
        return parser.parse();
    }
    function draw(shape) {
        var raphaelAdapter = new raphaelAdapter_1["default"]();
        var drawingLogic = new drawingLogic_1["default"](raphaelAdapter, jsConfig);
        drawingLogic.draw(shape);
    }
    return {
        loadJson: loadJson,
        draw: draw
    };
};
module.exports = jsflow;
//# sourceMappingURL=jsflow.js.map