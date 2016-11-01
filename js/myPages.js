(function(){
/*			 
 * 2016/10/26
 * 翻页插件：
 * h： 翻页高度 ， i： 翻页定位 ，speed： 翻页延迟时间，v: 翻页速度
 * sections: 翻页的大盒子， atcs: 分页部分
 *
 * init： 主入口 ， judge: 判断是否需要更改参数 , 
 * 
 * upOrDown: 判断是上还是下 ， move: 因为移动是用的CSS3 所以改CSS就可以了。
 * 
 * 
 * creatCheck: 创建一个初始位置点 , 
 * 
 * 
 * 
 * 
 * */
var obj = {
	sections:document.getElementsByClassName('main').item(0),
	movego:document.getElementsByTagName('section').item(0),
	atcs:document.getElementsByTagName('article'),
	checks:'',
	i:0,	
	v:400,
	h:604,
	begin:0,
	speed:1000,
	callBack:'',
	toggleEvent:true,
	init:function(e){
		var self = this;
			self.judge(e);
		this.movego.addEventListener('mousewheel',function(e){
			self.upOrDown(e);
			self.creatCheck();
			
		});
		this.movego.addEventListener('ontouchstart',function(e){
			self.begin = e.clientY;
			alert(e.clientY)
			alert(e.screenY)
		})
		this.movego.addEventListener('ontouchmove',function(e){
			if(e.clientY<self.begin){
				
			}else if(e.clientY<self.begin){
				
			}
		})
	},
	judge:function(e){
		mytool.extend(obj,e);
		this.creatCheck();
		this.movego.style.transition = 'all ' + this.v + 'ms';
		return
	},
	upOrDown:function(e){
		var i = this.i;
		var l = this.atcs.length-1;
		
		if(i > 0 && i < l){if(e.deltaY>0){i++;}else{i--;}}
		else if(i==0){if(e.deltaY>0){i++;}}
		else if(i==l){if(e.deltaY<0){i--;}};
		// 判断是否需要重新加载i
		if(this.i != i && this.toggleEvent){
			this.toggleEvent = false;
			this.i = i;
			this.move();
			setTimeout(function(){obj.toggleEvent = true;},1000);
		}
		return
	},
	move:function(){
		return	this.movego.style.transform = 'translate3d(0px,-'+this.h*this.i+'px, 0px)';
	},
	creatCheck:function(){
		var l = this.atcs.length,str='',wh = document.documentElement.clientHeight;
			if(this.checks==''){
				var	uls = document.createElement('ul');
					//创建节点和添加节点内容
					//uls.setAttribute('id','aside')
					uls.setAttribute("class", "aside");
					this.movego.parentNode.appendChild(uls);
					this.checks = uls;  // 保存变量
				var Node = window.getComputedStyle(uls,null);  // 为了拿到css属性
				var h = Node.height.substring(0,Node.height.indexOf('px'))-0;//去除px 拿到纯数字 
					uls.style.top = (wh-h)/2 +'px'; 
			}else{var uls = this.checks;}
			for(var i = 0;i<l;i++){
				if(i == this.i){
					str += "<li class='active'></li>"
				}else{
					str += "<li></li>"
				}
			};
			uls.innerHTML = str;
	}
}
this.test = obj;

/*			 
 *想获取最终的css属性 
 * var Node = document.get.....
 * var demo = window.getComputedStyle(Node, null); 
 *     demo 就能获取最终属性了
 * */
}.call(this))