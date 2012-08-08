// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');

var globals = {};
	globals.platform = {
		height: Ti.Platform.displayCaps.platformHeight,
		width: Ti.Platform.displayCaps.platformWidth
	};

(function(){
	//setting this array as blank when the app opens so I can add my views here when I open them.
	globals.open_views = [];
	globals.backgroundMenuShown = false;
	// Make new UserView available...
	globals.User = require('/ui/windows/user'); // this view starts with a left margin of 320
	 
	//Main window holding everything
	//Making this a global variable so I can (incase) access it from anywhere
	globals.win = Ti.UI.createWindow({
		backgroundColor:'#000',
		navBarHidden:true
	});
	
	//
	//  Background Menu
	//
	
	//The view for that background menu they have
	var backgroundMenuView = Ti.UI.createView({
		backgroundColor:'#888',
		height:Ti.UI.FILL,
		left:0,
		width:267,
		layout:'vertical'
	});
	//The background menu search bar for the table
	var backgroundMenuSearch = Ti.UI.createSearchBar({
		height:44,
		barColor:'#0B1324'
	});
	//The background menu sections they have
	var backgroundMenuSections = [
	    { title: 'User One', user:{id:1}, changeInitial:false },
	    { title: 'User Two', user:{id:2}, changeInitial:false },
	    { title: 'User 3 Change Initial', user:{id:3}, changeInitial:true },
	    { title: 'User 4 Change Initial', user:{id:4}, changeInitial:true }
	];
	
	//The table for all of the background menu options
	var backgroundTable = Ti.UI.createTableView({
		data: backgroundMenuSections,
		search: backgroundMenuSearch,
		seperatorColor:'#0B1324',
		backgroundColor:'545F75'
	});
	
	backgroundTable.addEventListener('click', function(e){
		if (e.row && e.row.user){
			if(!e.row.changeInitial){
				globals.open_views.push(
		       		globals.User.createUser({
				    	user:e.source.user
			   		})
			   );
			   globals.win.contentView.add(globals.open_views[globals.open_views.length-1]);
			   globals.win.contentView.animate({
					left:0,
					duration:300
				}, function(){
					globals.backgroundMenuShown = false;
				});
			} else {
				globals.win.contentView.remove(globals.win.baseView);
				globals.win.baseView = globals.User.createUser({
			    	user:e.source.user
		   		});
			   	globals.win.contentView.add(globals.win.baseView);
				globals.win.contentView.animate({
					left:0,
					duration:300
				}, function(){
					globals.backgroundMenuShown = false;
				});
			};
		};
	});
	//Adding the background menu to the window
	backgroundMenuView.add(backgroundTable);
	globals.win.add(backgroundMenuView);
	
	//
	//  Main Content View...area...
	//
	
	//making this a global variable so I can add new views to it wherever
	globals.win.contentView = Ti.UI.createView({
		backgroundColor:'#fff',
		top:0,
		height:Ti.UI.FILL,
		width:globals.platform.width
	});
	//The background view that is always there... so we can close the initial view at any time and add a new one.
	
	var backgroundView = Ti.UI.createView({
		backgroundColor:'#fff',
		height:Ti.UI.FILL,
		width:globals.platform.width,
		zIndex:1
	});
	
	//The initial view that we want to open. This view cannot be closed as it's the last view in the content area
	
	globals.win.baseView = Ti.UI.createView({
		backgroundColor:'#fff',
		height:Ti.UI.FILL,
		width:globals.platform.width,
		zIndex:2
	});
	
	var userButton = Ti.UI.createView({
		height:50,
		width:Ti.UI.SIZE,
		backgroundColor:'#ccc',
		user: {
			id:1
		}
	});
	
	var userButtonLabel = Ti.UI.createLabel({
		text:'User Button',
		width:Ti.UI.SIZE,
		left:10,
		right:10,
		user: {
			id:1
		}
	});
	
	userButton.add(userButtonLabel);
	globals.win.baseView.add(userButton);
	
	globals.win.contentView.add(backgroundView);
	globals.win.contentView.add(globals.win.baseView);
	globals.win.add(globals.win.contentView);
	
	userButton.addEventListener('click', function(e){
		   if(!e.source.user){
		   		return
		   };
		   globals.open_views.push(
	       		globals.User.createUser({
			    	user:e.source.user
		   		})
		   );
		   globals.win.contentView.add(globals.open_views[globals.open_views.length-1]);
	});
	
	//
	//  Fake NavBar
	//
	var navBarView = Ti.UI.createView({
		backgroundColor:'#3B5998',
		height:44,
		width:Ti.UI.FILL,
		top:0,
		zIndex: 1000 // How else would we make this stay on top of EVERYTHING
	});
	//add a center control view for some buttons that stay there...
	navBarView.controlView = Ti.UI.createView({
		height:37,
		width:120,
		backgroundColor:'#22355E',
		top:3,
	});
	//add a back button
	navBarView.backButton = Ti.UI.createView({
		height:37,
		width:44,
		backgroundColor:'#22355E',
		borderWidth:1,
		borderColor:'#0B1324',
		top:3,
		left:4,
		opacity:0
	});
	//add a MENU button
	navBarView.menuButton = Ti.UI.createView({
		height:37,
		width:44,
		backgroundColor:'#fff',
		borderWidth:1,
		borderColor:'#0B1324',
		top:3,
		left:4
	});
	//hide a back button
	//navBarView.backButton.hide();
	
	navBarView.backButton.addEventListener('click', function(){
		if (globals.open_views.length > 0){
			globals.open_views[globals.open_views.length-1].animate({
				left:globals.platform.width,
				duration:300
			}, function(){
				globals.win.contentView.remove(globals.open_views[globals.open_views.length-1]);
				globals.open_views.pop();
				globals.win.manageNavBackButton();
			})
		};
	});
	
	navBarView.menuButton.addEventListener('click', function(){
		if (globals.backgroundMenuShown == false){
			globals.win.contentView.animate({
				left:267,
				duration:300
			}, function(){
				globals.backgroundMenuShown = true;
			});
		 } else {
		 	globals.win.contentView.animate({
				left:0,
				duration:300
			}, function(){
				globals.backgroundMenuShown = false;
			});
		 };
	});
	//we don't need to see the back button at first
	navBarView.backButton.hide();
	
	navBarView.add(navBarView.backButton);
	navBarView.add(navBarView.menuButton);
	navBarView.add(navBarView.controlView)
	
	globals.win.contentView.add(navBarView);
	
	//
	// Manager Functions and other stuff...
	//
	
	globals.win.manageNavBackButton = function(){
        if (globals.open_views.length > 0){
            navBarView.menuButton.animate({
            	opacity:0,
            	duration:100
            }, function(){
            	navBarView.menuButton.hide();
            	navBarView.backButton.show();
            	navBarView.backButton.animate({
	            	opacity:1.0,
	            	duration:100
	            });
            });
    	} else {
            navBarView.backButton.animate({
            	opacity:0,
            	duration:100
            }, function(){
            	navBarView.backButton.hide();
            	navBarView.menuButton.show();
            	navBarView.menuButton.animate({
	            	opacity:1.0,
	            	duration:100
	            });
            });
    	}
	};
	
	globals.win.open();
	
})();

