//addLoadEvent函数
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func();
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
//时间移动
function moveElement(elementID,final_x,final_y,interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y) return true;
	if (xpos < final_x) xpos++;
	if (xpos > final_x) xpos--;
	if (ypos < final_y) ypos++;
	if (ypos > final_y) ypos--;
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement(\'"+elementID+"\'," +final_x+ "," +final_y+ "," +interval+ ")";
	movement = setTimeout(repeat,interval);
}

function positionMessage() {
	if (!document.getElementById) return false;
	if (!document.getElementById("message")) return false;
	var elem = document.getElementById("message");
	elem.style.position = "absolute";
	elem.style.left = "50px";
	elem.style.top = "50px";
	moveElement("message",200,250,50);	
	var elem = document.getElementById("message2");
	elem.style.position = "absolute";
	elem.style.left = "50px";
	elem.style.top = "100px";
	moveElement("message2",125,25,50);
}
addLoadEvent(positionMessage);
//addLoadEvent(moveMessage);