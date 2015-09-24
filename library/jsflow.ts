import DrawingLogic from './drawingLogic';
import JsonParser from './jsonParser';
import RaphaelAdapter from './raphaelAdapter';

declare var jsflow: any;

jsflow = function(g){	
	        	
	function loadJson(json)
	{
		var parser = new JsonParser(json);
		return parser.parse();	
	}
	
	function draw(shape){
		var raphaelAdapter = new RaphaelAdapter();
    	var drawingLogic = new DrawingLogic(raphaelAdapter, "container", 500, 5000);	
		drawingLogic.draw(shape);
	}
	
	
	return {
		loadJson: loadJson,
		draw: draw
	}
};

export=jsflow;