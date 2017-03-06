function addLoadEvent(func) {
	var oldload = window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldload();
			func();
		}
	}
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (Parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function addClass(element, value) {
	if (!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName += " " + value;
		element.className = newClassName;
	}
}

function highlightPage() {
	if (!document.getElementsByTagName) return false;
	if (! document.getElementById) return false;
	if (! document.getElementById("navigation")) return false;
	var nav = document.getElementById("navigation");
	var links = nav.getElementsByTagName("a");
	for (i=0; i<links.length; i++) {
		var linkURL = links[i].getAttribute("href");
		var currentURL = window.location.href;
		if (currentURL.indexOf(linkURL) != -1) {
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id", linktext);
		}
	}
}

addLoadEvent(highlightPage);