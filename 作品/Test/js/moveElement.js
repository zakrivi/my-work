//时间移动
function moveElement(elementID,final_x,final_y,interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if (elem.movement) clearTimeout(elem.movement);
	if (!elem.style.left) elem.style.left = "0px";
	if (!elem.style.top) elem.style.top = "0px";
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	var dlist = 0;
	if (xpos == final_x && ypos == final_y) return true;
	if (xpos < final_x) {dist = Math.ceil((final_x-xpos)/10);xpos+=dist;}//添加的dist是不一1px移动，根据距离的十分之一来移动；
	if (xpos > final_x) {dist = Math.ceil((xpos-final_x)/10);xpos-=dist;}//然后十分之一，随着距离变近，速度变慢，看起来更平滑迅速。
	if (ypos < final_y) {dist = Math.ceil((final_y-ypos)/10);ypos+=dist;}
	if (ypos > final_y) {dist = Math.ceil((ypos-final_y)/10);ypos-=dist;}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement(\'"+elementID+"\'," +final_x+ "," +final_y+ "," +interval+ ")";
	elem.movement = setTimeout(repeat,interval);
}