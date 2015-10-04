/// <reference path="../typings/raphael/raphael.d.ts" />
import {Drawer} from './drawer'
import {Shape, Decision, Start, Process, End, ShapeLink, Direction, Rect, Point} from './shape'

import 'raphael'

export default class RaphaelAdapter implements Drawer {

    paper: RaphaelPaper;

    init(elementId: string, width: number, height:number) {
        this.paper = Raphael(elementId, width, height);                
    }


    line(start: Point, end: Point, arrow?: boolean, text?: string) {
        // drawing an additional arrow makes the line longer - we have to reduce
        // the end point with the size of the arrow
        var arrowOffset = arrow ? -3 : 0;

        if (start.x > end.x || start.y > end.y) {
            arrowOffset = arrowOffset * -1
        }
        // simple logic for appling the arrow offset based on the line direction
        if (start.x == end.x) {
            end = end.add(0, arrowOffset);
        }
        else if (start.y == end.y) {
            end = end.add(arrowOffset, 0);
        }
        
        var line = this.paper.path("M" + start.x + "," + start.y + " L" + end.x + "," + end.y);

        if (arrow) {
            line.attr({
                'arrow-end': 'classic-wide-long'
            });
        }
    }

    text(text: string, center: Point) {
        var t = this.paper.text(center.x, center.y, text);
        this.updateText(t);
    }

    rect(start: Point, width: number, height: number, text?: string) {
        var el = this.paper.rect(start.x, start.y, width, height);
        var center = start.add(width / 2, height / 2);
        var textEl = this.paper.text(center.x, center.y, text);
        this.updateText(textEl);
        var eltext = this.paper.set([el, textEl]);                
    }

    ellipse(center: Point, width: number, height: number, text?: string) : Rect{        
        var el = this.paper.ellipse(center.x, center.y, width, height);
        var textEl = this.paper.text(center.x, center.y, text);
        this.updateText(textEl);
        var eltext = this.paper.set([el, textEl]);
        
        var bb = el.getBBox();
        return new Rect(bb.x, bb.y,  bb.width, bb.height);                
    }
    
    updateText(textEl: RaphaelElement)
    {
        textEl.attr({ "font-size": 9, "font-family": "Arial, Helvetica, sans-serif" });
    }
}