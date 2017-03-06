//增加多个函数到window.onload
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
				addClass(rows[j],"odd");
				odd = false;
			} else {
				odd = true;
			}
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
	//把标题添加到页面主体
	document.getElementsByTagName("body")[0].appendChild(header); //document.body.appendChild(header);
	//把定义列表添加到页面主体
	document.getElementsByTagName("body")[0].appendChild(dlist);
}
addLoadEvent(displayAbbreviations);
addLoadEvent(stripeTbles);
addLoadEvent(highlightRows);

//响应事件，鼠标滑过单元行，字体加粗等
function highlightRows(){
	if (!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
		rows[i].onmouseover=function(){
		this.style.fontWeight="bold";
		}
		rows[i].onmouseout=function(){
			this.style.fontWeight = "normal";
		}
		}
}

//根据元素本身是否有className，选择直接替换或者追加
function addClass(element,value){
    if (!element.className){
        element.className =value;
    }else {
        newClassName = element.className;
        newClassName =" ";
        newClSSName =value;
        element.className = new ClssName;
    }
}
