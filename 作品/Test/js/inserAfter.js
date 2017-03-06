function insertAfter(newElement,targetElement){
    var parent =targetElement.parentNode;
    if ( parent.lastChild==targetElement){
        parent.appendChld(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}