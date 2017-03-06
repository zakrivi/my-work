var momObj = function() {
	this.x;
	this.y;
	this.angle;

	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000; //闭眼持续时间

	//this.momBodyTimer = 0;
	this.momBodyCount = 0;
}

momObj.prototype.init = function() {
	this.x = canWidth * 0.5; //400
	this.y = canHeight * 0.5; //300
	this.angle = 0;
}
momObj.prototype.draw = function() {

		//lerp x y
		this.x = lerpDistance(mx, this.x, 0.98); //mx,my是鼠标坐标
		this.y = lerpDistance(my, this.y, 0.98);

		//delta angle
		//Math.atan2(y,x);
		var deltaY = my - this.y; //y坐标之差
		var deltaX = mx - this.x; //x坐标之差
		var beta = Math.atan2(deltaY, deltaX) + Math.PI; //-PI,PI   大鱼和鼠标两点间的弧度,为啥加个PI，是因为图片本身朝向就是那样的，对于围绕鼠标旋转，鱼头鱼尾其实就是相差180，如果图片本身朝向是我们想要的，那也就不需要这个PI了
		//lerp angle
		this.angle = lerpAngle(beta, this.angle, 0.6);

		//momTail count
		this.momTailTimer += deltaTime;
		if(this.momTailTimer > 50) {
			this.momTailCount = (this.momTailCount + 1) % 8;
			this.momTailTimer %= 50;
		}

		//momEye count
		this.momEyeTimer += deltaTime;
		if(this.momEyeTimer > this.momEyeInterval) {

			this.momEyeCount = (this.momEyeCount + 1) % 2;
			this.momEyeTimer %= this.momEyeInterval;

			if(this.momEyeCount == 0) {
				this.momEyeInterval = Math.random() * 1500 + 2000; //[,)
			} else {
				this.momEyeInterval = 200;
			}
		}

		//momBody count

		this.momBodyTimer += deltaTime;
		if(this.momBodyTimer > 300) {
			this.momBodyCount = (this.momBodyCount + 1);
			this.momBodyTimer %= 300;
			if(this.momBodyCount > 7) {
				this.momBodyCount = 7;
				//game over
			}
		}

		//ctx1
		ctx1.save();
		ctx1.translate(this.x, this.y); //修改画布原点
		ctx1.rotate(this.angle);
		var momTailCount = this.momTailCount;
		ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);
		var momBodyCount = this.momBodyCount;
		if(data.double == 1) { //ora
			ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
		} else if(data.double == 2) { //blue
			ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);
		}
		var momEyeCount = this.momEyeCount;
		ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);
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