function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
} //增加addLoadEvent函数，进行合并多个函数到window.onload里，达到多个函数在文档加载完后同时进行
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChld(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function preparePlaceholder() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "../img/placeholder.gif");
	placeholder.setAttribute("alt", "fmy image gallery");
	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	/*document.getElementsByTagName("body")[0].appendChild(placeholder);//document.body.appendChild();
	document.getElementsByTagName("body")[0].appendChild(description);//document.body.appendChild();*/
	var gallery = document.getElementById("imagegallery");
	//gallery.parentNode.insertBefore(placeholder,gallery);这两个是选择在某元素之前的。
	//gallery.parentNode.insertBefore(description,gallery);
	insertAfter(placeholder, gallery);
	insertAfter(description, placeholder);
}

function prepareGallery() {
	if (!document.getElementById || !document.getElementsByTagName) return false;
	if (!document.getElementById("imagegallery")) return false; //函数：检查浏览器是否支持该函数以及是否有该ID元素。
	var gallery = document.getElementById("imagegallery"); //创建局部变量，用于存储该ID的元素节点
	var links = gallery.getElementsByTagName("a"); //创建局部变量，用于存储gallery里的a节点
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
				return !showPic(this); //return showPic(this)?false:true;
			}
			/*links[i].onkeypress = function() {
				return !showPic(this);
			}*/ //控制键盘代替鼠标，tab可以切换链接，空格键等价于点击，回车键貌似等于onclick（如果没有函数则会默认行为）
	} //遍历所有的a元素，进行套用函数，实现功能
}

function showPic(whichpic) {
	if (!document.getElementById("placeholder")) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	if (placeholder.nodeName != "IMG") {
		return false;
	}
	placeholder.setAttribute("src", source); //placeholder.src=source;	
	if (document.getElementById("description")) {
		if (whichpic.getAttribute("title")) {
			var text = whichpic.getAttribute("title");
		} else {
			var text = "";
		} // var text = whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
		var description = document.getElementById("description");
		if (description.firstChild.nodeType == 3) {
			description.firstChild.nodeValue = text; //经过上面的取值赋值后，在这里进行新的赋值。
		}
	}
	return true;
}

addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);

/*	function countBodyChildren()
	{
		var body_element= document.getElementsByTagName("h1")[0];//为什么是0，其他数字或者删除都不行？？？
		//alert(typeof body_element);
		//var asd=["asfas","asfsa"];
		//alert(typeof asd);
		alert(body_element.nodeType);//可以把上面的【0】转移到body_element的后面。不写又不行。。
	}
window.onload = countBodyChildren;*/