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

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.parentNode.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function addClass(element, value) {
	if (!element.className) {
		element.className = value;
	} else {
		var newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}

function highlightPage() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var headers = document.getElementsByTagName("header");
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName("nav");
	if (navs.length == 0) return false;
	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	for (var i = 0; i < links.length; i++) {
		linkurl = links[i].getAttribute("href");
		//返回字符串第一次出现的位置		currenturl.indexOf(linkurl);
		if (window.location.href.indexOf(linkurl) != -1) {
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id", linktext);
		}
	}
}
addLoadEvent(highlightPage);

function moveElement(elementID, final_x, final_y, interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if (elem.movement) clearTimeout(elem.movement);
	if (!elem.style.left) elem.style.left = "0px";
	if (!elem.style.top) elem.style.top = "0px";
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	var dlist;
	if (xpos == final_x && ypos == final_y) return true;
	if (xpos > final_x) {
		dlist = Math.ceil((xpos - final_x) / 10);
		xpos -= dlist;
	}
	if (xpos < final_x) {
		dlist = Math.ceil((final_x - xpos) / 10);
		xpos += dlist;
	}
	if (ypos > final_y) {
		dlist = Math.ceil((ypos - final_y) / 10);
		xpos -= dlist;
	}
	if (ypos < final_y) {
		dlist = Math.ceil((final_y - ypos) / 10);
		xpos += dlist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement(\'" + elementID + "\'," + final_x + "," + final_y + "," + interval + ")";
	elem.movement = setTimeout(repeat, interval);
}

function prepareSlideshow() {
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");

	var slideshow = document.createElement("div");
	var frame_1 = document.createElement("img");
	frame_1.setAttribute("src", "img/frame.gif");
	frame_1.setAttribute("alt", "");
	frame_1.setAttribute("id", "frame")
	slideshow.appendChild(frame_1);
	slideshow.setAttribute("id", "slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src", "img/slideshow.gif");
	preview.setAttribute("alt", "a glimpse of what awaits you");
	preview.setAttribute("id", "preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow, intro);

	var links = document.getElementsByTagName("a");
	var destination;
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover = function() {
			destination = this.getAttribute("href");
			if (destination.indexOf("index.html") != -1) {
				moveElement("preview", 0, 0, 5);
			}
			if (destination.indexOf("about.html") != -1) {
				moveElement("preview", -150, 0, 5);
			}
			if (destination.indexOf("photos.html") != -1) {
				moveElement("preview", -300, 0, 5);
			}
			if (destination.indexOf("live.html") != -1) {
				moveElement("preview", -450, 0, 5);
			}
			if (destination.indexOf("contact.html") != -1) {
				moveElement("preview", -600, 0, 5);
			}
		}
	}
}
addLoadEvent(prepareSlideshow);

function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for (var i = 0; i < sections.length; i++) {
		if (sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		} else {
			sections[i].style.display = "block";
		}
	}
}

function prepareInternalnav() {
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if (navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if (!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		}
	}
}
addLoadEvent(prepareInternalnav);

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

function preparePlaceholder() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "img/placeholder.gif");
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
	insertAfter(description, gallery);
	insertAfter(placeholder, description);
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

addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);

