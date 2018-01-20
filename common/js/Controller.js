var Controller = function()
{	
	var modelData = new Object(); 
	this.init = function()
	{
		loadPageConfig();
	}
	
	function loadPageConfig(e)
	{
		$.getJSON("common/js/data.json", function(_data)
		{
			//console.log("THE Config FILE loaded successfully...!!!");
			modelData = _data;
			createView();
		}).fail(function(e) { 
			console.log("ISSUE IN THE Config FILE"); 
		});
	}
	
	function createView()
	{
		var _dropDownTop = 50;
		console.log(modelData);
		var wrapper = document.createElement('div');
		$(wrapper).appendTo('body').attr('id','mainWrapper');
		
		var titleHeadar = document.createElement('div');
		$(titleHeadar).appendTo(wrapper).attr('id','titleHeadar').html(modelData.title);
		
		var _dropDown = document.createElement('div');
		$('body').append(_dropDown);
		$(_dropDown).css({
			"position":"absolute",
			"left":"50px",
			"top": _dropDownTop+"px",
			"width":"310px",
			"height":"30px",
			"border":"1px solid",
			"cursor":"pointer",
			"border-radius":"5px"
		}).attr("id", "dropDown_0").addClass("closeDropDown");
	
		
		var _dropDownArrow = document.createElement('div');
		$(_dropDown).append(_dropDownArrow);
		$(_dropDownArrow).css({
			"position":"absolute",
			"right":"-1px",
			"top":"-1px",
			"width":"30px",
			"height":"30px",
			"background":"#0088C1",
			"border":"1px solid",
			"border-radius":"5px"
		}).attr("id", "_dropDownArrow");
		
		var _selectedText = document.createElement('div');
		$(_dropDown).append(_selectedText);
		$(_selectedText).css({
			"position":"absolute",
			"left":"0px",
			"top":"0px",
			"width":"265px",
			"height":"25px",
			"text-align":"left",
			"padding":"5px 0px 0px 10px"
		}).attr("id", "selectedText_0").addClass("emptyText").html("");
		
		var _dropDownArrowImg = document.createElement('div');
		$(_dropDownArrow).append(_dropDownArrowImg);
		$(_dropDownArrowImg).css({
			"position":"absolute",
			"right":"10px",
			"top":"10px",
			"width":"10px",
			"height":"9px",
		//	"backgroundImage":"url(downArrow.png)"
		}).attr("id", "_dropDownArrowImg");
		
		var _dropDownChildParent = document.createElement('div');
		$('body').append(_dropDownChildParent);
		$(_dropDownChildParent).css({
			"position":"absolute",
			"left":"50px",
			"top": (_dropDownTop + 35)+"px",
			"width":"auto",
			"height":"auto",
			"z-index":1
		}).attr("id", "dropDownChildParent_0").hide();
		
		var _ul = document.createElement('ul');
		$(_ul).appendTo(_dropDownChildParent);
		for(var i=0; i<modelData.pizzaObj.category.length; i++)
		{
			var _li = document.createElement('li');		
			$(_li).appendTo(_ul).html(modelData.pizzaObj.category[i]["title"]);
		}
		
	/* //	var _top = 0;
		for(var i=0; i<5; i++)
		{
			var _dropDownChild = document.createElement('div');
			$(_dropDownChildParent).append(_dropDownChild);
			$(_dropDownChild).css({
				"position":"relative",
			//	"left":"0px",
			//	"top": _top+"px",
				"margin-bottom":"2px",
				"width":"270px",
				"height":"20px",
				//"border":"1px solid",
				"cursor":"pointer",
				"padding":"5px 0px 0px 10px",
				"background" : "#FBE9BD",
				"border-radius":"5px"
			}).attr("id", "child_"+i).html(_textObj["selectionText"][i]);
		//	_top += 26;
		}	 */
		//_dropDownTop +=  80; 
		$(_dropDown).off("click", clickEvents).on("click", clickEvents);
	}
	
	function clickEvents(e)
	{
		$("#dropDownChildParent_0").slideDown("slow");
	}
}
	