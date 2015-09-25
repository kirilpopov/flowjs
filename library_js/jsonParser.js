var shape_1 = require('./shape');
var JsonParser = (function () {
    function JsonParser(jsonString) {
        try {
            this.jsonObj = JSON.parse(jsonString);
        }
        catch (e) {
            console.log("invalid Json" + e);
            this.jsonObj = {};
        }
    }
    JsonParser.prototype.parse = function () {
        return this.getItem("start", this.jsonObj.items, []);
    };
    JsonParser.prototype.getItem = function (itemName, items, foundShapes) {
        var itemsAlreadyConstructed = foundShapes.filter(function (shape, i, shapes) {
            return shape.getName() === itemName;
        });
        if (itemsAlreadyConstructed.length > 0) {
            return itemsAlreadyConstructed[0];
        }
        var jsonItem;
        for (var index = 0; index < items.length; index++) {
            var item = items[index];
            if (item.name === itemName) {
                jsonItem = item;
                break;
            }
        }
        var name = jsonItem.name;
        var title = jsonItem.title;
        var itemType = jsonItem.type;
        var result;
        switch (itemType) {
            case "decision":
                result = new shape_1.Decision(name, title);
                break;
            case "start":
                result = new shape_1.Start(name, title);
                break;
            case "process":
                result = new shape_1.Process(name, title);
                break;
            case "end":
                result = new shape_1.End(name, title);
                break;
        }
        foundShapes.push(result);
        if (typeof jsonItem.next !== "undefined") {
            if (typeof jsonItem.next === "string") {
                var next = this.getItem(jsonItem.next, items, foundShapes);
                result.addLink(new shape_1.ShapeLink(result, next));
            }
            else if (jsonItem.next.constructor == Array) {
                for (var index = 0; index < jsonItem.next.length; index++) {
                    var nextItemJson = jsonItem.next[index];
                    var next = this.getItem(nextItemJson.next, items, foundShapes);
                    var dirEnum;
                    var dir = nextItemJson.dir;
                    if (typeof dir === "string") {
                        dir = dir.charAt(0).toUpperCase() + dir.slice(1);
                        dirEnum = shape_1.Direction[dir];
                    }
                    result.addLink(new shape_1.ShapeLink(result, next, nextItemJson.label, dirEnum));
                }
            }
        }
        return result;
    };
    return JsonParser;
})();
exports.__esModule = true;
exports["default"] = JsonParser;
//# sourceMappingURL=jsonParser.js.map