//可以后用于表格数据，每一行的交替变换颜色，提高可读性
function stripeTbles() {
	if (!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	var odd, rows;
	for (var i = 0; i < tables.length; i++) {
		rows = tables[i].getElementsByTagName("tr");
		odd = false;
		for (var j = 0; j < rows.length; j++) {
			if (odd == true) {
				addClass(rows[j], "odd");
				odd = false;
			} else {
				odd = true;
			}
		}
	}
}

//响应事件，鼠标滑过单元行，字体加粗等
function highlightRows() {
	if (!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function() {
			addClass(this, "highlight");
		}
		rows[i].onmouseout = function() {
			this.className = this.oldClassName;
		}
	}
}

//提取文章里面的abbr缩略词，显示缩略词清单在文章内
function displayAbbreviations() {
	if (!document.getElementsByTagName) return false;
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	//取得所有缩略词
	var abbreviations = document.getElementsByTagName("abbr");
	var defs = new Array();
	//遍历这些缩略词
	if (abbreviations.length < 1) return false;
	for (var i = 0; i < abbreviations.length; i++) {
		var current_abbr = abbreviations[i];
		if (current_abbr.childNodes.length < 1) continue; //如果当前元素没有子节点，就立刻开始下一次循环，使得在IE6及之前的平稳退化
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	} //将缩写词作为下标，全称做为值，构成数组
	//创建定义列表
	var dlist = document.createElement("dl");
	for (key in defs) {
		var definition = defs[key];
		//创建定义标题
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		//把它们添加到定义列表
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if (dlist.childNodes.length < 1) return false; //IE6以前不支持abbr，则返回为0,就可以直接退出，避免javascript错误。
	//创建标题
	var header = document.createElement("h2");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	var container = articles[0];
	//把标题添加到页面主体
	container.appendChild(header); //document.body.appendChild(header);
	//把定义列表添加到页面主体
	container.appendChild(dlist);
}

addLoadEvent(stripeTbles);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);

//考虑兼容性，有些浏览器不支持label的点击标签，自动关联表单字段的事件。
function focusLables() {
	if (!document.getElementsByTagName) return false;
	var lables = document.getElementsByTagName("label");
	for (var i = 0; i < lables.length; i++) {
		if (!lables[i].getAttribute("for")) continue;
		lables[i].onclick = function() {
			var id = this.getAttribute("for");
			if (!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}

}
addLoadEvent(focusLables);

/*function resetFields(whichform){
	//if (Modernizr.input.placeholder) return;
	for(var i=0;i<whichform.elements.length;i++){alert("a");
		var element = whichform.elements[i];
		if (element.type =="submit") continue;
		var check = element.placeholder || element.getAttribute("placeholder");
		if(!check) continue;
		element.onfocus = function(){
			var text = this.placeholder ||this.getAttribute("placeholder");
			if (this.value == text){
				//this.className = "";
				this.value = "";
			}
		}
		element.onblur = function(){
			if (this.value=="") {
				this.className ="placeholder";
				this.value=this.placeholder ||this.getAttribute("placeholder");
			}
		}
		element.onblur();
	}
}*///坑爹的不懂为啥上面和下面的都不能兼容旧版本，但是源码文件却可以、

function resetFields(whichform) {
  if (Modernizr.input.placeholder) return;
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    alert(element);
    if (element.type == "submit") continue;
    if (!element.getAttribute('placeholder')) continue;
    element.onfocus = function() {
    if (this.value == this.getAttribute('placeholder')) {
      this.value = "";
     }
    }
    element.onblur = function() {
      if (this.value == "") {
        this.value = this.getAttribute('placeholder');
      }
    }
    element.onblur();
  }
}

function prepareForms(){
	for (var i=0;i<document.forms.length;i++){
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function(){
			return validateForm(this);
		}
	}
}

addLoadEvent(prepareForms);

function isFilled(field){
	if (field.value.replace('','').length ==0) return false;
	var placeholder = field.placeholder || field.getAttribute("placeholder");
	return (field.value !=placeholder);
}

function isEmail(field){
	return (field.value.indexOf("@") != -1 && field.value.indexOf(".") !=-1);
}
function validateForm(whichform){
	for (var i=0; i<whichform.elements.length;i++){
		var element = whichform.elements[i];
		if (element.required =="required"){
			if ( !isFilled(element)){
				alert("please fill in the " +element.name+" field.");
				return false;
			}
		}
		if (element.type =="email"){
			if (!isEmail(element)){
				alert("The "+element.name+"field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}

//////好多不懂，你大爷的
function getHTTPObject(){
	if (typeof XMLHttpRequest == "undefied")
		XMLHttpRequest = function(){
			try{ return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
				catch(e){}
			try{ return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
				catch(e){}
			try{ return new ActiveXObject("Msxml2.XMLHTTP");}
				catch(e){}
		}
		return new XMLHttpRequest();
}
