var main = {
	rotateObj:null,
	rotateConf:{1:{key:1,name:'37游戏充电宝',rotate:342},2:{key:2,name:'卡片U盘',rotate:162},3:{key:3,name:'公司笔记本黄色',rotate:90},
	4:{key:4,name:'纪念衫',rotate:18},5:{key:5,name:'洋葱头小公仔',rotate:198},7:{key:7,name:'鼠标垫',rotate:54},
	10:{key:10,name:'谢谢参与',rotate:126},8:{key:8,name:'绿叶水杯',rotate:234},9:{key:9,name:'攻城掠地礼包',rotate:270},
	6:{key:6,name:'iphone4s手机壳',rotate:306}},
	getRotateObj:function(){
		if(!this.rotateObj){
			this.rotateObj = $('#lotteryBtn');
		}
		return this.rotateObj;
	},
	clickRotate:function(){
		main.rotateStarte();
		// main.rotateTo(data.list);
	},
	rotateStarte:function(){
		this.getRotateObj();
		this.rotateObj.rotate({
			angle:0, 
			duration: 10000, 
			animateTo: 2160, //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的
			callback:function(){
				alert('网络超时');
			}
		}); 
	},
	rotateTo:function(obj){
		var obj_l=this.rotateConf[obj.key],
			n_obj = $.extend({}, obj_l, obj);


		this.rotateObj.stopRotate();
		this.rotateObj.rotate({
			angle:0, 
			duration: 5000, 
			animateTo: n_obj.rotate+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
			callback:function(){
				if(n_obj.key==10){
					main.alert(n_obj.name,'',300);return;
				}else{
					var txt = '恭喜您抽中'+n_obj.name;
					if(n_obj.NUMBER){
						txt+='，兑换码：'+n_obj.NUMBER.NUMBER;
					}
					txt+='。';
					main.alert(txt,'',300);
				}				
			}
		}); 
	},
	scroll:function(){
		$('#note').find("ul:first").animate({
	        marginTop: "-52px"
	    }, 500, function () {
	        $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
	    });
	},
	autoScroll:function(obj) {
		var sItl = setInterval(function(){
			main.scroll();
		}, 3000);
		$('#note li').hover(
			//当鼠标放上去的时候,程序处理
			function(){
				$('#note ul li').css('color', '#f40078');
				clearInterval(sItl);
			},
			//当鼠标离开的时候,程序处理
			function(){
				$('#note ul li').css('color', '#4A4A4A');
				sItl = setInterval(function(){main.scroll();}, 3000);
			}
		);
	    
	},
	calcSlideTop:function(){
		$(window).bind("scroll",function(){
			var slide = $('#slide_r');
			var nh = ($(window).height() - slide.outerHeight())/2 + $(document).scrollTop();
			slide.css('top',nh+'px');
		});
	}
};

$('#slides').slidesjs({
	width: 637,
	height: 318,
	navigation: {
	  effect: "fade"
	},
	pagination: {
	  effect: "fade"
	},
	effect: {
	  fade: {
	    speed: 400
	  }
	},
	play: {
		active: true,
		// [boolean] Generate the play and stop buttons.
		// You cannot use your own buttons. Sorry.
		effect: "slide",
		// [string] Can be either "slide" or "fade".
		interval: 5000,
		// [number] Time spent on each slide in milliseconds.
		auto: true,
		// [boolean] Start playing the slideshow on load.
		swap: true,
		// [boolean] show/hide stop and play buttons
		pauseOnHover: true,
		// [boolean] pause a playing slideshow on hover
		restartDelay: 2500
		// [number] restart delay on inactive slideshow
	}
});


$(document ).ready(function(){
    main.autoScroll();
    main.calcSlideTop();

    $("#lotteryBtn").click(function(){
		main.clickRotate();
	}).rotate({ 
/*		   	bind: { 
			click: function(){alert('ddd');
				
			}
		 } */		   
	});

});
