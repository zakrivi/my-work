/*function styleHeaderSiblings(){
	if (!document.getElementsByTagName) return false;
	var headers = document.getElementsByTagName("h1");
	alert(headers.length);
	var elem;
	for (var i=0; i<headers.length; i++){
		elem = getNextElement(headers[i].nextSibling);
		addClass(elem,"intro");
	}
}*/

//添加多个函数到window。onload
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func();
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

//检索tag标签，然后对其添加className
function styleHeaderSiblings(tag, theclass) {
	if (!document.getElementsByTagName) return false;
	var elems = document.getElementsByTagName(tag);
	var elem;
	for (var i = 0; i < elems.length; i++) {
		elem = getNextElement(elems[i].nextSibling);
		addClass(elem, theclass);
	}
}

//鉴定是否是元素节点，不是就下一个兄弟元素，循环 。。。。而不是非元素节点。
function getNextElement(node) {
	if (node.nodeType === 1) return node;
	if (node.nextSibling) return getNextElement(node.nextSibling);
	return null;
}
//根据元素本身是否有className，选择直接替换或者追加
function addClass(element, value) {
	if (!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName += " ";
		newClSSName += value;
		element.className = new ClssName;
	}
}

//addLoadEvent(styleHeaderSiblings);
addLoadEvent(function() {
	styleHeaderSiblings("h1", "intro");
});