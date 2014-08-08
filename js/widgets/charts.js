BarChart = function(){



};
BarChart.GraphType = {HORIZONTAL : 0, VERTICAL : 1};

BarChart.prototype = {
	m_YAxisData : null,
	m_XAxisData : null,
	m_values : null,
	m_GraphType : null,
	m_YAxisTitle : null,
	m_XAxisTitle : null,
	m_BarColors : null,
	m_ChartParent : null,
	m_ChartTitle : null,

	m_mainDiv : null,
	m_verticalBar : null,
	m_verticalBarChild : null,
	m_horizontalBar : null,
	m_dataBar : null,
	m_lstVerticalCaption : null,
	m_lstHorizontalCaption : null,
	m_Title : null,
	m_lstBars : null,
	m_lstColors : null,

	initialize : function(data){
		this.setGraphType(data['GraphType']);
		this.setYAxisData(data['YAxisData']);
		this.setXAxisData(data['XAxisData']);
		this.setGraphData(data['Values']);
		this.setXAxisTitle(data['XAxisTitle']);
		this.setYAxisTitle(data['YAxisTitle']);
		this.setColors(this.generateColors());
		this.setTitle(data['ChartTitle']);
		this.m_bDirty = false;
	},
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
		this.setData();
	},
	render : function(container){
		if (container && container.nodeName.toLowerCase() == "div"){
			this.m_ChartParent = container;
		}

		this.clearChart();
		this.initElements();
		this.renderData();


	},
	initElements : function(){
		this.m_mainDiv = document.createElement("div");
		this.m_mainDiv.id = "barChart";
		this.m_verticalBar = document.createElement("div");
		this.m_verticalBar.id = "verticalBar";
		this.m_verticalBarChild = document.createElement("div");
		this.m_verticalBarChild.id = "verticalBarChild";
		this.m_horizontalBar = document.createElement("div");
		this.m_horizontalBar.id = "horizontalBar";
		this.m_dataBar = document.createElement("div");
		this.m_dataBar.id = "databar";

		this.m_Title = document.createElement("div");
		this.m_Title.id = "chartTitle";
		this.m_lstColors = [];
		this.m_lstVerticalCaption = [];
		for (i=0;i<this.m_YAxisData.length;i++)
		{
			var div = document.createElement("div");
			div.id = "y_axis_data_"+i;

			this.m_lstVerticalCaption.push(div);
		}
		this.m_lstHorizontalCaption = [];
		for (i=0;i<this.m_XAxisData.length;i++)
		{
			var div = document.createElement("div");
			div.id = "x_axis_data_"+i;

			var pointer = document.createElement("div");
			pointer.id = "pointer";
			div.appendChild(pointer);

			this.m_lstHorizontalCaption.push(div);
		}
		this.m_lstBars = [];
		for (i=0;i<this.m_values.length;i++)
		{
			var div = document.createElement("div");
			div.id = "data_bar_"+i;
			this.m_lstBars.push(div);
		}
		this.m_ChartParent.appendChild(this.m_mainDiv);
		this.m_mainDiv.appendChild(this.m_verticalBar);
		this.m_mainDiv.appendChild(this.m_horizontalBar);
		this.m_verticalBar.appendChild(this.m_verticalBarChild);
		for (i=0;i<this.m_lstVerticalCaption.length;i++)
		{
			this.m_verticalBarChild.appendChild(this.m_lstVerticalCaption[i]);
		}
		for (i=0;i<this.m_lstHorizontalCaption.length;i++)
		{
			this.m_horizontalBar.appendChild(this.m_lstHorizontalCaption[i]);
		}
		this.m_mainDiv.appendChild(this.m_Title);
		for (i=0;i<this.m_lstBars.length;i++)
		{
			this.m_dataBar.appendChild(this.m_lstBars[i]);
		}
		this.m_mainDiv.appendChild(this.m_dataBar);
		//this.m_mainDiv.appendChild(this.m_lstBars);
		//this.m_mainDiv.appendChild(this.m_lstColors);

	},
	renderData : function(){
		this.m_Title.innerText = this.m_ChartTitle;
		this.m_Title.textContent = this.m_ChartTitle;

		if (!this.m_lstColors){
			this.m_lstColors = this.generateColors();
		}

		for (i=0;i<this.m_YAxisData.length;i++)
		{
			this.m_lstVerticalCaption[i].appendChild(document.createTextNode(this.m_YAxisData[i]));
		}

		for (i=0;i<this.m_XAxisData.length;i++)
		{
			this.m_lstHorizontalCaption[i].appendChild(document.createTextNode(this.m_XAxisData[i]));
		}
	},
	clearChart : function(){
		if (this.m_mainDiv && this.m_mainDiv.parentNode)
			this.m_mainDiv.parentNode.removeChild(this.m_mainDiv);

	},
	generateColors : function(){

	},

}
