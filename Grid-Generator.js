function generateGrid() {

	var setupJson;	// set up info on how to build grid
	
	// Loads settings json from server
	$.getJSON( "settings.json", function(data) {  
		
		// ------- Variables -----------------	
		setupJson = data;		// JSON returned back from settings.json
		var dimentions;			// Height and Width of Ball
		var rowsToPrint;		// Number of rows needed to fill entire page
		var numberOfPics;		// Total number of pics
		// ------------------------------------

		// -------- Logic ----------------------

	
		// Gets the size of blocks that need to be created
		console.log($(document));
		dimentions = ($(window).outerWidth() / setupJson.cols);		

		// Determines the number of rows needed to fill screen
		rowsToPrint = Math.ceil($(window).outerHeight()/dimentions);

		// Gets the number of pictures loaded in from settings.json
		numberOfPics = setupJson.pictures.length;

		// ---------------------------------------

		// ----- Creating HTML ------
		DOMinsert(setupJson, rowsToPrint, numberOfPics, dimentions);
		// --------------------------

		// -------- Start Animations ---------
		//startAnimation(setupJson, rowsToPrint, numberOfPics);
		// -----------------------------------
	
	});	// end $.getJson
}

// Creates HTML to display the grid
function DOMinsert(setupJson, rowsToPrint, numberOfPics, dimentions) {
	
	var returnStr = "";		// The string to attach
	var num = 0;

	$("body").append('<div class="container-fluid">');

	for (var j = 0; j < rowsToPrint; j++) {

		returnStr += '<div class="row">';
		returnStr += '<div class="block-row col-xs-12 col-sm-12 col-md-12 col-lg-12">';

		for (var i = 0; i < setupJson.cols; i++) {
			// Random index picture for background
			var randomNum = Math.floor(Math.random() * numberOfPics);			
			returnStr += '<div class="block pic-' +  num + '" id="row-' + j + '-col-' + i + '"class="block" style="height: ' + dimentions + 'px; width: ' + dimentions + 'px; background-image: url(' + setupJson.pictures[randomNum] +');"></div>';
			num++;
		}	// end inner for loop

		returnStr += '</div>';
		returnStr += '</div>';

	} //end outer for loop

	$(".container-fluid").append(returnStr);
	$("body").append('</div>');
	console.log(rowsToPrint * setupJson.cols);
	startAnimation(setupJson, rowsToPrint, numberOfPics);
}

function startAnimation(setupJson, rowsToPrint, numberOfPics) {
		var blockID;	// Unique Block Indentifier
		var time;		// Intervals for animation

		console.log(rowsToPrint);

		for (var i = 0; i < setupJson.cols * rowsToPrint; i++) {
			time = (Math.random() * 15000) + 3000;
			blockID = '.pic-' + i;
			//console.log($(blockID));
			animation(time, blockID, setupJson);
		}
}

function animation(time, id, setupJson) {

	setInterval(function() {
		var imgIndex = Math.floor(Math.random()* setupJson.pictures.length);
		$(id).fadeOut(2000, function() {
			$(id).css("background-image", 'url("' + setupJson.pictures[imgIndex] + '")');
			$(id).fadeIn(2000);
			//clearInterval(this);
		});
	}, time);
}

function callBlock() {
	console.log($(".block"));
}