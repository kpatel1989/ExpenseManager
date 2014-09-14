BarChart = Backbone.View.extend({

	m_Model : null,

	m_mainDiv : null,
	m_verticalBar : null,
	m_verticalBarChild : null,
	m_horizontalBar : null,
	m_dataBar : null,
	m_dataBarChild : null,
	m_lstVerticalCaption : null,
	m_lstHorizontalCaption : null,
	m_Title : null,
	m_lstBars : null,
	m_lstColors : null,

	m_animation : null,

	initialize : function(){
		this.m_ChartParent = this.$el[0];
	},
	setModel : function(model){
		this.m_Model = model;
		this.listenTo(this.m_Model,BarChart.DRAW_CHART,this.OnDrawEvent);
	},

	getModel : function(){
		return this.m_Model;
	},

	OnDrawEvent : function(){
		this.render();
	},

	//view functions
	render : function(){
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
		this.m_dataBarChild = document.createElement("div");
		this.m_dataBarChild.id = "databarChild";

		this.m_Title = document.createElement("div");
		this.m_Title.id = "chartTitle";


		this.m_ChartParent.appendChild(this.m_mainDiv);
		this.m_mainDiv.appendChild(this.m_verticalBar);
		this.m_mainDiv.appendChild(this.m_horizontalBar);
		this.m_verticalBar.appendChild(this.m_verticalBarChild);

		this.m_mainDiv.appendChild(this.m_Title);

		this.m_dataBar.appendChild(this.m_dataBarChild);
		this.m_mainDiv.appendChild(this.m_dataBar);


	},
	renderData : function(){
		this.m_Title.innerText = this.m_Model.m_ChartTitle;
		this.m_Title.textContent = this.m_Model.m_ChartTitle;

		this.m_lstColors = [];

		if (!this.m_lstColors){
			this.m_lstColors = this.m_Model.generateColors();
		}

		this.m_lstVerticalCaption = [];
		for (i=0;i<this.m_Model.m_YAxisData.length;i++)
		{
			var div = document.createElement("div");
			div.id = "y_axis_data_"+i;

			var pointer = document.createElement("div");
			pointer.id = "ypointer";

			var text = document.createElement("div");
			text.className = "yAxisText";

			if (this.m_GraphType == BarChart.GraphType.VERTICAL)
			{
				text.className += " verticalGraph";
			}

			div.appendChild(text);
			div.appendChild(pointer);

			this.m_lstVerticalCaption.push(div);
		}

		this.m_lstHorizontalCaption = [];
		for (i=0;i<this.m_Model.m_XAxisData.length;i++)
		{
			var div = document.createElement("div");
			div.id = "x_axis_data_"+i;

			var pointer = document.createElement("div");
			pointer.id = "xpointer";

			var text = document.createElement("div");
			text.className ="xAxisText";
			if (this.m_GraphType == BarChart.GraphType.VERTICAL)
			{
				text.className += " verticalGraph";
				text.className += " rotate";
			}

			div.appendChild(pointer);
			div.appendChild(text);
			this.m_lstHorizontalCaption.push(div);
		}

		for (i=0;i<this.m_Model.m_YAxisData.length;i++)
		{
			this.m_lstVerticalCaption[i].firstChild.appendChild(document.createTextNode(this.m_Model.m_YAxisData[i]));
		}

		for (i=0;i<this.m_Model.m_XAxisData.length;i++)
		{
			this.m_lstHorizontalCaption[i].lastChild.appendChild(document.createTextNode(this.m_Model.m_XAxisData[i]));
		}

		this.createDataBars();

		for (i=this.m_lstVerticalCaption.length-1;i>=0;i--)
		{
			this.m_verticalBarChild.appendChild(this.m_lstVerticalCaption[i]);
		}
		for (i=0;i<this.m_lstHorizontalCaption.length;i++)
		{
			this.m_horizontalBar.appendChild(this.m_lstHorizontalCaption[i]);
		}
		for (i=this.m_lstBars.length-1;i>=0;i--)
		{
			this.m_dataBarChild.appendChild(this.m_lstBars[i]);
		}
		this.resizeHeight();

	},
	createDataBars : function(){
		this.m_lstBars = [];
		for (k=0;k<this.m_Model.m_values.length;k++)
		{
			var div = document.createElement("div");
			div.id = "data_bar_"+k;

			this.m_lstBars.push(div);
			distance = this.m_Model.getDistance(this.m_Model.m_values[k]);
			if (this.m_Model.m_GraphType == BarChart.GraphType.HORIZONTAL)
			{
				div.className = "verticalBar";
				div.style.width = Math.round(distance,0) + "px";
			}
			else
			{
				div.className = "horizontalBar";
				div.style.height = Math.round(distance,0) + "px";
			}
			div.style.backgroundColor = this.m_Model.m_BarColors[k];

			var text = document.createElement("div");
			text.innerHTML = (this.m_Model.m_values[k]).toFixed(2);
			text.className = "dataBarText"
			div.appendChild(text);

		}
		this.resizeHeight();
	},
	clearChart : function(){
		if (this.m_mainDiv && this.m_mainDiv.parentNode)
			this.m_mainDiv.parentNode.removeChild(this.m_mainDiv);

	},
	resizeHeight : function(){
	 	this.m_mainDiv.style.height = (this.m_verticalBarChild.offsetHeight + this.m_verticalBarChild.style	.paddingBottom * 2) + "px";
		//this.m_mainDiv.style.width = (this.m_)
	}
});

