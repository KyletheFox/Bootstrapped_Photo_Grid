function generateGrid() {

	var setupJson;	// set up info on how to build grid
	var colIndex;
	
	// Loads settings json from server
	$.getJSON( "settings.json", function(data) {  
		
		// ------- Variables -----------------	
		setupJson = data;		// JSON returned back from settings.json
		var dimentions;			// Height and Width of Ball
		var rowsToPrint;		// Number of rows needed to fill entire page
		var numberOfPics;		// Total number of pics
		// ------------------------------------

		// -------- Logic ----------------------

		// Determines what bootstrapGrid size (col-xs-*, col-lg-*) is active
		// and returns the setupJson.cols index that should be used.
		colIndex = bootstrapGridSize(setupJson);
		
		// Gets the size of blocks that need to be created
		dimentions = ($(window).outerWidth() / setupJson.cols[colIndex]);		

		// Determines the number of rows needed to fill screen
		rowsToPrint = Math.ceil($(window).outerHeight()/dimentions);

		// Gets the number of pictures loaded in from settings.json
		numberOfPics = setupJson.pictures.length;
		// ---------------------------------------

		// ----- Creating HTML ------
		DOMinsert(setupJson, rowsToPrint, numberOfPics, dimentions, colIndex);
		// --------------------------

		// -------- Start Animations ---------
		//startAnimation(setupJson, rowsToPrint, numberOfPics);
		// -----------------------------------
	
	});	// end $.getJson
}

// Creates HTML to display the grid
function DOMinsert(setupJson, rowsToPrint, numberOfPics, dimentions, colIndex) {
	
	var returnStr = "";		// The string to attach
	var num = 0;

	console.log(colIndex);

	$("body").append('<div class="container-fluid">');

	for (var j = 0; j < rowsToPrint; j++) {

		returnStr += '<div class="row">';
		returnStr += '<div class="block-row col-xs-12 col-sm-12 col-md-12 col-lg-12">';

		for (var i = 0; i < setupJson.cols[colIndex]; i++) {
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
	
	startAnimation(setupJson, rowsToPrint, numberOfPics, colIndex);
}

// Starts the picture animations
function startAnimation(setupJson, rowsToPrint, numberOfPics, colIndex) {
		var blockID;	// Unique Block Indentifier
		var time;		// Intervals for animation

		console.log(setupJson.cols[colIndex]);

		for (var i = 0; i < setupJson.cols[colIndex] * rowsToPrint; i++) {
			time = (Math.random() * 15000) + 3000;
			blockID = '.pic-' + i;
			//console.log($(blockID));
			animation(time, blockID, setupJson);
		}
}

function animation(time, id, setupJson) {

	setInterval(function() {
		var imgIndex = Math.floor(Math.random()* setupJson.pictures.length);
		$(id).fadeOut(setupJson.fadeOutSpeed, function() {
			$(id).css("background-image", 'url("' + setupJson.pictures[imgIndex] + '")');
			$(id).fadeIn(setupJson.fadeInSpeed);
			//clearInterval(this);
		});
	}, time);
}

function bootstrapGridSize(setupJson) {
	// Returns index to setupJson.col after determining where col-xs, 
	// col-sm-*, etc. is active.

	var width = $(window).outerWidth();
	var index;

	if (width < 768) {
		index = 0;
	} else if (width >= 768 && width < 992) {
		index = 1;
	} else if (width >= 992 && width < 1200) {
		index = 2;
	} else {	// width >= 1200
		index = 3;
	}
	console.log(width);
	console.log(index);
	return index;
}