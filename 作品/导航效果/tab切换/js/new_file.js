var a = document.getElementById("tit");
var aa = a.getElementsByTagName("li");
var b = document.getElementById("mod");
var bb = b.getElementsByTagName("div");
window.onload = function changetit() {
	for (var i = 0; i < aa.length; i++) {
		aa[i].id = i;
		aa[i].onmouseover = function() {
			for (var j = 0; j < aa.length; j++) {
				aa[j].className = "";
				bb[j].className = "two";
			}
			this.className = "one";
			bb[this.id].className = "";
		}
	}
}