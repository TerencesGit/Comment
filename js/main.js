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
	Date.prototype.format = function(format){
		var o = {
			'M+': this.getMonth()+1,
			'd+': this.getDate(),
			'h+': this.getHours(),
			'm+': this.getMinutes(),
			's+': this.getSeconds()
		}
		if(/(y+)/.test(format)){
			format = format.replace(RegExp.$1,(this.getFullYear()+'').substr(4-RegExp.$1.length));
		}
		for(var k in o){
			if(new RegExp('('+ k +')').test(format)){
				format = format.replace(RegExp.$1,(RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
			}
		}
		return format;
	}
	function release(box, el){
		var textarea = box.getElementsByTagName('textarea')[0];
		var contentList = box.getElementsByClassName('comment-list')[0];
		var contentBox = document.createElement('div');
		contentBox.className = 'comment-box clearfix';
		contentBox.setAttribute('user','self');
		var html = '<img class="myhead" src="images/my.jpg" alt="" />'+
	              '<div class="comment-content">'+
	                  '<p class="comment-text"><span class="user">我：</span>'+textarea.value+'</p>'+
	                  '<p class="comment-time">'+
	                      ''+ new Date().format('yyyy-MM-dd hh:mm:ss') +''+
	                      '<a href="javascript:;" class="comment-praise" total="0" my="0" style="">赞</a>'+
	                      '<a href="javascript:;" class="comment-operate">删除</a>'+
	                  '</p>'+
	              '</div>' 
	   contentBox.innerHTML = html;
	   contentList.appendChild(contentBox); 
	   textarea.value = '';
	   textarea.onkeyup()
	   el.parentNode.className = 'text-box';          
	}
	function commentPraise(el){
		var total = el.getAttribute('total')*1;
		var my = el.getAttribute('my')*1;
		var newTotal;
		if(my == 0){
			newTotal = total + 1;
			el.setAttribute('total',newTotal);
			el.setAttribute('my',1);
			el.innerHTML = newTotal + '取消赞';
		}else{
			newTotal = total - 1;
			el.setAttribute('total',newTotal);
			el.setAttribute('my',0);
			el.innerHTML = newTotal == 0 ? '赞' : newTotal + '赞';
		}
		el.style.display = newTotal==0 ? '' : 'inline-block'
	}
	function commentOperte(el){
		var commentBox = el.parentNode.parentNode.parentNode;
		var box = commentBox.parentNode.parentNode.parentNode;
		var textarea = box.getElementsByTagName('textarea')[0];
		var user = commentBox.getElementsByClassName('user')[0];
		var txt = el.innerHTML;
		console.log(txt)
		if(txt == '回复'){
			textarea.onfocus()
			textarea.value = '回复'+user.innerHTML;
			textarea.onkeyup()
		}else if(txt == '删除'){
			removeNode(commentBox)
		}else{
			return false;
		}
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
				case 'btn btn-on':
					release(el.parentNode.parentNode.parentNode, el);
					break;
				case 'comment-praise':
					commentPraise(el)
					break;
				case 'comment-operate':
					commentOperte(el);
					break;
			}
		}
		var textarea = lis[i].getElementsByTagName('textarea')[0];
				textarea.onfocus = function(){
					this.parentNode.className = 'text-box text-box-on';
				}
				textarea.onblur = function(){
					if(this.value == ''){
						this.parentNode.className = 'text-box';
					}
				}
				textarea.onkeyup = function(){
					var len = this.value.length;
					var textbox = this.parentNode;
					var btn = textbox.children[1];
					var word = textbox.children[2];
					if(len == 0 || len > 140){
						btn.className = 'btn';
						btn.setAttribute('disabled',true)
					}else{
						btn.className = 'btn btn-on'
						btn.removeAttribute('disabled')
					}
					word.innerHTML = len +'/140'
				}
	}
}