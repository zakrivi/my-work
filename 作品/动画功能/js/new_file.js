window.onload = function() {
	var ali = document.getElementsByTagName("li");
	for (var i=0; i<ali.length; i++) {
		ali[i].onmouseover = function() {
			startMove(this,"width", 200, function() {
				startMove(this, "height", 300);
			} );
		}
		ali[i].onmouseout = function() {
			startMove(this, "width", 100, function() {
				startMove(this, "height", 200);
			} );
		}
//		ali[i].alpha = 30;
//		ali[i].onmouseover = function() {
//			startMove(this,"opacity", 100);
//		}
//		ali[i].onmouseout = function() {
//			startMove(this, "opacity", 30);
//		}
	}
}

function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, attr, iTarget, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var icur =0;
		if (attr == "opacity") {
			icur = Math.round(parseFloat(getStyle(obj, attr))*100);
		} else {
			icur = parseInt(getStyle(obj, attr));
		}
		var speed = ( iTarget - icur)/10;
		speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
		if (icur == iTarget) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		} else {
			if (attr == "opacity") {
				obj.style.filter = "alpha(opacity:" +(icur + speed )+ ")";
				obj.style[attr] = (icur + speed)/100;
			} else {
				obj.style[attr] = icur + speed + "px";
			}
		}
	}, 30);
}
