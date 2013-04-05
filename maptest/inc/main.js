console.log("loaded");

// B1C6M2 redone with CSS3 and jQuery
// by Russ 14/3/13

$(document).ready(function() {

	currentLayer = 1;
	lastLayer = 1;

	// teaser anim

	$("#layer2").addClass("animateScale");
	setTimeout(function() {
		$("#layer2").removeClass("animateScale").addClass("animateCabin");
	},2000);

	$("#book").bind("mouseenter touchstart", function() {
		$("#book").addClass("bookanimate");
	}, function() {
		$("#book").removeClass("bookanimate");
	});

	// zoom

	$("#container").dblclick(function() {
		console.log("zoom - "+currentLayer+", "+lastLayer);

		if (currentLayer == 1 && lastLayer == 1) {
        	$("#layer2").addClass("zoom1to2");
        	console.log("1 to 2");
        	currentLayer = 2;
        	lastLayer = 1;
    	} else if (currentLayer == 2 && lastLayer == 1) {
    		$("#layer2").removeClass("zoom1to2").addClass("zoom2to3");
    		console.log("2 to 3");
        	currentLayer = 3;
        	lastLayer = 2;
    	} else if (currentLayer == 3 && lastLayer == 2) {
    		$("#layer2").removeClass("zoom2to3").addClass("zoom3to2");
    		console.log("3 to 2");
        	currentLayer = 2;
        	lastLayer = 3;
    	} else if (currentLayer == 2 && lastLayer == 3) {
    		$("#layer2").removeClass("zoom3to2").addClass("zoom2to1");
    		console.log("2 to 1");
        	currentLayer = 1;
        	lastLayer = 2;

    	} else if (currentLayer == 1 && lastLayer == 2) {
    		$("#layer2").removeClass("zoom2to1").addClass("zoom1to2");
    		console.log("1 to 2");
        	currentLayer = 1;
        	lastLayer = 1;	
    	}
    });

	// pinch zoom - using quo $$

	$$("#container").pinch(function() {
		console.log("zoom - "+currentLayer+", "+lastLayer);

		if (currentLayer == 1 && lastLayer == 1) {
        	$("#layer2").addClass("zoom1to2");
        	console.log("1 to 2");
        	currentLayer = 2;
        	lastLayer = 1;
    	} else if (currentLayer == 2 && lastLayer == 1) {
    		$("#layer2").removeClass("zoom1to2").addClass("zoom2to3");
    		console.log("2 to 3");
        	currentLayer = 3;
        	lastLayer = 2;
    	} else if (currentLayer == 3 && lastLayer == 2) {
    		$("#layer2").removeClass("zoom2to3").addClass("zoom3to2");
    		console.log("3 to 2");
        	currentLayer = 2;
        	lastLayer = 3;
    	} else if (currentLayer == 2 && lastLayer == 3) {
    		$("#layer2").removeClass("zoom3to2").addClass("zoom2to1");
    		console.log("2 to 1");
        	currentLayer = 1;
        	lastLayer = 2;

    	} else if (currentLayer == 1 && lastLayer == 2) {
    		$("#layer2").removeClass("zoom2to1").addClass("zoom1to2");
    		console.log("1 to 2");
        	currentLayer = 1;
        	lastLayer = 1;	
    	}
    });

	// panning / parallax on mouseover

	$('#container').mousemove(function(e){
			/* work out mouse position */
			var offset = $(this).offset();
			var xPos = e.pageX - offset.left;
			var yPos = e.pageY - offset.top;

			/* get percentage positions */
			var mouseXPercent = Math.round(xPos / $(this).width() * 100);
			var mouseYPercent = Math.round(yPos / $(this).height() * 100);
			//$("#status").html("X: "+mouseXPercent+", Y: "+mouseYPercent);
			// position each layer
			$(this).children(".parallax").each(function(){
					var diffX = $("#container").width() - 1220;
					var diffY = $("#container").height() - 0;
					var myX = diffX * (mouseXPercent / 100);
					var myY = diffY * (mouseYPercent / 100);
					var cssObj = {'left': myX + 'px'}
					$(this).animate({left: myX-40},{duration: 50, queue: false, easing: 'linear'});
				}
			);

		}
	);

	// panning / parallax on tablet tilt

	window.ondeviceorientation = function(e){
	    gamma = Math.round(e.gamma);    
	    beta = Math.round(e.beta); 
	    // x gamma = + or - 80 rather than pixel width
	    var mouseXPercent = Math.round(((gamma+80)*8) / $('#container').width() * 100);
		var mouseYPercent = Math.round(((beta+80)/100) / $('#container').height() * 100);
		$("#status").html("X: "+mouseXPercent+", Y: "+mouseYPercent);

		$('#container').children(".parallax").each(function(){

				var diffX = $("#container").width() - 1220;
				var diffY = $("#container").height() - 0;
				var myX = diffX * (mouseXPercent / 100); //) / 100) / 2;
				var myY = diffY * (mouseYPercent / 100);

				var cssObj = { 'left': myX + 'px'}
				$(this).animate({left: myX-40},{duration: 50, queue: false, easing: 'linear'});
		});
	};
});
