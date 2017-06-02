function getNow() {
	return (new Date()).getTime();
}

function rnd(min, max) {
	return parseInt((Math.random()*99999)%(max-min+1))+min;
}

window.onload = function() {
	document.oncontextmenu=function () {
		return false;
	};

	//控制
	var oAutoPlay=document.getElementById('auto_play');
	var bManual = true; //手动模式下，圆圈会逐步的缩小向上；自动模式下圆圈只会锁下，不会冒泡
	var SPEED_MAX = 20;

	var oFps=document.getElementById('fps');
	var bCanUse = false;
	var aImgs = [];
	var aSrc = ["images/qun_1.png", "images/qun_3.png", "images/qun_5.png", 'images/qun_4.png', 'images/qun_2.png'];
	var count = 0;
	var samp = 0;
	var continue_count = 0;
	var aSharps = [];

	var lastIType=-1;

	var SAMP_RATE = 3;	 //圆圈生成的速度，每计算三次才真正的生成一次圆圈
	var SPEED_RATE = 20;  //圆圈每次减小的值
	var FPS_RATE = 20;
	var SIZE = 100;
	var CONTINUE_LEN = 5; //多少个圆圈为一组

	for(i = 0; i<aSrc.length; i++) {
		aImgs[i] = new Image();
		aImgs[i].onload = function() {
			count++;
			if(count == aSrc.length) {
				document.getElementById("bg").style.display = "none";
				document.getElementById("loading").style.display = "none";
				start();
			}
		};
		aImgs[i].onerror = function() {
			document.getElementById("loading").innerHTML = '<span style="color:red; font-weight:bold;">素材加载失败，请刷新后重试</span>';
		}
		aImgs[i].src = aSrc[i];
	}

	oAutoPlay.onclick = function() {
		if(this.value == "自动移动") {
			var x = rnd(0, document.documentElement.clientWidth);
			var y = rnd(0, document.documentElement.clientHeight);
			var xSpeed = rnd(-SPEED_MAX, SPEED_MAX);
			var ySpeed = rnd(-SPEED_MAX, SPEED_MAX);

			iAutoPlayTimer = setInterval(function() {
				if(!(samp++%AUTO_SAMP_RATE)) {
					onMove(x, y);
				}
				x+=xSpeed;
				y+=ySpeed;

				if(x<=SIZE/2) xSpeed=rnd(0, SPEED_MAX);
				if(x>=document.documentElement.clientWidth-SIZE/2) xSpeed = -rnd(0, SPEED_MAX);

			}, 30)

		}
	};

	function restart() {
		document.onmousedown = fnHandlerMouseMove;
	}

	function fnHandlerMouseMove() {
		bCanUse = true;
		document.onmousemove = function(ev) {
			var oEvent = ev || event;

			if(!(samp++%SAMP_RATE)) {
				onMove(oEvent.clientX, oEvent.clientY);
			}
			
			return false;
		}
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
		}
		return false;
	}

	function onMove(x, y) {
		if(continue_count++%CONTINUE_LEN) {
			var iType = lastIType;
		} else {
			iType = (lastIType+1)%aSrc.length;
			lastIType = iType;
		}
		createImg(iType, x, y, 1000);
	}

	function createImg(index, l, t) {		
		var oImg = document.createElement("img");
		oImg.src = aImgs[index].src;
		oImg.style.left = l+"px";
		oImg.style.top = t+"px";
		oImg.height = aImgs[index].height;
		oImg.width = aImgs[index].width;
		oImg.style.marginLeft = -oImg.width/2+"px";
		oImg.style.marginTop = -oImg.height/2+"px";
		document.body.appendChild(oImg);
		aSharps.push({obj:oImg, endTime:getNow(), 
			speedX:aImgs[index].width/SPEED_RATE, 
			speedY:aImgs[index].height/SPEED_RATE
		});
	}

	function start() {
		document.onmousedown = fnHandlerMouseMove;

		var lastTime = 0;
		var iShowFps = 0;
		var lastMove = 0;

		setInterval(function() {
			var iNow = getNow();
			var aNewSharps = [];
			if(iNow - lastMove > 30) {
				for(var i = 0; i<aSharps.length; i++) {
					aSharps[i].obj.width = Math.max(aSharps[i].obj.offsetWidth - aSharps[i].speedX, 0);
					aSharps[i].obj.height = Math.max(aSharps[i].obj.offsetHeight - aSharps[i].speedY, 0);
					
					aSharps[i].obj.style.top=parseInt(aSharps[i].obj.style.top)-5+'px';

					aSharps[i].obj.style.marginLeft = -aSharps[i].obj.offsetWidth/2+"px";
					aSharps[i].obj.style.marginTop = -aSharps[i].obj.offsetWidth/2+"px";
					if(aSharps[i].obj.width == 0 || aSharps[i].obj.height == 0) {
						document.body.removeChild(aSharps[i].obj);
					} else {
						aNewSharps.push(aSharps[i]);
					}
				}
				aSharps = aNewSharps;
				lastMove = iNow;
			}
			if(!(iShowFps++%FPS_RATE))
			{
				oFps.innerHTML=parseInt(1000/(iNow-lastTime));  //iNow-lastTime相当于刷新一次，1000/(iNow-lastTime)，就是一秒内能刷新几次
			}
			lastTime=iNow;
		}, 16);



	}

};