window.onload = function() {
	//获取盒子对象
	var box = document.getElementById('container');
	//获取图片对象
	var imgs = box.getElementsByTagName('img');

	var imgWidth = imgs[0].offsetWidth; //单张图片的宽度
	var exposeWidth = 160; //隐藏门露出宽度
	var boxWidth = imgWidth + exposeWidth * (imgs.length - 1); //图片盒子宽度
	box.style.width = boxWidth + 'px';

	//设置每道门的初始位置
	function setImgsPos() {
		for (var a = 1; a < imgs.length; a++) {
			imgs[a].style.left = imgWidth + exposeWidth * (a - 1) + 'px';
		}
	}
	setImgsPos();

	// 计算每张图片移动的距离
	var translate = imgWidth - exposeWidth;
	//为每道门绑定事件
	for (var i = 0; i < imgs.length; i++) {
		(function(i) {
			imgs[i].onmouseover = function() {
				setImgsPos();
				for (var j = 1; j <= i; j++) {
					imgs[j].style.left = parseInt(imgs[j].style.left) - translate + 'px'; //10代表十进制
				}

			}
		})(i);
		imgs[i].onmouseout = function() {
			setImgsPos();
		}
	}
}

//鼠标移出后复位
// for(var i=0;i<imgs.length;i++){    
//     imgs[i].onmouseleave = function(){
//         setImgsPos();
//     }
// }