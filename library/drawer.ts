import * as shapes from './shape'

export interface Drawer {
    init(elementId: string, width: number, height: number);
    line(start: shapes.Point, end: shapes.Point, arrow?: boolean, text?: string);    
    rect(start: shapes.Point, width: number, height: number, text?: string);
    ellipse(center: shapes.Point, height: number, width: number, text?: string);
    
}