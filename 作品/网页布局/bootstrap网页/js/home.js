function moveElement(elementID, final_x, final_y, interval) {
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if(elem.movement) {
		clearTimeout(elem.movement);
	}
	if(!elem.style.left) {
		elem.style.left = "0px";
	}
	if(!elem.style.top) {
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if(xpos == final_x && ypos == final_y) {
		return true;
	}
	if(xpos < final_x) {
		var dist = Math.ceil((final_x - xpos) / 30);
		xpos += dist;
	}
	if(xpos > final_x) {
		var dist = Math.ceil((xpos - final_x) / 30);
		xpos -= dist;
	}
	if(ypos < final_y) {
		var dist = Math.ceil((final_y - ypos) / 30);
		ypos += dist;
	}
	if(ypos > final_y) {
		var dist = Math.ceil((ypos - final_y) / 30);
		ypos -= dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	//console.log(elem.style.left);
	//console.log(elem.offsetLeft);
	var repeat = "moveElement(\'" + elementID + "\'," + final_x + "," + final_y + "," + interval + ")";
	elem.movement = setTimeout(repeat, interval);
}

function moveImg() {
	//if(!document.getElementById) return false;
	//if(!document.getElementsByTagName) return false;
	var div1 = document.createElement("div");
	div1.setAttribute("id", "wrapimg");
	var img1 = document.createElement("img");
	img1.setAttribute("id", "img1");
	img1.setAttribute("src", "../img/pic.jpg");
	img1.setAttribute("alt", "cant look is better");
	var con = document.getElementById("content");
	div1.appendChild(img1);
	con.appendChild(div1);
	//var content = document.getElementById("content");
	//var links = content.getElementsByTagName("a");
	document.getElementById("img1").style.left=-200+"px";
	document.getElementById("img1").style.top=-20+"px";
	
	//console.log(document.getElementById("img1").style.left);
	//moveElement("movepic", -600, 0, 1000);
	/*for(i = 0; i < links.length; i++) {
		links[i].onmouseover = function() {
			//if(i==0) {
				moveElement("movepic", -200, 0, 1);
				alert(document.getElementById("movepic").style.left)*/
			//}
			/*if(i==1) {
				moveElement("movepic", -400, 0, 1);
			}
			if(i==2) {
				moveElement("movepic", -600, 0, 1);
			}
			if(i==4) {
				moveElement("movepiv", -800, 0, 1);
			}*/
		}
	//}
//}

addLoadEvent(moveImg);