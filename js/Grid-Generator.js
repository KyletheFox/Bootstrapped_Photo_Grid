function generateGrid(attachTo) {

	var attachDiv = attachTo;	// Selector to attach phot-grid too
	var setupJson;				// Set up info on how to build grid
	var colIndex;				// Determins number of columns to display
	
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
		dimentions = ($(attachDiv)[0].clientWidth / setupJson.cols[colIndex]);		

		// Determines the number of rows needed to fill screen
		rowsToPrint = Math.ceil($(attachDiv)[0].clientHeight/dimentions);

		// Gets the number of pictures loaded in from settings.json
		numberOfPics = setupJson.pictures.length;
		// ---------------------------------------

		// ----- Creating HTML ------
		DOMinsert(setupJson, rowsToPrint, numberOfPics, dimentions, colIndex, attachDiv);
		// --------------------------

	});	// end $.getJson
}

// Creates HTML to display the grid
function DOMinsert(setupJson, rowsToPrint, numberOfPics, dimentions, colIndex, attachDiv) {
	
	var returnStr = "";		// The string to attach
	var num = 0;			// Counter for number of pictures added

	// Creates header for the bootstrap container for the photo-grid
	$(attachDiv).append('<div id="photo-grid-container" class="container-fluid">');

	// Loop to create HTML String to insert
	for (var j = 0; j < rowsToPrint; j++) {

		returnStr += '<div class="row">';
		returnStr += '<div class="block-row col-xs-12 col-sm-12 col-md-12 col-lg-12">';

		for (var i = 0; i < setupJson.cols[colIndex]; i++) {
			
			// Random index picture for background
			var randomNum = Math.floor(Math.random() * numberOfPics);			
			returnStr += '<div class="block pic-' +  num + 
				'" id="row-' + j + '-col-' + i + 
				'"class="block" style="height: ' + dimentions + 
				'px; width: ' + dimentions + 
				'px; background-image: url(' + setupJson.pictures[randomNum] +
				');"></div>';
			num++;
		
		}	// end inner for loop

		returnStr += '</div>';
		returnStr += '</div>';

	} //end outer for loop

	// Adds HTML to the DOM
	$("#photo-grid-container").append(returnStr);
	
	// Footer for bootstrap photo-grid container
	$(attachDiv).append('</div>');
	
	// Starts the animaton effects
	startAnimation(setupJson, rowsToPrint, numberOfPics, colIndex);
}

// Starts the picture animations
function startAnimation(setupJson, rowsToPrint, numberOfPics, colIndex) {
		
		var blockID;	// Unique Block Indentifier
		var time;		// Intervals for animation

		// Attaches animations to each of the photo-grid blocks
		for (var i = 0; i < setupJson.cols[colIndex] * rowsToPrint; i++) {
			
			time = (Math.random() * setupJson.maxAnimationTime) + setupJson.minAnimationTime;
			blockID = '.pic-' + i;
			animation(time, blockID, setupJson);
		
		}
}

// Sets the animation effect to a specific photo block
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

	return index;
}