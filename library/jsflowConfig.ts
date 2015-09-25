export default class JsFlowConfig{		
	canvasId: string = "container";	
	canvasWidth: number = 1000;
	canvasHeight: number = 1000;
	
	constructor(config:any){
		for(var configProp in config) 
		{
			this[configProp]=config[configProp];
		}
	}
	
}