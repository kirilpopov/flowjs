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

window.onload = function () {
   
    var p = new jsflow();
    var shapes = p.loadJson(simpleJson);
    p.draw(shapes);
};

