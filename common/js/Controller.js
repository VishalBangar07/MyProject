var Controller = function()
{	
	var modelData = new Object(); 
	this.init = function()
	{
		loadPageConfig();
		console.clear();
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
		var _dropDownTop = 90, _dropDownLeft = 135;
		console.log(modelData);
		
		var loginPageWrapper = document.createElement('div');
		$(loginPageWrapper).appendTo('body').attr('id', 'loginPageWrapper');
		
		var menuPageWrapper = document.createElement('div');
		$(menuPageWrapper).appendTo('body').attr('id', 'menuPageWrapper').hide();
		
		var appTitle = document.createElement('div');
		$(appTitle).appendTo(loginPageWrapper).css({
			"position":"absolute",
			"left":"0px",
			"top":"100px",
			"width":"600px",
			"font-size": "35px",
			"text-align": "center",
			"color": "#b24040",
			"font-family": "inherit"
		}).html(modelData.title);
		
		var _userNameTxtField = document.createElement('input');
		//$(_userNameTxtField).appendTo(loginPageWrapper).attr({'id':'u_name', "contenteditable":true}).addClass('username');
		$(_userNameTxtField).appendTo(loginPageWrapper).attr({'id':'u_name', "placeholder":"Enter User Name Here..."}).addClass('username');
		
		var _pwdTxtField = document.createElement('input');
		$(_pwdTxtField).appendTo(loginPageWrapper).attr({'id':'pwd', 'type':'password', "placeholder":"Enter Password Here..."}).addClass('password');
	
		var loginBtn = document.createElement('div');
		$(loginBtn).appendTo(loginPageWrapper).attr('id','loginBtn').html('Login');
		
		var loginMsg = document.createElement('div');
		$(loginMsg).appendTo(loginPageWrapper).attr('id','loginMsg');
		
		$(loginBtn).off('click', checkLoginDetails).on('click', checkLoginDetails);
		
		var titleHeadar = document.createElement('div');
		$(titleHeadar).appendTo(menuPageWrapper).attr('id','titleHeadar').html(modelData.title);
		
		var _quantity = document.createElement('input');
		//$(_userNameTxtField).appendTo(loginPageWrapper).attr({'id':'u_name', "contenteditable":true}).addClass('username');
		$(_quantity).appendTo(menuPageWrapper).attr({'id':'quantity', 'type': 'number', 'min':1, 'max':100, 'value':1}).addClass('quant');
		
		var orderDetailWrapper = document.createElement('div');
		$(orderDetailWrapper).appendTo(menuPageWrapper).attr('id','orderDetail').addClass('orderDetailWrapper');
		
		var _itemTxt = document.createElement('div');
		$(_itemTxt).appendTo(menuPageWrapper).addClass('itemTxt').html('Item');
		
		var _sizeTxt = document.createElement('div');
		$(_sizeTxt).appendTo(menuPageWrapper).addClass('sizeTxt').html('Size');
		
		var _quantityTxt = document.createElement('div');
		$(_quantityTxt).appendTo(menuPageWrapper).addClass('quantityTxt').html('Quantity');
		
		var confirmBtn = document.createElement('div');
		$(confirmBtn).appendTo(menuPageWrapper).attr('id','confirmBtn').html('Confirm Order');
		
		var viewOrderBtn = document.createElement('div');
		$(viewOrderBtn).appendTo(menuPageWrapper).attr('id','viewOrderBtn').html('View Order');
		
		var orderPopupPatch = document.createElement('div');
		$(orderPopupPatch).appendTo(menuPageWrapper).attr('id','orderPopupPatch').hide();
		
		var orderPopup = document.createElement('div');
		$(orderPopup).appendTo(menuPageWrapper).attr('id','orderPopup').hide();
		
		var closeBtn = document.createElement('div');
		$(closeBtn).appendTo(orderPopup).attr('id','closeBtn').css({
			    "position": "absolute",
				"right": "10px",
				"top":"10px",
				"width": "25px", 
				"height": "25px", 
				"text-align": "center",
				"border": "1px solid", 
				"border-radius": "20px"			
		}).html('X');
		
		var deliveryMsg = document.createElement('div');
		$(deliveryMsg).appendTo(orderPopup).attr('id','deliveryMsg');
		
		var orderMsg = document.createElement('div');
		$(orderMsg).appendTo(orderPopup).attr('id','orderMsg');
		
		for(var k=0; k<2; k++)
		{
			var _dropDown = document.createElement('div');
			$(menuPageWrapper).append(_dropDown);
			$(_dropDown).css({
				"position":"absolute",
				"left": _dropDownLeft+"px",
				"top": _dropDownTop+"px",
				"width":"310px",
				"height":"30px",
				"border":"1px solid",
				"cursor":"pointer",
				"border-radius":"5px"
			}).attr("id", "dropDown_"+k).addClass("closeDropDown");
			
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
			}).attr("id", "selectedText_"+k).attr('selected-id', 0).addClass("emptyText").html(k == 0 ? modelData.pizzaObj.category[k]["title"] : modelData.pizzaObj.category[k]["size"][0]);
			
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
			$(menuPageWrapper).append(_dropDownChildParent);
			$(_dropDownChildParent).css({
				"position":"absolute",
				"left":_dropDownLeft+"px",
				"top": (_dropDownTop + 35)+"px",
				"width":"310px",
				//"height":"auto",
				"z-index":1,
				"max-height":"175px", //200
				"overflow":"auto"
			}).attr("id", "dropDownChildParent_"+k).hide();
			
			var _ul = document.createElement('ul');
			$(_ul).appendTo(_dropDownChildParent);
			
			if(k == 0)
			{
				for(var i=0; i<modelData.pizzaObj.category.length; i++)
				{
					var _li = document.createElement('li');		
					$(_li).appendTo(_ul).attr('data-id', i).html(modelData.pizzaObj.category[i]["title"]);
				}
			}
			else if(k == 1)
			{
				for(var i=0; i<modelData.pizzaObj.category[0]['size'].length; i++)
				{
					var _li = document.createElement('li');		
					$(_li).appendTo(_ul).attr('data-id', i).html(modelData.pizzaObj.category[0]['size'][i]);
				}
			}
			
			//$(_dropDown).off("click", clickEvents).on("click", clickEvents);
			
			_dropDownLeft = _dropDownLeft + 350;
		}

		bindAllEvent();	
		updateOrder();
	}
	
	function bindAllEvent()
	{
		for(var i=0; i<2; i++)
		{
			$('#dropDown_'+i).off("click", clickEvents).on("click", clickEvents);	
		}
		$('#confirmBtn').css('cursor', 'pointer').off('click', confirmOrder).on('click', confirmOrder);
		$('#viewOrderBtn').css('cursor', 'pointer').off('click', viewOrder).on('click', viewOrder);
	}
	
	function closePopup(e)
	{
		$('#orderPopup').hide();
		$('#orderPopupPatch').hide();
		$("#closeBtn").css('cursor', 'default').off('click', closePopup);
		if(_id == 1)
			showInitState();
	}
	
	function showInitState()
	{
		for(var i=0; i<2; i++)
		{
			$("#selectedText_"+i).attr('selected-id', 0).html(i == 0 ? modelData.pizzaObj.category[i]["title"] : modelData.pizzaObj.category[i]["size"][0]);
		}
		var _quant = document.getElementById("quantity");
		$(_quant).val(1);
		updateOrder();
	}
	
	function unbindAllEvent()
	{
		for(var i=0; i<2; i++)
		{
			$('#dropDown_'+i).css('cursor', 'default').off("click", clickEvents);	
		}
		$('#confirmBtn').css('cursor', 'default').off('click', confirmOrder);
		
		$('#quantity').css('background', 'rgb(255,255,255)').attr('disabled', true);
	}
	
	var _id;
	function confirmOrder(e)
	{
		console.clear();
		_id = 1;
		slideUpEvent();
		storeOrder();
		showDeliveryMsg(_id);
		//unbindAllEvent();
	}
	
	function slideUpEvent()
	{
		for(var i=0; i<2; i++)
		{
			$("#dropDownChildParent_"+i).slideUp("slow");
			var _cc = $("#dropDown_"+i).children()[0];
			$(_cc).css("background", "#0088C1");			
		}
		$("#closeBtn").css('cursor', 'pointer').off('click', closePopup).on('click', closePopup);
	}
	
	function viewOrder(e)
	{
		_id = 0;
		slideUpEvent();
		showDeliveryMsg(_id);
		//unbindAllEvent();
	}
	
	function storeOrder()
	{
		var orderObj = new Object();
		var _arr = [];
		for(var i=0; i<2; i++)
		{
			_arr[i] = $("#selectedText_"+i).attr('selected-id')*1;
		}
		var _quantity = document.getElementById("quantity");
		var _price = modelData.pizzaObj.category[_arr[0]]["prize"][_arr[1]];
		
		var _totalPrice = Number(_price) * Number(_quantity.value);
		
		orderObj.itemName = modelData.pizzaObj.category[_arr[0]]["title"];
		orderObj.size = modelData.pizzaObj.category[_arr[0]]["size"][_arr[1]];
		orderObj.ingredients = modelData.pizzaObj.category[_arr[0]]["ingredients"];
		orderObj.price = _price;
		orderObj.quantity = _quantity.value;
		orderObj.totalPrice = _totalPrice;
		orderObj.type = modelData.pizzaObj.category[_arr[0]]["type"];
		
		console.log("orderObj:: ", orderObj)
	}
	
	function showDeliveryMsg(id)
	{
		$("#orderMsg").hide();
		$("#deliveryMsg").hide();
		if(id == 1)
		{
			$("#deliveryMsg").show();
			$("#deliveryMsg").html('Your order will be delivered in 45 minutes.');
		}
		else
		{
			$("#orderMsg").show();
			var _arr = [];
			for(var i=0; i<2; i++)
			{
				_arr[i] = $("#selectedText_"+i).attr('selected-id')*1;
			}
			var _quantity = document.getElementById("quantity");
			var _price = modelData.pizzaObj.category[_arr[0]]["prize"][_arr[1]];
			
			var _totalPrice = Number(_price) * Number(_quantity.value);
			
			//console.info(_arr, document.getElementById("quantity").value);
			$("#orderMsg").html('<p class="p_css" style="margin-top: 20px;">Your order is:</p><p class="com_marginP"><b>Item Name:</b> '+modelData.pizzaObj.category[_arr[0]]["title"]+'</p><p class="com_marginP"><b>Ingredients:</b> '+modelData.pizzaObj.category[_arr[0]]["ingredients"]+'</p><p class="com_marginP"><b>Size:</b> '+modelData.pizzaObj.category[_arr[0]]["size"][_arr[1]]+'</p><p class="com_marginP"><b>Price:</b> Rs. '+modelData.pizzaObj.category[_arr[0]]["prize"][_arr[1]]+'</p><p class="com_marginP"><b>Type: </b>'+modelData.pizzaObj.category[_arr[0]]["type"]+'</p><p class="com_marginP"><b>Quantity: </b>'+_quantity.value+'</p><p class="com_marginP"><b>Total Price: </b>Rs. '+_totalPrice+'</p>');
		}
		$("#orderPopup").show();
		$("#orderPopupPatch").show();
	}
	
	function checkLoginDetails(e)
	{
		var _uname = document.getElementById("u_name");
		var _pwd = document.getElementById("pwd");
		
		//console.log(_uname.value, _pwd.value)
		if(_uname.value === 'vishal' && _pwd.value === '123456')
		{
			$('#loginPageWrapper').hide();
			$('#menuPageWrapper').show();
			$('#loginMsg').hide();			
		}
		else
		{
			$(_uname).val('');
			$(_pwd).val('');
			$('#loginMsg').html('Please enter correct username and password.');
			$('#loginMsg').show();
		}
	}
	
	function clickEvents(e)
	{	
		var _firstTarget = $(this).children()[0];
		//console.info(_firstTarget)
		if($(this).hasClass("closeDropDown"))
		{
			for(var j=0; j<5; j++)
			{	
				if($("#dropDown_"+j).hasClass("openDropDown"))
				{
					$("#dropDownChildParent_"+j).slideUp("slow", function(){});
					$("#dropDown_0").removeClass("openDropDown");
					$("#dropDown_0").addClass("closeDropDown");
					var _cc = $("#dropDown_"+j).children()[0];
					$(_cc).css("background", "#0088C1");
				}
			}
			
			$(_firstTarget).css("background", "rgb(255, 131, 0)");
			$("#dropDownChildParent_"+$(this)[0].id.split("_")[1]).slideDown("slow");
		//	$(_secondTarget).slideToggle( "slow" );
			$(this).removeClass("closeDropDown");
			$(this).addClass("openDropDown");
			
			bindEvent($("#dropDownChildParent_"+$(this)[0].id.split("_")[1]));
		}
		else
		{
		//	$(this).children().slideUp("slow");
			$(_firstTarget).css("background", "#0088C1");
			$("#dropDownChildParent_"+$(this)[0].id.split("_")[1]).slideUp("slow");
		//	$(_secondTarget).slideToggle( "slow" );
			$(this).removeClass("openDropDown");
			$(this).addClass("closeDropDown");
			
			unbindEvent($("#dropDownChildParent_"+$(this)[0].id.split("_")[1]));
		}
	}
	
	function unbindEvent(_target)
	{
		$(_target).children().children().off("click", selectEvent);
	}
	
	function bindEvent(_target)
	{
		$(_target).children().children().off("click", selectEvent).on("click", selectEvent);
		$(_target).children().children().off("mouseenter mouseleave", mouseEvent).on("mouseenter mouseleave", mouseEvent);
	}
	
	function selectEvent(e)
	{
		var _parent = $(e.target).parent().parent();
		var _textVal = $(e.target).html();
		
		//console.log($(e.target), $($(e.target)[0]).attr('data-id')*1)
		
		//_selectArr[$(_parent)[0].id.split("_")[1]] = 1;
		//console.log(_selectArr)
		
		var _newTarget = $("#dropDown_"+$(_parent)[0].id.split("_")[1]).children()[1];
		$(_newTarget).html(_textVal).attr('selected-id', $($(e.target)[0]).attr('data-id')*1);
		
		//var _p = $(e.target).parent().parent();
		$(_parent).slideUp("slow");
		var _c = $("#dropDown_"+$(_parent)[0].id.split("_")[1]).children()[0];
		$(_c).css("background","#0088C1");
		$("#dropDown_"+$(_parent)[0].id.split("_")[1]).removeClass("openDropDown");
		$("#dropDown_"+$(_parent)[0].id.split("_")[1]).addClass("closeDropDown");
		
		updateOrder();
	}
	
	function updateOrder()
	{
		var _arr = [];
		for(var i=0; i<2; i++)
		{
			_arr[i] = $("#selectedText_"+i).attr('selected-id')*1;
		}
		var _quantity = document.getElementById("quantity");
		var _price = modelData.pizzaObj.category[_arr[0]]["prize"][_arr[1]];
		
		var _totalPrice = Number(_price) * Number(_quantity.value);
		
		//console.info(_arr, document.getElementById("quantity").value);
		$('#orderDetail').html('<p class="p_css">Your order is:</p><p class="com_marginP"><b>Item Name:</b> '+modelData.pizzaObj.category[_arr[0]]["title"]+'</p><p class="com_marginP"><b>Ingredients:</b> '+modelData.pizzaObj.category[_arr[0]]["ingredients"]+'</p><p class="com_marginP"><b>Size:</b> '+modelData.pizzaObj.category[_arr[0]]["size"][_arr[1]]+'</p><p class="com_marginP"><b>Price:</b> Rs. '+modelData.pizzaObj.category[_arr[0]]["prize"][_arr[1]]+'</p><p class="com_marginP"><b>Type: </b>'+modelData.pizzaObj.category[_arr[0]]["type"]+'</p>');
	}	
	
	function mouseEvent(e)
	{
		if(e.type == "mouseenter")
		{
			$(e.target).css("background", "#FBD476");
		}
		else
		{
			$(e.target).css("background", "#FBE9BD");
		}
	}
}
	