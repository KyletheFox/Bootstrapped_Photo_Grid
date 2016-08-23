function startAnimation(id) {
		// console.log(id);
		var time = (Math.random() * 15000) + 3000;
		animation(time, id);
}

function animation(time, id) {
	var anime = setInterval(function() {
			var imgIndex = Math.floor(Math.random()*imageSources.length);
			$(id).fadeOut(2000, function() {
				$(id).attr("src",imageSources[imgIndex]);
				$(id).fadeIn(2000);
				clearInterval(this);
			});
			
	}, time);
}