$(function(){
//******左上角**********
	//Menu下拉
	$('#menu').mouseenter(function(){
		$('#menu ul').show();
		$('#menu .show').css('background','#ccc');

	});
	$('#menu').mouseleave(function(){
		$('#menu ul').hide();
		$('#menu .show').css('background','#F4F4F4');
	});
	
	//触碰li 变色
	$('#menu li').each(function(index,ele){
		$(ele).mouseenter(function(){
			$(ele).children().css('color','#333');
		});

		$(ele).mouseleave(function(){
			$(ele).children().css('color','#949494');
		});
	//触碰a变字
		var cn=$(ele).children().attr('cn');
		var en=$(ele).children().attr('en');
		$(ele).children().mouseenter(function(){
			$(ele).children().html(cn);
		});
		$(ele).children().mouseleave(function(){
			$(ele).children().html(en);
		});
	});
//***************************

//*********客服服务***********
	//下拉
	$('#customer').mouseenter(function(){
		$('#customer ul').show();
	});
	$('#customer').mouseleave(function(){
		$('#customer ul').hide();
	});
//*****************************

//********右上二维码****************
	//下拉
	$('#wechat').mouseenter(function(){
		$('#wechat #wenle').show();
	});
	$('#wechat').mouseleave(function(){
		$('#wechat #wenle').hide();
	});


	$('#cellphone').mouseenter(function(){
		$('#cellphone #yifan').show();
	});
	$('#cellphone').mouseleave(function(){
		$('#cellphone #yifan').hide();
	});
//***************************************

//************上搜索框********************
	$('nav input').css('color','#949494');
	var inputval=$('nav input').val();
	$('nav input').focus(function(){
		$(this).val(' ');
	});
	$('nav input').blur(function(){
		$(this).val(inputval);
	});

	//jsonp搜索
(function(){
	var oIpt=document.querySelectorAll('input')[0];
	var oSearch=document.querySelector('.search');
	var oUl=oSearch.getElementsByTagName('ul')[0];
	var oHead=document.getElementsByTagName('head')[0];
	var iNow=-1;
	var oldval='';//原来的值
	oIpt.oninput=oIpt.propertychange=function(){
		iNow=-1;
		oldval=this.value;
		var src='https://search.yohobuy.com/product/search/suggest?callback=jsonp&keyword='+this.value;

		var oScript=document.createElement('script');
		
		oHead.appendChild(oScript);
		oScript.src=src;
	}
	
	window.jsonp=function(str){
		// jsonp({
		// 	url:'sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
		// 	data:{word:oIpt.value},
		// 	success:function(str){
		var arr=str.data;
		console.log(arr);
		oUl.innerHTML='';
		for(var i=0;i<arr.length;i++){
		
			oUl.style.display='block';
			var oLi=document.createElement('li');
			oLi.innerHTML=arr[i];
			oUl.appendChild(oLi);

			//li点击
			oLi.onmousedown=function(){
				oIpt.value=this.innerHTML;
				oUl.style.display='none';
				location.href='https://www.baidu.com/s?wd='+this.innerHTML;
			}	
			//失去光标隐藏
			oIpt.onblur=function(){
				oUl.style.display='none';
			}
			oIpt.onfocus=function(){
				oUl.style.display='block';
			}
				
			
			oIpt.onkeydown=function(evt){
				evt=evt||window.event;

				var lio=oUl.children;
				if(lio.length>0){
					switch(evt.keyCode){
						case 38:
							
							iNow--;
							if(iNow==-2){
								iNow=lio.length-1;
							}
							addClear(lio);	
							return false;
							break;
						case 40:

							iNow++;
							if(iNow==lio.length){
								iNow=-1;
							}
							addClear(lio);
							break;
						case 13:
							// window.open('https://www.baidu.com/s?wd='+this.value,'_self');
							// 设置url地址
							location.href='https://www.baidu.com/s?wd='+this.value;
							break;
					}
				}
			}//onkeydown
			
		}//createli  for

	}//show

		function addClear(lio){
			for(var i=0;i<lio.length;i++){
				lio[i].style.background='';
			}	
			if(iNow>=0){
				lio[iNow].style.background='#ccc';
				oIpt.value=lio[iNow].innerHTML;	
			}else if(iNow==-1){
				oIpt.value=oldval;
			}
			
		}//addClear







	
})();


//*****************************************

//**********购物车*********************
	$('.car').mouseenter(function(){
		$('.car #list').show();
	});
	$('.car').mouseleave(function(){
		$('.car #list').hide();
	});
//****************************************

//**********LOGO******************************
(function(){
	var n=0;
	setInterval(function(){
		n++;
		var j=n*360;
		$('#logo .en').css('transform','rotateX('+j+'deg)')
		// console.log($('#logo .en').css('transform'));
		$('#logo .en').fadeOut();	
		$('#logo .cn').css('transform','rotateX(180deg)')
		$('#logo .cn').fadeIn();
		setTimeout(function(){
			n++;
		 var k=n*360;
		$('#logo .en').fadeIn();		
		$('#logo .en').css('transform','rotateX('+k+'deg)')
		$('#logo .cn').fadeOut();
		$('#logo .cn').css('transform','rotateX(360deg)')
		},3000)
	},10000);
})()

//*******************************************************

//********懒加载*****************************************
	
	$(window).on('load scroll resize',function(){
		var y=$(window).scrollTop()+$(window).innerHeight();
		$('img').each(function(index,ele){
			if($(ele).offset().top<=y){
				$(ele).attr('src',$(ele).attr('_src'));
			}
		});
	});

//*******************************************************


//*******banner轮播***********************************
(function(){
	var iNow=0;
	//箭头点击
	$('#next').on('click',next);
	$('#pre').on('click',pre);
	//自动轮播
	var tid=setInterval(next,5000);
	//触碰暂停--离开自动开始(big)
	$('.banner .big').mouseenter(function(){
		clearInterval(tid);
	});
	$('.banner .big').mouseleave(function(){
		tid=setInterval(next,5000);
	});
	//选项卡对应(small)
	$('.banner .small li').each(function(index,ele){
		$(ele).mouseenter(function(){
			iNow=$(this).index();
			clearInterval(tid);
			$('.banner .big li').hide();
			$('.banner .big li').eq(index).stop().fadeIn();
			$('.banner .small li div').removeClass('active');
			$(this).children().eq(1).addClass('active');
		});
	});	
	$('.banner .small li').mouseleave(function(){
		tid=setInterval(next,5000);
	});
	//next
	function next(){
		iNow++;
		if(iNow==$('.banner .big li').length){
			iNow=0;
		}
		$('.banner .big li').hide();
		$('.banner .big li').eq(iNow).stop().fadeIn();
		$('.banner .small li div').removeClass('active');
		$('.banner .small li div').eq(iNow).addClass('active');
	};
	//pre
	function pre(){
		iNow--;
		if(iNow==-1){
			iNow=$('.banner .big li').length-1;
		}
		$('.banner .big li').hide();
		$('.banner .big li').eq(iNow).stop().fadeIn();
		$('.banner .small li div').removeClass('active');
		$('.banner .small li div').eq(iNow).addClass('active');
	};
})();
//**************************************************************


//******************横向轮播show1*******************************
(function(){
	var iNow=0;
	$('.show1 ul').width(1160*$('.show1 li').length/3);
	$('.goodbrand .next1').on('click',next);
	$('.goodbrand .pre1').on('click',pre);
	//自动轮播
	var tid=setInterval(next,3000);
	//触碰暂停--离开自动开始(big)
	$('.show1 ul li').mouseenter(function(){
		clearInterval(tid);
		$('.show1 .arrow a').show();
		$('.show1 .arrow a').mouseenter(function(){
			$(this).css('background','#fff');
			$('.show1 .arrow a').show();
			clearTimeout(tid);
		});
		$('.show1 .arrow a').mouseleave(function(){
			$(this).css('background','rgba(255,255,255,0.8)');
			$('.show1 .arrow a').hide();
		});
	});
	$('.show1 ul li').mouseleave(function(){
		tid=setInterval(next,3000);
		$('.show1 .arrow a').hide();
	});
	function next(){
		iNow++;
		if(iNow==3){
			$('.show1 ul').animate({left:-(iNow+1)*1160},function(){
				$('.show1 ul').css('left',-1160);
			});
			iNow=0;
		}else{
			$('.show1 ul').animate({left:-(iNow+1)*1160});
		};
	};
	function pre(){
		iNow--;
		if(iNow==-1){
			$('.show1 ul').animate({left:-(iNow+1)*1160},function(){
					$('.show1 ul').css('left',(-3)*1160);
			});
			iNow=2;
		}else{
			$('.show1 ul').animate({left:-(iNow+1)*1160});	
		};
	};
})();
//*****************************************************************

//*************切换show2*****************************************

(function(){
	var page=$('.goodbrand .show2 li').attr('page');
	var f=$('.goodbrand .show2 li').attr('f');
	$('.np a').on('click',change);
	function change(){
		if(page==0){
			$('.goodbrand .show2 li:lt(18) img').stop().animate({'opacity':0},300,'linear',function(){
				$('.goodbrand .show2 li:lt(18)').hide();
				$('.goodbrand .show2 li:gt(17)').show();
				$('.goodbrand .show2 li:gt(17) img').css('opacity',1);
			});
			page=1;
		}else{
			$('.goodbrand .show2 li:gt(17) img').stop().animate({'opacity':0},300,'linear',function(){
				$('.goodbrand .show2 li:gt(17)').hide();
				$('.goodbrand .show2 li:lt(18)').show();
				$('.goodbrand .show2 li:lt(18) img').css('opacity',1);
			});
			page=0;
		}
	}

})();


//***************************************************************

//********右边固定定位******************************************
	$('.rightfixed span').click(function(){
		$('.rightfixed').hide();
	});

	//二维码
	$('.two').mouseenter(function(){
		$('.two .tc').show();
	});
	$('.two').mouseleave(function(){
		$('.two .tc').hide();
	});

	//左2类似吸顶条
	$(window).on('scroll resize',function(){
		if($(document).scrollTop()>0){
			$('.rightscroll').show();
		}else{
			$('.rightscroll').hide();
			
		}
	});

	//返回顶部
	$('.rightscroll .back').click(function(){
		$('html,body').animate({scrollTop:0},500,'linear');
		// console.log($(document).scrollTop())
	});

//*******************************************************************

//*******顶部选项卡**************************************************
(function(){
	$('nav .bottom li').each(function(index,ele){
			var tid=null;
		$(ele).mouseenter(function(){
			//延迟调用
			tid=setTimeout(function(){
				$(ele).children().eq(1).show();
			},300);
		});
		$(ele).mouseleave(function(){
			clearTimeout(tid);
			$(ele).children().eq(1).hide();
		});
	});
})();

//*******************************************************************

//*******************************************************************

//*******************************************************************

//*********************list左侧手风琴********************************
	$('.list .leftmax dl').each(function(index,ele){
		$(ele).children().eq(0).toggle(function(){
			$(ele).children().eq(0).siblings().slideDown();
			$(ele).children().eq(0).children().eq(0).css('transform','rotate(90deg)')
		},function(){
			$(ele).children().eq(0).siblings().slideUp();
			$(ele).children().eq(0).children().eq(0).css('transform','rotate(0deg)')
		});
	});

//********************************************************************

//****************list brand **************************************
	
	 $('.list .rightmax .brand .more1').click(function(){
	 	if($(this).html()=='更多<span></span>'){
			$(this).html('收起<span></span>');
			$(this).children().eq(0).css('transform','rotate(180deg)');
			$('.list .rightmax .brand .cent1 .ul1').hide();
			$('.list .rightmax .brand .cent1 .cent2').show();
	 	}else if($(this).html()=='更多<span style="transform: rotate(0deg);"></span>'){
			$(this).html('收起<span></span>');
			$(this).children().eq(0).css('transform','rotate(180deg)');
			$('.list .rightmax .brand .cent1 .ul1').hide();
			$('.list .rightmax .brand .cent1 .cent2').show();
	 	}else{
			$(this).html('更多<span></span>');
			$(this).children().eq(0).css('transform','rotate(0)');
			$('.list .rightmax .brand .cent1 .ul1').show();
			$('.list .rightmax .brand .cent1 .cent2').hide();
	 	}
	 });
	
	$('.list .rightmax .brand .morechoice').click(function(){
		$('.list .rightmax .brand .more').hide();
		$('.list .rightmax .brand .cent1 .ul1').hide();
		$('.list .rightmax .brand .cent1 .cent2').show();
		$('.list .rightmax .brand .cent1 .btn').show();
		$('.list .rightmax .brand .cent1 .scroll li input').show();
	});

	$('.list .rightmax .brand .cent1 .btn').children().eq(1).click(function(){
		$('.list .rightmax .brand .more1').html('更多<span></span>');
		$('.list .rightmax .brand .more1').children().eq(0).css('transform','rotate(0)');
		$('.list .rightmax .brand .more').show();
		$('.list .rightmax .brand .cent1 .ul1').show();
		$('.list .rightmax .brand .cent1 .cent2').hide();
		$('.list .rightmax .brand .cent1 .btn').hide();
		$('.list .rightmax .brand .cent1 .scroll li input').hide();
	});
	//联动变黑
	var mun=0;
	$('.list .rightmax .brand .cent1 .scroll li input').each(function(index,ele){
		$(ele).on('click',function(){
			if($(this).attr('checked')=='checked'){
				mun++;
			}else{
				mun--;
			}
			if(mun!=0){$('.list .rightmax .brand .btn a:nth-child(1)').css('backgroundColor','#000');}
			if(mun==0){$('.list .rightmax .brand .btn a:nth-child(1)').css('backgroundColor','#ccc');}
		})
	});





//***************list price  reg***********************************
(function(){
	var reg=/^\d+$/;
	$('.list .rightmax .price input').each(function(index,ele){
		
		$(ele).on('keyup',function(){
			if(reg.test($(ele).val())==false){
				$(ele).val('');
				$('.list .rightmax .price .btn').css('display','none');
			}else{
				$('.list .rightmax .price .btn').css('display','inline-block');
			}
		});
	});

})();


//********************************************************************

//************list size********************************************
	$('.size .more1').toggle(function(){
		$(this).html('收起<span></span>');
		$(this).children().eq(0).css('transform','rotate(180deg)');
		$('.size .sizebox').css({'height':150,'overflow-y':'scroll'});
	},function(){
		$(this).html('更多<span></span>');
		$(this).children().eq(0).css('transform','rotate(0)');
		$('.size .sizebox').css({'height':60,'overflow-y':'hidden'});
	});

//*****************************************************************
//*********list 高级选项***************************************
(function(){
	$('.adoption .com').each(function(index,ele){
		var triangle=$(ele).children().eq(1).children().eq(1);
		var x=10+$(ele).index()*91;
		var xheight=50+$(ele).children().eq(1).height();
		$(ele).on('mouseenter',function(){
			$(ele).children().eq(1).show();//大块显示
			$(ele).children().eq(0).hide();//三角隐藏
			triangle.css('left',x);//上箭头位置
			$('.adoption').css('height',xheight);//大盒子高度
		});
		$(ele).on('mouseleave',function(){
			$(ele).children().eq(1).hide();//大块hide
			$(ele).children().eq(0).show();//三角显示
			$('.adoption').css('height',40);//大盒子高度
			$('.adoption .opcard .btn').hide();//按钮隐藏
			$('.adoption .opcard input').hide();

		});
	});

	//复选框
	$('.adoption .opcard .more').click(function(){
		$(this).siblings().eq(0).children().children().show();
		$('.adoption .opcard .btn').show();
		$('.adoption').css('height',$('.adoption').height()+40);
	});
	$('.adoption .opcard .btn').children().eq(1).click(function(){
		$('.adoption .opcard input').hide();
		$('.adoption .opcard .btn').hide();
		$('.adoption .opcard').hide();
		$('.adoption .com').children().eq(0).show();
		$('.adoption').css('height',40);
	});
	//联动变黑
	var mun=0;
	$('.adoption .opcard input').each(function(index,ele){
		$(ele).on('click',function(){
			if($(this).attr('checked')=='checked'){
				mun++;
			}else{
				mun--;
			}
			if(mun!=0){$('.adoption .opcard .btn a:nth-child(1)').css('backgroundColor','#000');}
			if(mun==0){$('.adoption .opcard .btn a:nth-child(1)').css('backgroundColor','#ccc');}
		})
	});

})();

//***************************************************************************

//***********clothshow*******************************************************
(function(){
	$('.clothshow li').each(function(index,ele){
		$(ele).mouseenter(function(){
			if($(this).index()<$('.clothshow li').length-1){
				$(this).children().eq(0).addClass('all');
			}
			$('.clothshow .all .right .smallpic').slideDown();
			$('.clothshow .all').children().eq(1).show();
		})
		$(ele).mouseleave(function(){
			$('.clothshow .all').children().eq(1).hide();
			$('.clothshow .all .right .smallpic').hide();
			$(this).children().eq(0).removeClass('all');
		})
	});
})();

//************************************************************************
















































































});//ready