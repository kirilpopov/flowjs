var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShapeLink = (function () {
    function ShapeLink(parent, child, name, direction) {
        this.parent = parent;
        this.child = child;
        this.name = name;
        this.direction = direction == null ? Direction.Down : direction;
    }
    return ShapeLink;
})();
exports.ShapeLink = ShapeLink;
(function (Direction) {
    Direction[Direction["Left"] = 0] = "Left";
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["Down"] = 3] = "Down";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (xToAdd, yToAdd) {
        return new Point(this.x + xToAdd, this.y + yToAdd);
    };
    Point.prototype.move = function (dir, offset) {
        switch (dir) {
            case Direction.Down:
                return this.add(0, offset);
            case Direction.Up:
                return this.add(0, -offset);
            case Direction.Left:
                return this.add(-offset, 0);
            case Direction.Right:
                return this.add(offset, 0);
        }
    };
    Point.prototype.toContactPoint = function () {
        return new ContactPoint(this);
    };
    return Point;
})();
exports.Point = Point;
var ContactPoint = (function () {
    function ContactPoint(point) {
        this.point = point;
    }
    return ContactPoint;
})();
exports.ContactPoint = ContactPoint;
var Rect = (function () {
    function Rect(x, y, width, height) {
        this.point = new Point(x, y);
        this.width = width;
        this.height = height;
    }
    Rect.prototype.move = function (x, y) {
        return new Rect(this.point.x + x, this.point.y + y, this.width, this.height);
    };
    return Rect;
})();
exports.Rect = Rect;
var BaseShape = (function () {
    function BaseShape(name, title) {
        this.title = title;
        this.name = name;
        this.links = [];
    }
    BaseShape.prototype.addLink = function (link) {
        this.links.push(link);
    };
    BaseShape.prototype.getLinks = function () {
        return this.links;
    };
    BaseShape.prototype.getTitle = function () {
        return this.title;
    };
    BaseShape.prototype.getName = function () {
        return this.name;
    };
    BaseShape.prototype.draw = function (drawer, rect) {
        this.contactPoints = this.drawCore(drawer, rect);
        this.isDrawn = true;
        this.drawingRect = rect;
    };
    BaseShape.prototype.drawCore = function (drawer, rect) {
        return [];
    };
    BaseShape.prototype.getIsDrawn = function () {
        return this.isDrawn;
    };
    BaseShape.prototype.getDrawingRect = function () {
        return this.drawingRect;
    };
    BaseShape.prototype.getContactPoint = function (dir) {
        return this.contactPoints[dir];
    };
    return BaseShape;
})();
exports.BaseShape = BaseShape;
var Decision = (function (_super) {
    __extends(Decision, _super);
    function Decision() {
        _super.apply(this, arguments);
    }
    Decision.prototype.drawCore = function (drawer, rect) {
        var p1 = rect.point.add(0, rect.height / 2);
        var p2 = rect.point.add(rect.width / 2, 0);
        var p3 = rect.point.add(rect.width, rect.height / 2);
        var p4 = rect.point.add(rect.width / 2, rect.height);
        drawer.line(p1, p2);
        drawer.line(p2, p3);
        drawer.line(p3, p4);
        drawer.line(p4, p1);
        drawer.text(this.title, p1.add(rect.width / 2, 0));
        return [p1.toContactPoint(), p2.toContactPoint(), p3.toContactPoint(), p4.toContactPoint()];
    };
    return Decision;
})(BaseShape);
exports.Decision = Decision;
var Start = (function (_super) {
    __extends(Start, _super);
    function Start() {
        _super.apply(this, arguments);
    }
    Start.prototype.drawCore = function (drawer, rect) {
        var center = rect.point.add(rect.width / 2, rect.height / 2);
        var shapeBox = drawer.ellipse(center, rect.width / 2, rect.height / 2, this.getTitle());
        return [
            shapeBox.point.add(0, shapeBox.height / 2).toContactPoint(),
            shapeBox.point.add(shapeBox.width / 2, 0).toContactPoint(),
            shapeBox.point.add(shapeBox.width, shapeBox.height / 2).toContactPoint(),
            shapeBox.point.add(shapeBox.width / 2, shapeBox.height).toContactPoint()
        ];
    };
    return Start;
})(BaseShape);
exports.Start = Start;
var End = (function (_super) {
    __extends(End, _super);
    function End() {
        _super.apply(this, arguments);
    }
    return End;
})(Start);
exports.End = End;
var Process = (function (_super) {
    __extends(Process, _super);
    function Process() {
        _super.apply(this, arguments);
    }
    Process.prototype.drawCore = function (drawer, rect) {
        drawer.rect(rect.point, rect.width, rect.height, this.getTitle());
        return [
            new Point(rect.point.x, rect.point.y + rect.height / 2).toContactPoint(),
            new Point(rect.point.x + rect.width / 2, rect.point.y).toContactPoint(),
            new Point(rect.point.x + rect.width, rect.point.y + rect.height / 2).toContactPoint(),
            new Point(rect.point.x + rect.width / 2, rect.point.y + rect.height).toContactPoint(),
        ];
    };
    return Process;
})(BaseShape);
exports.Process = Process;
//# sourceMappingURL=shape.js.map