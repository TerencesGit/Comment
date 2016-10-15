function $(selector){
	var method = selector.substr(0,1) == '#' ? 'querySelector' : 
	'querySelectorAll';
	return document[method](selector);
}
window.onload = function(){
	var list = $('#list');
	var lis = list.children;
	function removeNode(node){
		node.parentNode.removeChild(node)
	}
	function praise(box, el){
		var praiseEle = box.getElementsByClassName('praises-total')[0];
		var total = praiseEle.getAttribute('total')*1;
		var txt = el.innerHTML;
		var newTotal;
		if(txt == '赞'){
			newTotal = total + 1;
			praiseEle.setAttribute('total',newTotal)
			el.innerHTML = '取消赞';
			praiseEle.innerHTML = (newTotal == 1) 
			? '我觉得很赞' : '我和' +total+ '个人觉得很赞';
		}else{
			newTotal = total - 1;
			praiseEle.setAttribute('total',newTotal)
			el.innerHTML = '赞';
			praiseEle.innerHTML = newTotal == 0 ? '' : 
			 +newTotal+ '个人觉得很赞';
		}
		praiseEle.style.display = (newTotal == 0) 
		? 'none' : 'block';
	}
	for(var i = 0; i < lis.length;i++){
		lis[i].onclick = function(e){
			e = e || window.event;
			var el = e.srcElement;
			switch(el.className){
				case 'close':
					removeNode(el.parentNode)
					break;
				case 'praise':
					praise(el.parentNode.parentNode.parentNode, el)
					break;	
			}
		}
	}
}