(function(){
	
	//bind 如同call  和 apply 相似  更改this指向的一个function方法
	
	//把this赋值给root   这是闭包传参带入进来的
	var root = this;
	
	// 将各大对象的原型用变量保存起来
	var ArrayProto = Array.prototype,
		ObjProto = Object.prototype,
		FunProto = Function.prototype;
	
	// 将各大原型上的方法用变量保存下来
	var push = ArrayProto.push,
		slice = ArrayProto.slice,
		toString = ObjProto.toString,
		hasOwnProperty = ObjProto.hasOwnProperty;
		
	var nativeIsArray = Array.isArray,
		nativeKeys = Object.keys,
		nativeBind = FunProto.bind,
		nativeCreate = Object.create;
		
	//暂未知道用途；
	var Ctor = function(){};
		
		
	var _ = function(obj){
			if(obj instanceof _){
				return obj
			}
			if(!(this instanceof _)){
				return new _(obj);
			}
			this._wrapped = obj;
		}
		
	
	// 判断是什么环境运行的js
	if (typeof exports !== 'undefined') {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports.mytool = _;
	  } else {
	    root.mytool = _;
	  }
	  
	//  判断数组方法  先判断有没有自带的isArray方法
	_.isArray = nativeIsArray || function(obj){
		return toString.call(obj) === '[object Array]';		
	}
	//  判断是否为方法
	_.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
	// 判断对象方法
	_.isObject = function(obj) {
	  var type = typeof obj;
	  return type === 'function' || type === 'object' && !!obj;
	};
	// 判断字符串方法
	_.isString = function(obj){
		return toString.call(obj) === '[Object String]'
	}
	// 判断是否为数字
	_.isNumber = function(obj){
		return toString.call(obj) === '[Object Number]'
	}
	// 判断是否为dom节点
	_.isElement = function(obj) {
	  return !!(obj && obj.nodeType === 1);
	};
	
	//====================================== 集合遍历篇  ========================================
	// 遍历对象：Array ,  obj  ,  Element 。   参数是 obj 和  fn 方法
	_.each = function(obj,fn){
//		console.log('isArray : ' + _.isArray(obj));
//		console.log('isObject : ' + _.isObject(obj));
//		console.log('isElement : ' + _.isElement(obj));
		if(_.isArray(obj)){
			var i,length;
			for(i=0;i<obj.length;i++){
				fn(i,obj[i]);
			}
			return
		}else if(_.isObject(obj)){
			for(var item in obj){
				if(item ==='length'){
					return
				}else{
					fn(item,obj[item])
				}
			}
			return
		}else{
			return 'The is not Object'
		}
	}
	
	//====================== ===== 判断是数组还是对象且返回是否内容为空 =======================
	_.Null = function(obj){
		if(_.isObject(obj)){
			for(var i in obj){
				return obj;
			}
			return null;
		}else{
			return 'The is not Null'
		}
	}
	_.ifNull = function(obj){
		if(_.isArray(obj)){
			
		}else if(_.isObject(obj)){
			
		}else{
			return 'The is not obj and array'
		}
	}
	
	
	
	//====================================== Array篇 ========================================
	
	// 返回数组的第一个值
	_.first = function(Array){
		if(_.isArray(Array)){
			return Array[0];
		}else{
			return 'The is not Array';
		}
	}
	// 返回数组中的除最后一个元素之外的其他元素，可以传n，截断后面n元素；
	_.initial = function(Array,n){
		if(_.isArray(Array)){
			return slice.call(Array,0,(Array.length - (n==null ? 1 : n )))
		}else{
			return 'The is not Array'			
		}
	}
	// 返回数组中的最后一个数
	_.last = function(Array){
		if(_.isArray(Array)){	
			return Array[Array.length-1]
		}else{
			return 'The is not Array'
		}
	}
	// 和initial 相反
	_.rest = function(Array,n){
		if(_.isArray(Array)){
			return slice.call(Array,(n == null ? 1:n))
		}
	}
	
	
	//====================================== Object篇 ========================================
	// 删除对象中的某个属性
	_.deletes = function(obj,arr){
		if(_.isObject(obj)){
			if(_.isArray(arr)){
				for(var i in arr){
					delete obj[arr[i]];
				}
			}else{
				delete obj[arr];
			}
		}
	}
	_.extend = function(a,b){
		for(var i in b){
			 //这个是判断是否具有该属性的
			if(a.hasOwnProperty(i) && (!b.hasOwnProperty(i))){
				a[i]=b[i];
			}else{
				a[i]=b[i];
			}
		}
		return a
	}
	
	
	
	
	
	
}.call(this))
