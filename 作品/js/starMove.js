function startMove(obj, json, fn) {
	clearInterval(obj.timer);
	var flag = true;
	obj.timer = setInterval(function() {
		flag = true;
		for (var attr in json) {
			if (attr == "opacity") {
				var objArr = Math.round(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				var objArr = parseInt(getStyle(obj, attr));
			}
			obj.speed = (json[attr] - objArr) / 8;
			obj.speed = obj.speed > 0 ? Math.ceil(obj.speed) : Math.floor(obj.speed);
			/*if (objArr > json[attr]) {
											obj.speed = (json[attr] - objArr) / 10;
										} else if (objArr < Itaget) {
											obj.speed = (json[attr] - objArr) / 10;
										}*/

			if (objArr != json[attr]) {
				flag = false;
			}
			if (attr == "opacity") {
				obj.style.filter = "alpha(opacity=" + (objArr + obj.speed) + ")";
				obj.style.opacity = (objArr + obj.speed) / 100;
			} else {
				obj.style[attr] = objArr + obj.speed + "px"; //不要用style.attr写，这样会被识别为attr属性，所以之前一直不对
			}

		}
		if (flag) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}

	}, 30)

}