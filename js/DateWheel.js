	var Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Auj", "Sep", "Oct", "Nov", "Dec"];
	var Months_31 = ["Jan", "Mar", "May", "Jul", "Auj", "Oct", "Dec"];
	var YearRange = [2010,2050];
	DateWheel = function(parent){
		this.divDatePicker = document.createElement("div");		
		this.divDatePicker.id = "datepickerWheel";
		this.divDatePicker.style.fontSize = "30px";
		this.divDatePicker.style.border = "1px solid #CACACA";
		parent.appendChild(this.divDatePicker);
		
		var divStyle = {
			containerHeight : 150,
			width : 70,
			itemHeight : 30,
		}
		this.oDay = new DayList(this.divDatePicker,divStyle);
		
	};
	
	DateWheel.prototype = {
		divDatePicker : null,
		oDay : null,
		oMonth : null,
		oYear : null,
		
	};	
	
	
	
	ScrollableDiv = function(parent,divStyle){
		me = this;
		this.divStyle = divStyle;
		this.mousePointOld = null;
		this.mousePointNew = null;
		this.touchStart = null;
		this.currentItem = 0;
		this.mainDiv = document.createElement("div");
		parent.appendChild(this.mainDiv);
		
		this.viewport = document.createElement("div");
		this.mainDiv.appendChild(this.viewport);
		
		this.mainDiv.style.height = "100%";
		this.mainDiv.id = "scroller";
		this.mainDiv.style.overflow = "hidden";
		this.mainDiv.style.paddingLeft = "30px";
		this.mainDiv.style.width = divStyle.width + "px";
		this.mainDiv.style.display = "inline-block";
		this.mainDiv.style.position = "relative";
		
		this.viewport.id = "viewport";
		this.viewport.style.height = divStyle.itemHeight + "px";
		this.viewport.style.width = divStyle.width + "px";
		this.viewport.style.top = (divStyle.containerHeight - divStyle.itemHeight)/2 +"px";
		this.viewport.style.overflow = "visible";
		this.viewport.style.position = "absolute";
		
		this.mainDiv.addEventListener("mousewheel",this.scroll);
		me.mainDiv.addEventListener("touchstart",this.onTouchStart);
		me.mainDiv.addEventListener("mousedown",this.onTouchStart);
		window.addEventListener("mouseup",this.onTouchEnd);
		window.addEventListener("touchend",this.onTouchEnd);
		window.addEventListener("mousemove",this.onTouchMove);
		window.addEventListener("touchmove",this.onTouchMove);
	}
	
	ScrollableDiv.prototype = {
		mainDiv : null,
		viewport : null,
		me : null,
		child : null,
		divStyle : null,
		mousePointOld : null,
		mousePointNew : null,
		touchStart : null,
		currentItem : null,
		
		setViewportHeight : function(height){
			this.viewport.style.height = height;
		},
		setViewportWidth : function(width){
			this.viewport.style.width = width;
		},
		setViewportOverflow : function(overflow){
			this.viewport.style.overflow = overflow;
		},
		addChild : function(child){
			this.child = child;
			this.viewport.appendChild(child.mainDiv);
		},
		scroll : function(evt){
			var top = me.getTop();
			var height = me.divStyle.itemHeight;
			if (evt.deltaY<0){
				top = top + height;
			}
			else if (evt.deltaY > 0){
				top = top - height;
			}
			me.updateTop(top);
			$("#touchResponse")[0].innerHTML = "top :" + top;
			evt.preventDefault();
		},
		onTouchStart : function(evt){
				me.mousePointOld = {x : evt.x, y : evt.y};
				me.mousePointNew = {x : evt.x, y : evt.y};
				me.touchStart = true;
			
		},
		onTouchMove : function(evt){
			if (me.touchStart){
				$("#touchResponse")[0].innerHTML = "x =" + evt.x + ",y ="+ evt.y;
				me.mousePointOld = {x : me.mousePointNew.x, y : me.mousePointNew.y};
				me.mousePointNew = {x : evt.x, y : evt.y};
				var top = me.getTop();
				top += me.mousePointNew.y - me.mousePointOld.y;
				me.updateTop(top);
				$("#touchResponse")[0].innerHTML += "top :" + top;
			}
		},
		onTouchEnd : function(evt){
			me.touchStart = false;
			me.setCurrentItem();
		},
		updateTop : function(top){
			var height = me.divStyle.itemHeight;
			var childHeight = me.divStyle.itemHeight * me.child.itemCount;
			if (top > 0){
				top = 0;
			}
			else if (top < -childHeight + height){
				top = -childHeight + height;
			}
			me.child.mainDiv.style.top = top + "px";
		},
		getTop : function(){
			return parseInt(me.child.mainDiv.style.top);
		},
		setCurrentItem : function(){
			var rem = Math.round(-this.getTop()/30);
			if (this.getTop()%this.divStyle.itemHeight!=0){
				var top = -rem * this.divStyle.itemHeight;
				this.updateTop(top);
			}
			this.currentItem = rem;
		}
	}
	
	DayList = function(parent,divStyle){
		this.itemCount = 31;
		divStyle.width =  50;
		this.scroller = new ScrollableDiv(parent,divStyle);
		this.mainDiv = document.createElement("div");
		this.mainDiv.id = "daylist";
		this.mainDiv.style.position = "absolute";
		this.mainDiv.style.top = "0px";
		this.scroller.addChild(this);
		
		for (i=1;i<=this.itemCount;i++){
			var day = document.createElement("div");
			day.id = 'Day'+i;
			day.style.height = divStyle.itemHeight + "px";
			//day.style["-webkit-transform"] = "perspective(64px) rotateX(-40deg)";
			day.style['background-color'] = '#CACACA';
			day.style['text-align'] = 'center';
			day.style['font-size'] = '31px';
			day.appendChild(document.createTextNode(i));
			this.mainDiv.appendChild(day);
		}
	}
	
	DayList.prototype = {
		mainDiv : null,
		scroller : null,
		itemCount : null
	}
	
	MonthList = function(parent,divStyle){
		this.itemCount = 12;
		divStyle.width = 70;
		this.scroller = new ScrollableDiv(parent,divStyle);
		this.mainDiv = document.createElement("div");
		for (i=1;i<=12;i++){
			var month = document.createElement("div");
			month.appendChild(document.createTextNode(Months[i]));
			this.mainDiv.appendChild(month);
		}
	}
	MonthList.prototype = {
		mainDiv : null,
		scroller : null,
		itemCount : null
	}
	YearList = function(){
		this.mainDiv = document.createElement("div");
		for (i=1;i<=12;i++){
			var year = document.createElement("div");
			year.appendChild(document.createTextNode(i));
			this.mainDiv.appendChild(year);
		}
	}
	YearList.prototype = {
			mainDiv : null,	
	}