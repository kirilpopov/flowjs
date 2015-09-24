import Parser from './jsonParser'
import {Shape, Decision, Start, Process, End, ShapeLink, Direction} from './shape'

export default class JsonParser implements Parser{

    jsonObj: any;

    constructor(jsonString: string) {        
        try {
            this.jsonObj  = JSON.parse(jsonString);
        } catch (e) {
            console.log("invalid Json" + e);
            this.jsonObj = {};
        }        
    }

    parse(): Shape{
        // todo - validate                
        return this.getItem("start", this.jsonObj.items, []);                
    }

    getItem(itemName: string, items: any, foundShapes: Array<Shape>): Shape {

        var itemsAlreadyConstructed =
            foundShapes.filter(function (shape, i, shapes) {
                return shape.getName() === itemName;
            });

        if (itemsAlreadyConstructed.length > 0) {
            return itemsAlreadyConstructed[0];
        }

        var jsonItem: any;        
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

        var result: Shape;
        
        switch (itemType) {
            case "decision":
                result = new Decision(name, title);
                break;
            case "start":
                result = new Start(name, title);
                break;
            case "process":
                result = new Process(name, title);
                break;
            case "end":
                result = new End(name, title);
                break;
        }
                
        foundShapes.push(result);                 

        if (typeof jsonItem.next !== "undefined") {
            if (typeof jsonItem.next === "string") {
                var next = this.getItem(jsonItem.next, items, foundShapes);
                result.addLink(new ShapeLink(result, next));
            }
            else if (jsonItem.next.constructor == Array) {
                for (var index = 0; index < jsonItem.next.length; index++) {

                    var nextItemJson = jsonItem.next[index];
                    var next = this.getItem(nextItemJson.next, items, foundShapes);

                    var dirEnum: Direction;
                    var dir: string = nextItemJson.dir;
                    // convert direction string to enum value
                    if (typeof dir === "string") {                        
                        dir = dir.charAt(0).toUpperCase() + dir.slice(1);                        
                        dirEnum = Direction[dir];
                    }
                    result.addLink(new ShapeLink(result, next, nextItemJson.label, dirEnum));
                }
            }
        }

        return result;
    }
}