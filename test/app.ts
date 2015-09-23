/// <reference path="shape.ts" />
/// <reference path="jsonParser.ts" />
/// <reference path="drawingLogic.ts" />
/// <reference path="raphaelAdapter.ts" />

var simpleJson = `
{
	"items" : [
		{   "name": "start",
            "title": "Start",
            "type": "start",
            "next": "equip"
        },
        {   "name": "equip",
            "title": "Equip yourself",
            "type": "process",
            "next": "equip2"   
        },
        {   "name": "equip2",
            "title": "Equip yourself2",
            "type": "process",
            "next": "canMoveFwd"             
        },
        { 
            "name": "canMoveFwd",	
            "title": "Can we move forward?",
            "type": "decision",	
			"next":[
                {"next":"moveFwd", "label":"Yes"}, 
				{"next":"moveBack", "label":"No", "dir":"right"},
                {"next":"exit", "label":"?", "dir":"left"}
				]
		},
        { 
            "name": "exit",		
            "title": "Exit",					
            "type": "end"          
        },
        { 
            "name": "moveFwd",		
            "title": "Move forward",					
            "type": "process"          
        },
		{ 
            "name": "moveBack",	
            "title": "Move one back, move one left",	
            "type": "process"          
        }]
}`;

var json2 = `
{
	"items" : [
		{   "name": "start",		
            "title": "Start",
            "type": "start",
            "next": "equip"
        },
        {   "name": "equip",		
            "title": "Equip yourself",
            "type": "process",
            "next": "canMoveFwd"
        },
		{ 
            "name": "canMoveFwd",	
            "title": "Can we move forward?",
            "type": "decision",	
			"next":[
                {"next":"moveFwd", "label":"Yes"}, 
				{"next":"moveBack", "label":"No", "dir":"right"}
				]
		},
		{ 
            "name": "moveFwd",		
            "title": "Move forward",					
            "type": "process",	
            "next": "end"
        },
		{ 
            "name": "moveBack",	
            "title": "Move one back, move one left",	
            "type": "process",	
            "next": "canMoveFwd"
        },
		{ 
            "name": "end",			
            "title": "End",								
            "type": "end"
        }
	]
}
`;

window.onload = () => {
    var parser = new JsonParser(simpleJson);
    var result = parser.parse();    
    var raphaelAdapter = new RaphaelAdapter();
    var drawingLogic = new DrawingLogic(raphaelAdapter, "container", 500, 5000);
    drawingLogic.draw(result);
};

