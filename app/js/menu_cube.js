// let html, svg, text, circle;
// let style, marginTop, left, marginLeft;
//
// html=document.querySelector('html');
// text=document.querySelector('#text');
// circle=document.querySelector('#circle');
// svg=document.querySelector('svg');
//
// svg.addEventListener('click',update,false);
// svg.addEventListener('touchstart',mouseDown,false);
// svg.addEventListener('mousedown',mouseDown,false);
//
// function mouseDown(){
// 	window.addEventListener('mousemove',update,false);
// 	window.addEventListener('touchmove',update,false);
//
// 	window.addEventListener('mouseup',mouseUp,false);
// 	window.addEventListener('touchend',mouseUp,false);
//
// 	html.className='setting';
// 	svg.style.cursor='-webkit-grabbing';
// 	svg.style.cursor='grabbing';
// }
//
// function mouseUp(){
// 	window.removeEventListener('mousemove',update,false);
// 	window.removeEventListener('touchmove',update,false);
//
// 	window.removeEventListener('mouseup',mouseUp,false);
// 	window.removeEventListener('touchend',mouseUp,false);
//
// 	html.className='';
// 	svg.style.cursor='pointer';
// }
//
// function update(e){
// 	e.preventDefault();
// 	style=getComputedStyle(svg,null);
// 	marginTop=parseInt(style.marginTop);
// 	left=parseInt(style.left);
// 	marginLeft=parseInt(style.marginLeft);
//
// 	let angle=getAngleInRadian(e);
// 	//handle rotation
// 	angle+=Math.PI/2;
// 	angle*=100/(2*Math.PI);
// 	let disp=angle.toFixed(0)
// 	text.textContent=disp;
// 	disp<10?text.setAttribute('x','82'):disp>99?text.setAttribute('x','52'):text.setAttribute('x','67');
// 	let offset=502+angle/100*502;
// 	circle.setAttribute('stroke-dashoffset',offset.toString());
//
// 	return false;
// }
//
// function getAngleInRadian(e){
// 	let x, y, result, a;
// 	x = !! e.touches ? e.touches[ 0 ].clientX : e.clientX;
// 	y = !! e.touches ? e.touches[ 0 ].clientY : e.clientY;
// 	x=(2*x-innerWidth)/2;
// 	y=-(2*y-innerHeight)/2;
// 	a=Math.atan(y/x);
// 	result=x<0?Math.PI+a:a;
// 	return result;
// }
