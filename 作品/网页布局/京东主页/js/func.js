var Carousel = function(cls, W, num) {
	var i = 0;
	$(cls).find("i:eq(0)").css("background-color", "#B1191A");
	
	//搞了很久才解决计时器问题，，，额，多看看
	var aArray = [];
	function aa() {
		aa.timers = setInterval(dir, 2000);
	}
	aa();
	aArray.push(aa.timers)
	$(cls).hover(function() {
		for(var d = 0; d < aArray.length; d++) {
			clearInterval(aa.timers);
		}
		$(this).find("span").show()
	}, function() {
		for(var d = 0; d < aArray.length; d++) {
			aa();
		}
		$(this).find("span").hide()
	})
	/*var aArray = [];
	
	var timers =function(){
		setInterval(dir, 1000);
	} 
	
	timers();
	aArray.push(timers)
	$(cls).hover(function() {
		for(var d = 0; d < aArray.length; d++) {
			clearInterval(aArray[d]);
			console.log(aArray[d])
		}
	}, function() {
		for(var d = 0; d < aArray.length; d++) {
			timers();
			
		}
	})*/
	.find("span").first().click(function() {
			dir("left");
		})
		.siblings("span").click(function() {
			dir("right");
		})
	for(var a = 0; a < num; a++) {
		$(cls).find("i").click(function() {
			i = $(this).index();
			page($(this).index());
		})
	}

	function dir(e) {
		if(e == "left") {
			i--;
			if(i < 0) {
				i = num - 1;
			}
		} else if(e == "right" || e == "" || e == undefined) {
			i++;
			if(i > num - 1) {
				i = 0;
			}
		}
		page(i);
	}

	function page(i) {
		if(!$(cls).find("div").is(":animated")) {
			$(cls).find("div").animate({
					left: -W * i
				}, 500)
				.siblings("p").children("i:eq(" + i + ")").css("background-color", "#B1191A")
				.siblings().css("background-color", "#333");
		}
	}

}