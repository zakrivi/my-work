//判断大鱼和果实的距离
function momFruitsCollision() {
	if(!data.gameOver) {
		for(var i = 0; i < fruit.num; i++) {
			if(fruit.alive[i]) {
				//calculate length
				var l = calLength(fruit.x[i], fruit.y[i], mom.x, mom.y)
				if(l < 900) {
					//fruit eaten
					fruit.dead(i);
					data.fruitNum++;
					mom.momBodyCount++;
					if(mom.momBodyCount > 7) {
						mom.momBodyCount = 7;
					}
					if(fruit.fruitType[i] == "blue") //blue
					{
						data.double = 2;
					}
					wave.born(fruit.x[i],fruit.y[i]);
				}
			}

		}
	}
}

function calLength(x1, y1, x2, y2) {
	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2); //平方和
}

//mom baby collision
function momBabyCollision() {
	if(data.fruitNum > 0 && !data.gameOver) {
		var l = calLength(mom.x, mom.y, baby.x, baby.y);
		if(l < 900) {
			//baby recover
			baby.babyBodyCount = 0;
			//data =>0

			mom.momBodyCount = 0;
			//score update
			data.addScore();
			//draw halo
			halo.born(baby.x,baby.y);
		}
	}
}