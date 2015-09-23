class ShapeLink {

    parent: Shape;
    child: Shape;
    name: string;
    direction: Direction;
    beginPoint: Point;
    endPoint: Point;

    constructor(parent: Shape, child: Shape, name?: string, direction?: Direction) {
        this.parent = parent;
        this.child = child;
        this.name = name;
        this.direction = direction == null ? Direction.Down : direction;
    }        
}

enum Direction {
    Left,
    Up,
    Right,
    Down,    
}

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(xToAdd: number, yToAdd): Point {
        return new Point(this.x + xToAdd, this.y + yToAdd);        
    }

    move(dir: Direction, offset: number) {
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
    }

    toContactPoint(): ContactPoint {
        return new ContactPoint(this);
    }
}

class ContactPoint {

    point: Point;
    shape: Shape;
    isBound: boolean;
    boundLink: ShapeLink;

    constructor(point: Point) {
        this.point = point;
    }    
}

class Rect {
    constructor(x: number, y: number, width: number, height: number) {
        this.point = new Point(x, y);
        this.width = width;
        this.height = height;
    }
    point: Point;
    width: number;
    height: number;

    move(x: number, y: number): Rect {
        return new Rect(this.point.x + x, this.point.y + y, this.width, this.height);
    }
}

interface Shape {
    addLink(link: ShapeLink);
    getLinks(): ShapeLink[];
    getTitle(): String;
    getName(): String;    

    /**
    draw the shape into a given rectangle
    */
    draw(drawer: Drawer, rect: Rect);

    /**
    True if shape is drawn on the canvas
    */
    getIsDrawn(): boolean;

    getDrawingRect(): Rect;

    getContactPoint(dir: Direction): ContactPoint;
}

class BaseShape implements Shape {
    nextShapes: Shape[];
    links: ShapeLink[];
    title: string;
    name: string;
    isDrawn: boolean;
    drawingRect: Rect;
    contactPoints: ContactPoint[];

    constructor(name: string, title: string) {        
        this.title = title;
        this.name = name;
        this.links = []; 
    }

    addLink(link: ShapeLink) {
        this.links.push(link);
    }

    getLinks() {
        return this.links;
    }

    getTitle() {
        return this.title;
    }

    getName() {
        return this.name;
    }    
   
    draw(drawer: Drawer, rect: Rect) {        
        this.contactPoints = this.drawCore(drawer, rect);
        this.isDrawn = true;
        this.drawingRect = rect;
        // to do - contact points
    }

    // draws the shape using the drawer in the given rectange
    // and returns contact points (left, up, right, bottom)
    drawCore(drawer: Drawer, rect: Rect): ContactPoint[]{
        return [];
    }

    getIsDrawn(): boolean {
        return this.isDrawn;
    }

    getDrawingRect(): Rect {
        return this.drawingRect;
    }

    getContactPoint(dir: Direction): ContactPoint{
        return this.contactPoints[dir];
    }
}

class Decision extends BaseShape {  
    drawCore(drawer: Drawer, rect: Rect): ContactPoint[]{
        var p1 = rect.point.add(0, rect.height / 2);
        var p2 = rect.point.add(rect.width / 2, 0);
        var p3 = rect.point.add(rect.width, rect.height / 2);
        var p4 = rect.point.add(rect.width / 2, rect.height );

        drawer.line(p1, p2);
        drawer.line(p2, p3);
        drawer.line(p3, p4);
        drawer.line(p4, p1);        

        return [p1.toContactPoint(), p2.toContactPoint(), p3.toContactPoint(), p4.toContactPoint()];            
    }  
}

class Start extends BaseShape {
    drawCore(drawer: Drawer, rect: Rect): ContactPoint[] {
        var center = rect.point.add(rect.width / 2, rect.height / 2);
        drawer.ellipse(center, rect.width / 2, rect.height / 4, this.getTitle());        

        return [
            new Point(rect.point.x, rect.point.y + rect.height / 2).toContactPoint(),                        // left
            new Point(rect.point.x + rect.width / 2, rect.point.y + rect.height / 4).toContactPoint(),       // up                      
            new Point(rect.point.x + rect.width, rect.point.y + rect.height / 2).toContactPoint(),           // right
            new Point(rect.point.x + rect.width / 2, rect.point.y + rect.height * 3 / 4).toContactPoint()    // down  
        ];
    }
}

class End extends Start {
}

class Process extends BaseShape {
    drawCore(drawer: Drawer, rect: Rect): ContactPoint[]{
        drawer.rect(rect.point, rect.width, rect.height, this.getTitle());       

        return [
            new Point(rect.point.x, rect.point.y + rect.height / 2).toContactPoint(),               // left
            new Point(rect.point.x + rect.width / 2, rect.point.y).toContactPoint(),                // up
            new Point(rect.point.x + rect.width, rect.point.y + rect.height / 2).toContactPoint(),  // right
            new Point(rect.point.x + rect.width / 2, rect.point.y + rect.height).toContactPoint(),  // down            
            
        ];
    }
}

