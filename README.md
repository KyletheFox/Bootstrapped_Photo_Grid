#Bootstrapped Photo Grid#
*Welcome to my Bootstrapped Photo Grid*

**About:**
This program creates an awesome photo grid effect that can be easily added to your website. The program uses jQuery and javascript to dynamically create a bootstrap container based off of the settings.json file and apply animations to each item inside the container. It produces an attractive photo grid with a collection of images located inside your website.

<center>![Bootstrapped Photo Grid](http://kyle-oneill.com/markdownBootstrap.gif) </center>

**Warnings:**
The Bootsrapped Photo Grid can be resource heavy with a lot of large images. I recommend keeping all the images to the smallest size possible. This helps keeps program running lean and fast.  

**Tutorial:**
This is a very simple effect to use. All you need to do is pass a div selector to the function and you are good to go

The function call is:

		generateGrid($(".picture-grid-div-here"));

Whatever selector that is passed as an argument MUST have a defined width or height. The Javascript uses the height and width of the selector and creates the grid based on those parameters. If the div does NOT have sizes then nothing will be displayed.

Two depencecies of this project is Bootstrap and jQuery. These must be somehow referenced in the project.

	<!-- jQuery -->
	https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
	http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js

	<!-- Bootstrap -->
	http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css
	http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js

Also, don't forget to add your links to your page as well.

	<link rel="stylesheet" type="text/css" href="css/Grid-Generator.css">
	<script type="text/javascript" src="js/Grid-Generator.js"></script>
	

I included a settings.json file in my app to change how the grid works.

	{
		"cols": [ 4, 6, 12, 18 ],
		"fadeInSpeed": 2000,
		"fadeOutSpeed": 2000,
		"minAnimationTime": 2000,
		"maxAnimationTime": 7000,
		
		"pictures": [
			"img/..."
		]
	}

The first object "cols" holds the number columns that will be displayed on the photo grid. The four values inside represent the four different bootstrap grid sizes i.e. (col-sm-\*, col-md-\*, etc.). The first index holds the number of columns to be displayed when the col-xs is displayed. This goes up to the last index which is displayed at col-lg.

"fadeInSpeed" and "fadeOutSpeed" represent the time it takes for the picture animation to fade in or out. These values are in milliseconds (ms).

"minAnimationTime" and "maxAnimationTime" like the previous two are in milliseconds (ms) as well. These values represent the smallest and largest possible time intervals between animation. For each block on the grid a specific time interval is randomly generated between the min and max times. 

**Important:** The "minAnimationTime" value also currently is minimum amount of time to for the animations to start once the page loads up. i.e. 5000 would mean that it would take at least 5 seconds for the first animation to start. 

"pictures" holds the locations of all the images that will go into the photo grid. All of these must be typed in ( I know, it's a pain ). To have the picture be displayed it must be referenced in this array.

And that's about it. So enjoy!

Written with [StackEdit](https://stackedit.io/).