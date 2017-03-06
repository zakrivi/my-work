function insertParagraph(text){
	var str= "<p>";
	str +=text;
	str +="</p>";
	document.write(str);
}
window.onload = function(){
	var testdiv = document.getElementById("testdiv");
	testdiv.innerHTML = "<P>I inserted <em>this</em> content.</P>"
	
	var para = document.createElement("p");
/*	var info = "nodeName: ";
	info+= para.nodeName;
	info+=" nodeType: ";
	info+=para.nodeType;
	alert(info);*/
	var testdiv = document.getElementById("testdiv");
	testdiv.appendChild(para);
	var txt = document.createTextNode("Hello world");
	para.appendChild(txt);
	
}

