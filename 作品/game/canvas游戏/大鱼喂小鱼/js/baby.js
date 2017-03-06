var babyObj = function() {
	this.x;
	this.y;
	this.angle;
	this.babyBody = new Image();
	
	
	this.babyTailTimer = 0;
	this.babyTailCount = 0;
	
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000; //闭眼持续时间
	
	this.babyBodyTimer=0;
	this.babyBodyCount=0;
}

babyObj.prototype.init = function() {
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
	this.babyBody.src = "img/babyFade0.png";

}

babyObj.prototype.draw = function() {

	//lerp x,y
	this.x = lerpDistance(mom.x, this.x, 0.98);
	this.y = lerpDistance(mom.y, this.y, 0.98);
	//lerp angle
	var deltaX = mom.x - this.x;
	var daltaY = mom.y - this.y;
	var bata = Math.atan2(daltaY, deltaX) + Math.PI;
	//lerp angle
	this.angle = lerpAngle(bata, this.angle, 0.6);

	//babyTail count
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50) {
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}

	//babyEye count
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval) {

		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %=this.babyEyeInterval;
		
		if(this.babyEyeCount == 0) {
			this.babyEyeInterval = Math.random()*1500+2000;//[,)
		}else{
			this.babyEyeInterval=200;
		}
	}



	//babyBody count
	
	this.babyBodyTimer+=deltaTime;
	if(this.babyBodyTimer>300){
		this.babyBodyCount=(this.babyBodyCount+1);
		this.babyBodyTimer%=300;
		if(this.babyBodyCount>19){
			this.babyBodyCount=19;
			//game over
			data.gameOver=true;
			
		}
	}
	
	
	//ctx1

	ctx1.save();
	//translate
	ctx1.translate(this.x, this.y);
	//rotate
	ctx1.rotate(this.angle);
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);
	var babyBodyCount=this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);

	ctx1.restore();
}

//距离渐进  aim目标，cur现在，radio百分比
function lerpDistance(aim, cur, radio) {
	var delta = cur - aim;
	return aim + delta * radio;

}
//弧度渐进  a目标，b现在，t百分比
function lerpAngle(a, b, t) {
	var d = b - a;
	if(d > Math.PI) {
		d = d - 2 * Math.PI;
	}
	if(d < -Math.PI) {
		d = d + 2 * Math.PI;
	}
	return a + d * t;
}