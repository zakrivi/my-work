document.body.onload = function() {
	var works = document.getElementById("works")
	var lis = works.getElementsByTagName("li");
	var dls = works.getElementsByTagName("dl");
	var aArray = [];
	for(var i = 0; i < lis.length; i++) {

		var as = lis[i].children;
		for(var j = 0; j < as.length; j++) {
			if(as[j].nodeName == "A") {
				aArray[i] = as[j];
			} else {
				continue;
			}
		}
		
		var dlAs=dls[i].getElementsByTagName("a");
		for(var aa=0;aa<dlAs.length;aa++)
		{
			dlAs[aa].setAttribute("target","_blank")
		}
		
		aArray[i].i = i;
		aArray[i].onclick = function() {
			if(getStyle(dls[this.i], "display") == "none") {
				for(var n = 0; n < dls.length; n++) {
					dls[n].style.display = "none";
				}
				dls[this.i].style.display = "block";
			} else {
				dls[this.i].style.display = "none";
			}
		}
	}
}

function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr]; //针对IE浏览器
	} else {
		return window.getComputedStyle(obj, null)[attr]; //针对火狐等其他浏览器
	}
}