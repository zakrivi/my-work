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
}

function displayCitations() {
	if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	//取得所有引用	
	var quotes = document.getElementsByTagName("blockquote");
	//遍历引用
	for (var i = 0; i < quotes.length; i++) {
		//如果没有cite属性，跳下次循环
		if (!quotes[i].getAttribute('cite')) continue; //for里面循环次数不要超出原本的数量，否则容易导致javascript错误
		//alert(quotes[i].cite);
		//保存cite属性
		var url = quotes[i].getAttribute("cite"); //循环保存每一个blockquote的cite属性
		//取得引用中的所有元素节点
		var quoteChildren = quotes[i].getElementsByTagName('*');
		//如果没有元素节点，跳下次循环
		if (quoteChildren.length < 1) continue;
		//取得引用中的最后一个元素节点
		var elem = quoteChildren[quoteChildren.length - 1];
		//创建标记
		var link = document.createElement("a");
		var link_text = document.createTextNode("source");
		link.appendChild(link_text);
		link.setAttribute("href", url);
		var superscript = document.createElement("sup");
		superscript.appendChild(link);
		//把标记添加到引用中的最后一个元素节点
		elem.appendChild(superscript);
	}
}
/*function acc() {
	var a = document.getElementById("navigation");
	var b = a.getElementsByTagName("li"); //li的集合b
	var header = document.createElement("h2");
	var header_text = document.createTextNode("list");
	header.appendChild(header_text);
	document.getElementsByTagName("body")[0].appendChild(header);
	for (var j = 0; j < b.length; j++) {
		var dd = b[j].textContent;
		var d = b[j].childNodes[0].getAttribute("accesskey");
		alert(d);
		var e = document.createElement("p");
		var g = document.createElement("a");
		var rr = document.createTextNode(dd);
		var cc=document.createTextNode("-accesskey: "+ d );
		g.setAttribute("accesskey", d);
		
		g.appendChild(rr);	
		g.appendChild(cc);
		g = g;
		e.appendChild(g);
		document.getElementsByTagName("body")[0].appendChild(e);
	}

}
addLoadEvent(acc);*/
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
addLoadEvent(displayCitations);
addLoadEvent(acc);

function acc() {
	var a = document.getElementById("navigation");
	var b = document.getElementsByTagName("li");
	var f = document.createElement("dl");
	for (var i = 0; i < b.length; i++) {
		var c = b[i].getElementsByTagName("a");
		var d = b[i].textContent;
		var e = c[0].getAttribute("accesskey");
		var g = document.createElement("dt");
		var h = document.createElement("dd");
		var h_text = document.createTextNode("accesskey: " + e);
		var g_text = document.createTextNode(d);
		h.appendChild(h_text);
		g.appendChild(g_text);
		f.appendChild(g);
		f.appendChild(h);
	}
	var header = document.createElement("h2");
	var header_text = document.createTextNode("list");
	header.appendChild(header_text);
	document.getElementsByTagName("body")[0].appendChild(header);
	document.getElementsByTagName("body")[0].appendChild(f);
}//自己写的，很遗憾没有用for in循环，跟书上的不一样。