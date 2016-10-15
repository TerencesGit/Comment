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
	for(var i = 0; i < lis.length;i++){
		lis[i].onclick = function(e){
			e = e || window.event;
			var el = e.srcElement;
			switch(el.className){
				case 'close':
					removeNode(el.parentNode)
					break;
			}
		}
	}
}