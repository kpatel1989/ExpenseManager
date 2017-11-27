BarChart.GraphType = {HORIZONTAL : 0, VERTICAL : 1};
BarChart.DRAW_CHART = "DRAW_CHART";

BarChartModel = Backbone.Model.extend({

	m_YAxisData : null,
	m_XAxisData : null,
	m_values : null,
	m_GraphType : BarChart.GraphType.HORIZONTAL,
	m_YAxisTitle : null,
	m_XAxisTitle : null,
	m_BarColors : null,
	m_ChartParent : null,
	m_ChartTitle : null,

	m_intervalWidth : 0,

	initialize : function(){
		this.m_intervalWidth = 40;
	},

	setData : function(data){
		this.setGraphType(data['GraphType']);
		this.setGraphData(data['Values']);
		if (this.m_GraphType == BarChart.GraphType.HORIZONTAL)
		{
			if (data['AxisData'])
			{
				this.setYAxisData(data['AxisData']);
				this.setXAxisData(this.generateAxisValues());
			}
		}
		else
		{
			if (data['AxisData'])
			{
				this.setXAxisData(data['AxisData']);
				this.setYAxisData(this.generateAxisValues());
			}
		}

		this.setXAxisTitle(data['XAxisTitle']);
		this.setYAxisTitle(data['YAxisTitle']);
		this.setColors(this.generateColors());
		this.setTitle(data['ChartTitle']);
		this.m_bDirty = false;


		this.trigger(BarChart.DRAW_CHART,this);
	},

	//model functions
	setGraphType : function(type){
		this.m_GraphType = type;
	},
	setTitle : function(title){
		this.m_ChartTitle = data['ChartTitle'];
	},
	setYAxisTitle : function(title){
		this.m_YAxisTitle = title;
	},
	setXAxisTitle : function(title){
		this.m_XAxisTitle = title;
	},
	setYAxisData : function(yAxisData){
		this.m_YAxisData = $.map(yAxisData,function(el){ return el; });
	},
	setXAxisData : function(xAxisData){
		this.m_XAxisData = $.map(xAxisData,function(el){ return el; });
	},
	setGraphData : function(graphData){
		this.m_values = $.map(graphData,function(el){ return el; });
	},
	setColors : function(colors){
		if (colors)
			this.m_BarColors = $.map(colors,function(el){ return el; });
	},
	refesh : function(){
		this.trigger(this.drawEvent,null);
	},
	generateAxisValues : function(){
		if (!this.m_values)
		{
			return [];
		}
		max = this.m_values[0];
		for(i=0;i<this.m_values.length;i++)
		{
			if (this.m_values[i] > max)
			{
				max = this.m_values[i];
			}
		}
		if (isNaN(max))
		{
			return [];
		}

		totalintervals = 10;

		interval = max / totalintervals;

		value = 10;
		incRate = Math.pow((max/totalintervals),1/10) - 1 ;
		axisValues = [];
		for(i=0;i<totalintervals;i++)
		{
			axisValues[i] = parseFloat(Math.round(value * Math.pow(1+incRate,i+1),0));

		}
		return axisValues;

	},
	generateColors : function(){
		this.m_BarColors = [];
		for(o=0;o<this.m_values.length;o++)
		{
			var r = Math.round((Math.random() * 1000)%160,0);
			var g = Math.round((Math.random() * 1000)%160,0);
			var b = Math.round((Math.random() * 1000)%160,0);
			this.m_BarColors[o] = "rgb(" + r + "," + g + "," + b +")";
		}
	},

	getDistance : function(value){

		if (this.m_GraphType == BarChart.GraphType.HORIZONTAL)
		{
			axisData = this.m_XAxisData;
		}
		else
		{
			axisData = this.m_YAxisData;
		}
		index = axisData.length-1;
		for(j=0;j<axisData.length;j++)
		{
			if (axisData[j]>value)
			{
				index = j;
				break;
			}
		}
		distance = index * this.m_intervalWidth;
		curvalue = index == 0 ? 0 : axisData[index - 1];
		remainder = value - curvalue;
		difference = axisData[index] - curvalue;
		additional = this.m_intervalWidth * remainder / difference;
		total = distance + additional;
		return total;
	}

});
