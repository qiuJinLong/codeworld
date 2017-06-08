var oContainer = document.getElementById("container");
var oBox = document.getElementById("box");
var aDiv = [];
var radius = calculateRadius(129, 20);
var oAudio = document.getElementById("audio");
var oLaBa = document.getElementById("laba");

oLaBa.addEventListener("click", function() {
	if(oAudio.paused) {
		oAudio.play();
	} else {
		oAudio.pause();
	}
}, false);

function calculateRadius(length, totalNum) {
	return Math.round(length/(2*Math.tan(Math.PI/totalNum))) - 3;
}

for(var i=0; i<20; i++) {
	var oDiv = document.createElement("div");
	oDiv.style.background = 'url("./img/p'+(i+1)+'.png") no-repeat';
	oDiv.style.transform = 'rotateY('+360/20*i+'deg) translateZ('+radius+'px)';
	oDiv.innerHTML = i+1;
	oBox.appendChild(oDiv);
	aDiv.push(oDiv);
}

var startX = 0,
	x = 0,
	endX = 0;
var flag = true;	
oBox.addEventListener('touchstart', function(event) {
	event.preventDefault();

	var touch = event.targetTouches[0];
	startX = touch.pageX - x;

	function touchmove(event) {
		event.preventDefault();
		if(flag) {
			endX = event.targetTouches[0].pageX;
			x = endX - startX;
			oBox.style.transform = "rotateY("+x+"deg)";
		}
		
	}

	function touchend() {
		oBox.removeEventListener("touchmove", touchmove, false);
		oBox.removeEventListener("touchend", touchend, false);
	}

	oBox.addEventListener("touchmove", touchmove, false);
	oBox.addEventListener("touchend", touchend, false);
}, false);


function getRotateY(value) {
	//.test("rotateY(-15deg)")
	if(value) {
		var reg = new RegExp("\w+\(-(\d+)deg\)");
		if(reg.test(value)) {
			return parseInt(RegExp.$1);
		} else {
			return 0;
		}	
	} else {
		return 0;
	}
	
}


var preGamma = 0;
var temGamma = null;
var oDiv1 = document.getElementById("div1");
window.addEventListener('deviceorientation', function(event) {
	var gamma = event.gamma;
	temGamma = gamma-preGamma;

	document.title = getRotateY(oBox.style.transform);
	if(temGamma>1 || temGamma<-1) {
		flag = false;
		oBox.style.transform = 'rotateY(' + temGamma * 3 + 'deg)';
		// if (Math.abs(gamma) > 1) {
		// 	flag = false;
		// 	oBox.style.transform = 'rotateY(' + gamma * 3 + 'deg)';
		// } else {
		// 	flag = true;
		// }		
	} else {
		flag = true;
	}
	preGamma = gamma;
}, false);