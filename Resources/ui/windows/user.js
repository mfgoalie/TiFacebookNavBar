var createUser = function(obj){
	obj = obj || {};
	var self = Ti.UI.createView({
		top:44,
		height:globals.platform.height,
		width:globals.platform.width,
		backgroundColor:'#f5f5f5',
		left:obj.animateIn ? globals.platform.width-100 : 0,
		zIndex:3
	});
	
	var view_label = Ti.UI.createLabel({
		top:100,
		text:'User ID: '+obj.user.id,
		color:'#959595'
	});
	
	//Quick view memory test
	var start_size = 100;
	for (var i=0;i < 20;i++){
		var test_view = Ti.UI.createView({
			height:start_size,
			width:start_size,
			borderWidth:1,
			borderColor:'#777',
			backgroundColor:'#ddd'
		});
		
		start_size = start_size - 5;
		self.add(test_view);
	};
	
	self.add(view_label);
	
	self.animate({
		left:0,
		duration:300
		}, function(){
			//user view has loaded in
			globals.win.manageNavBackButton();
	});
	
	return self;
};

exports.createUser = createUser;