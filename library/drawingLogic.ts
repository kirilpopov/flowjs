import {Drawer} from './drawer'
import {Shape, Decision, Start, Process, End, ShapeLink, Direction, Rect, Point} from './shape'
import JsFlowConfig from './jsflowConfig';

export default class DrawingLogic {
    drawer: Drawer;
    canvasWidth: number;
    canvasHeight: number;

    elementWidth: number = 80;
    elementHeight: number = 80;

    lineHeight: number = 50;

    constructor(drawer: Drawer, config:JsFlowConfig) {
        this.drawer = drawer;
        this.drawer.init(config.canvasId, config.canvasWidth, config.canvasHeight);

        this.canvasWidth = config.canvasWidth;
        this.canvasHeight = config.canvasHeight;
    }

    draw(rootShape: Shape) {        
        this.drawCore(rootShape, null, null, []);
    }

    drawCore(shape: Shape, parent: Shape, link: ShapeLink, drawnItems: Shape[]) {
        // if the item has already been drawn - ignore        
        var itemsAlreadyDrawn = drawnItems.filter(function (s, i, shapes) {
            return s.getName() === shape.getName();
        });
        if (itemsAlreadyDrawn.length > 0) {
            return;
        } 

        // calculate shape's drawing rectangle
        var rect = new Rect(0, 0, this.elementWidth, this.elementHeight);
        
        if (link === null) {
            // first item - use center 
            rect.point = new Point(this.canvasWidth / 2 - this.elementWidth / 2, 0);                        
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
    }

    drawLine(shape: Shape, link: ShapeLink, drawnItems: Shape[]) {
        
        // if the item has already been drawn - drawn a line to existing item
        var itemsAlreadyDrawn = drawnItems.filter(function (s, i, shapes) {
            return s.getName() === link.child.getName();
        });
        if (itemsAlreadyDrawn.length > 0) {
            this.drawLineToExistingItem(shape, itemsAlreadyDrawn[0], link);
            return;
        } 

        var dir = link.direction;
        if (dir === null) {
            dir = Direction.Down;
        }

        var cp = shape.getContactPoint(dir);
        var begin = cp.point;
        var end = begin.move(dir, this.lineHeight);
        // update contact point properties
        cp.isBound = true;
        cp.boundLink = link;
        // update link properties
        link.beginPoint = begin;
        link.endPoint = end;

        this.drawer.line(begin, end, true, link.name);        
    }

    drawLineToExistingItem(parentShape: Shape, childShape: Shape, link: ShapeLink) {
    }

    // gets a rect for a shape  based on a line
    getShapeRectStartingPoint(link: ShapeLink): Point {
        switch (link.direction) {
            case Direction.Down:
                return link.endPoint.add(-this.elementWidth / 2, 0);
            case Direction.Right:
                return link.endPoint.add(0, -this.elementHeight / 2);
            case Direction.Left:
                return link.endPoint.add(-this.elementWidth, -this.elementHeight / 2);
            case Direction.Up:
                return link.endPoint.add(-this.elementWidth / 2, 0);
        }
        return null;
    }
}
