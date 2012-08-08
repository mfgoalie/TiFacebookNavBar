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
	
	var viewLabel = Ti.UI.createLabel({
		text:'User ID: '+obj.user.id,
		color:'#959595'
	});
	
	self.add(viewLabel);
	
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