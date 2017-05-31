window.onload = function() {
	document.oncontextmenu=function () {
		return false;
	};

	var bCanUse = false;
	var aImgs = [];
	var aSrc = ["images/qun_1.png", "images/qun_3.png", "images/qun_5.png", 'images/qun_4.png', 'images/qun_2.png'];
	var count = 0;
	var samp = 0;
	var continue_count = 0;

	var lastIType=-1;

	var SAMP_RATE = 3;
	var CONTINUE_LEN = 5;

	for(i = 0; i<aSrc.length; i++) {
		aImgs[i] = new Image();
		aImgs[i].onload = function() {
			count++;
			if(count == aSrc.length) {
				document.getElementById("bg").style.display = "none";
				document.getElementById("loading").style.display = "none";
				restart();
			}
		};
		aImgs[i].onerror = function() {
			document.getElementById("loading").innerHTML = '<span style="color:red; font-weight:bold;">素材加载失败，请刷新后重试</span>';
		}
		aImgs[i].src = aSrc[i];
	}

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
	}

};