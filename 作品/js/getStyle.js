
//在link外部样式时，可用于获取元素任何属性
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];//针对IE浏览器
	} else {
		return getComputedStyle(obj, false)[attr];//针对火狐等其他浏览器
	}
}