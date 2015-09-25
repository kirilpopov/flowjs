import DrawingLogic from './drawingLogic';
import JsonParser from './jsonParser';
import RaphaelAdapter from './raphaelAdapter';
import JsFlowConfig from './jsflowConfig';

declare var jsflow: any;

jsflow = function(config){	
	
	var jsConfig = new JsFlowConfig(config);
		
	function loadJson(json)
	{
		var parser = new JsonParser(json);
		return parser.parse();	
	}
	
	function draw(shape){
		var raphaelAdapter = new RaphaelAdapter();
    	var drawingLogic = new DrawingLogic(raphaelAdapter, jsConfig);	
		drawingLogic.draw(shape);
	}
		
	return {
		loadJson: loadJson,
		draw: draw
	}
};

export=jsflow;