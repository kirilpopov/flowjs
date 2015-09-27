var shape_1 = require('./shape');
var DrawingLogic = (function () {
    function DrawingLogic(drawer, config) {
        this.elementWidth = 80;
        this.elementHeight = 40;
        this.lineHeight = 40;
        this.drawer = drawer;
        this.drawer.init(config.canvasId, config.canvasWidth, config.canvasHeight);
        this.canvasWidth = config.canvasWidth;
        this.canvasHeight = config.canvasHeight;
    }
    DrawingLogic.prototype.draw = function (rootShape) {
        this.drawCore(rootShape, null, null, []);
    };
    DrawingLogic.prototype.drawCore = function (shape, parent, link, drawnItems) {
        var itemsAlreadyDrawn = drawnItems.filter(function (s, i, shapes) {
            return s.getName() === shape.getName();
        });
        if (itemsAlreadyDrawn.length > 0) {
            return;
        }
        var rect = new shape_1.Rect(0, 0, this.elementWidth, this.elementHeight);
        if (link === null) {
            rect.point = new shape_1.Point(this.canvasWidth / 2 - this.elementWidth / 2, 0);
        }
        else {
            rect.point = this.getShapeRectStartingPoint(link);
        }
        shape.draw(this.drawer, rect);
        drawnItems.push(shape);
        var links = shape.getLinks();
        for (var index = 0; index < links.length; index++) {
            var link = links[index];
            this.drawLine(shape, link, drawnItems);
            this.drawCore(link.child, shape, link, drawnItems);
        }
    };
    DrawingLogic.prototype.drawLine = function (shape, link, drawnItems) {
        var itemsAlreadyDrawn = drawnItems.filter(function (s, i, shapes) {
            return s.getName() === link.child.getName();
        });
        if (itemsAlreadyDrawn.length > 0) {
            this.drawLineToExistingItem(shape, itemsAlreadyDrawn[0], link);
            return;
        }
        var dir = link.direction;
        if (dir === null) {
            dir = shape_1.Direction.Down;
        }
        var cp = shape.getContactPoint(dir);
        var begin = cp.point;
        var end = begin.move(dir, this.lineHeight);
        cp.isBound = true;
        cp.boundLink = link;
        link.beginPoint = begin;
        link.endPoint = end;
        this.drawer.line(begin, end, true, link.name);
    };
    DrawingLogic.prototype.drawLineToExistingItem = function (parentShape, childShape, link) {
    };
    DrawingLogic.prototype.getShapeRectStartingPoint = function (link) {
        switch (link.direction) {
            case shape_1.Direction.Down:
                return link.endPoint.add(-this.elementWidth / 2, 0);
            case shape_1.Direction.Right:
                return link.endPoint.add(0, -this.elementHeight / 2);
            case shape_1.Direction.Left:
                return link.endPoint.add(-this.elementWidth, -this.elementHeight / 2);
            case shape_1.Direction.Up:
                return link.endPoint.add(-this.elementWidth / 2, 0);
        }
        return null;
    };
    return DrawingLogic;
})();
exports.__esModule = true;
exports["default"] = DrawingLogic;
//# sourceMappingURL=drawingLogic.js.map