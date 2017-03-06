var can1;
var can2;

var canWidth;
var canHeight;

var ctx1;
var ctx2;
var lastTime;
var deltaTime;
var bgPic = new Image();

var ane;
var fruit;
var mom;
var baby;
var mx;
var my;
var babyTail = [];
var babyEye = [];
var babyBody = [];
var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var data;
var wave;
var halo;
var dust;
var dustPic=[];
document.body.onload = game;

function game() {
	init(); //初始化工作

	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init() {
	//获得canvas context
	can1 = document.getElementById("canvas1"); //fishes.dust,ui,circle
	ctx1 = can1.getContext("2d");

	can2 = document.getElementById("canvas2"); //background,ane,fruits
	ctx2 = can2.getContext("2d");

	can1.addEventListener("mousemove", onMouseMove, false);

	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;
	for(var i = 0; i < 8; i++) {
		babyTail[i] = new Image();
		babyTail[i].src = "img/babyTail" + i + ".png";
	}
	for(var i = 0; i < 2; i++) {
		babyEye[i] = new Image();
		babyEye[i].src = "img/babyEye" + i + ".png";
	}
	for(var i = 0; i < 20; i++) {
		babyBody[i] = new Image();
		babyBody[i].src = "img/babyFade" + i + ".png";
	}

	//mom
	for(var i = 0; i < 8; i++) {
		momTail[i] = new Image();
		momTail[i].src = "img/bigTail" + i + ".png";
	}
	for(var i = 0; i < 2; i++) {
		momEye[i] = new Image();
		momEye[i].src = "img/bigEye" + i + ".png";
	}
	for(var i = 0; i < 8; i++) {
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOra[i].src = "img/bigSwim" + i + ".png";
		momBodyBlue[i].src = "img/bigSwimBlue" + i + ".png";
	}

	data = new dataObj();
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center"; //left center right
	
	wave=new waveObj();
	wave.init();
	halo=new haloObj();
	halo.init();
	
	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src="img/dust"+i+".png";
	}
	dust=new dustObj();
	dust.init();
	
}

function gameloop() {
	window.requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	if(deltaTime > 40) {
		deltaTime = 40;
	}

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0, 0, canWidth, canHeight);
	mom.draw();
	baby.draw();

	momFruitsCollision();
	momBabyCollision();
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

//鼠标事件
function onMouseMove(e) {
	if(!data.gameOver) {

		if(e.offsetX || e.layerX) {
			mx = e.offsetX == undefined ? e.layerX : e.offsetX;
			my = e.offsetY == undefined ? e.layerY : e.offsetY;
		}
	}
}