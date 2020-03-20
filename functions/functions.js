function dropDowns(){
  $('.dropDownToggle').click(function(){
		$('.dropDownMenu').not($(this).next('.dropDownMenu')).fadeOut()
		$(this).next('.dropDownMenu').fadeToggle()
		$(this).parent().toggleClass('dropDownActive')
	})
	$('*').on('click', function(e) {
		if (!$(e.target).is('.dropDown, .dropDown *')){
			$('.dropDown').removeClass('dropDownActive')
			$('.dropDownMenu').fadeOut()
		}
	});		
}
function tabsTrigger(){
	$('.tab').addClass('visible')
	$('.tabsLinks a').click(function(){
		var $this = $(this)
		var getParent = $this.parents('.tabsMain')
		getParent.find('.tab').hide()
		getParent.find('.tabsLinks a').not($(this)).removeClass('active');
		$(this).addClass('active');
		getParent.find('.tabsHolder .tab:eq('+$(this).index()+')').slideDown()
	})
	$('.tabsMain').each(function(index, element) {
    $(this).find('.tabsLinks a:first').click()
  });
}
$(document).ready(function(e) {
	setTimeout(function(){
		tabsTrigger()
	}, 200)
	dropDowns()
	
	$('.leftSideBlock > a, .tcon').click(function(){
		
		$('.menuDropDown').slideToggle().toggleClass('visibleMenu')
		$('.leftSideBlock > a, .leftSideBlock > button').not($(this)).removeClass('activeMenuClick')
		$('.tcon-transform').not($(this)).removeClass('tcon-transform')
		$(this).toggleClass('activeMenuClick')
		if($('.activeMenuClick').length>0){
			$('.menuOpacity').fadeIn(400)
		}else{
			$('.menuOpacity').fadeOut(400)
		}
		var getTarget = $(this).data('target')
		$('.menuInner').not('.menuInner[data-menu='+getTarget+']').removeClass('activeLeftMenu')
		$('.menuInner[data-menu='+getTarget+']').toggleClass('activeLeftMenu')
	})
	$('.menuOpacity').click(function(){
		$('.activeLeftMenu').removeClass('activeLeftMenu')
		$('.tcon-transform').removeClass('tcon-transform')
		$(this).fadeOut()
		$('.leftSideBlock > a').removeClass('activeMenuClick')
	})
	$('.customSelectParent select').customSelect()
	$('.dropKickSelectParent select').dropkick({
  	mobile: true
	});
	
	$('.listingItem').each(function(){
		if($(this).find('.itemsLeft').length>0){
			$(this).addClass('withLeftItems')
		}
	})
});


function productsCarousel(){
	var a=$('#demo2carousel').elastislide(
		{
		start:0,orientation : 'vertical',minItems:4,onClick:function(c,d,e)
			{
			c.siblings().removeClass("active");
			c.addClass("active");
			a.setCurrent(d);
			e.preventDefault();
			var f=$('#demo2').data('imagezoom');
			f.changeImage(c.find('img').data('mediumimg'),c.find('img').data('largeimg'))
		}
		,onReady:function(){
			$('#demo2').ImageZoom({
				bigImageSrc:$('#demo2carousel li:first-child img').data('largeimg')
			});
			$('#demo2carousel li:eq(0)').addClass('active')
		}
	}
	);
}

function applySameHeights() {
		//alert(mediaqueryresponse(mql))
		//alert(mediaQueryList.matches + ' applySameHeights')
    //alert(2);
    /*if ($(window).width() > 600) {*/
		$('.sameHeightPads').each(function () {
				var tallest = 0;
				$(this).find('.sameHeightEntity')
						.css({ 'min-height': 'inherit' })
						.each(function () {
								//alert($(this).height())
								if (tallest < $(this).outerHeight()) {
										tallest = $(this).outerHeight();
								}
								//alert(tallest);
						});
					$(this).find('.sameHeightEntity').css({ 'min-height': tallest});
					$(this).find('.sameHeightEntity').attr({'data-height':tallest})
				//$(this).find('.sameHeightEntity a').css({ 'color':'red' });
				//$('div.sameHeight').css({'padding-bottom': 15});
		});
/*} else {
	$('.sameHeightEntity').css({ 'height': 'auto', 'min-height': 'inherit' });
}*/
}

$(document).ready(function(e) {
	
	$('.fullLinkVideo').click(function(e){
		e.preventDefault()
		var getHref = $(this).attr('href')
		$('.fullVideo').attr({'src':getHref}).fadeIn()
	})
	
	applySameHeights()
	$('.gridDisplay').click(function(){
		$(this).addClass('selected')
		$('.listDisplay').removeClass('selected')
		$('.productsList').removeClass('lisViewDisplay')
	})
	$('.listDisplay').click(function(){
		$(this).addClass('selected')
		$('.gridDisplay').removeClass('selected')
		$('.productsList').addClass('lisViewDisplay')
	})
	$('.threeDots').bind('click', function(){
		$('.activeDots').not($(this).parent()).removeClass('activeDots')
		$(this).parent().toggleClass('activeDots')
	})
	$('body').css({'padding-top':$('.topMenu').outerHeight()})
	
	$('.fancyboxLogin').fancybox({
		padding:0
	})
});


function fixSliderHeight(){
	$('.sliderContent').attr({'style':''})
	$('.sliderContent').height($(window).height()-(parseInt($('.sliderButtons').height())+parseInt($('.sliderContent').parents('.fp-tableCell').css('padding-top')))).css({'padding-top':($('.sliderContent').height()-$('.sliderContent .container').height())/2})
}
	$(window).load(function(){
		$(".customScrollbar").mCustomScrollbar({
			mouseWheel:{ deltaFactor: 600 }
		});
		fixSliderHeight()
	});
$(window).resize(function(){
	fixSliderHeight()
})