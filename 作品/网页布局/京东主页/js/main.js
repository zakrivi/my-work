$(".headLeft").mouseover(function() {
	$(this).css({
		"background-color": "#fff"
	});
	$(".headLeft-div").show();
})

$(".headLeft").mouseout(function() {
	$(this).css("background-color", "#f1f1f1")
	$(".headLeft-div").hide();
})

$(".headLeft-div").find("a").click(function() {
	$(".headLeft span:first").text($(this).text());
	$(this).css({
			"background-color": "#C81623",
			"color": "#fff"
		})
		.parent().siblings().children("a").css({
			"background-color": "#fff",
			"color": "#666"
		});

})
$(".headLeft-div").find("a").mouseover(function() {
	if($(this).css("background-color") == "rgb(255, 255, 255)") {
		$(this).css({
			"background-color": "#eee",
			"color": "#B1191A"
		})
	}
}).mouseout(function() {

	if($(this).css("background-color") == "rgb(200, 22, 35)") {
		$(this).css({
			"background-color": "#C81623",
			"color": "#fff"
		})
	} else {
		$(this).css({
			"background-color": "#fff",
			"color": "#666"
		})
	}
})

$(".myJingdong").mouseover(function() {
	$(".myJingdong-1").show()
})
$(".myJingdong").mouseout(function() {
	$(".myJingdong-1").hide()
})


//轮播
$(function() {
	Carousel(".Carousel", 730, 6);
	Carousel(".F1C", 439, 4);
	Carousel(".F2C", 439, 4);
	Carousel(".F3C", 439, 4);
	Carousel(".F4C", 439, 4);
	Carousel(".F5C", 439, 4);
	Carousel(".today", 1004, 3);
})