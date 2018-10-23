 // one page scroll

$(function() {

	var sections = $('.section'),
			display = $('.maincontent'),
			inScroll = false;

	var scrollToSection = function(sectionEq){
			var position = 0;

			if (!inScroll){

				inScroll = true;

				position = (sections.eq(sectionEq).index() *-100) + '%';
				// console.log(position);
				sections.eq(sectionEq).addClass('active')
					.siblings().removeClass('active');

				display.css({
					'transform' : 'translate3d(0, ' + position + ', 0)' 
				});

				setTimeout(function() {
					inScroll = false;

					$('.fixed__menu-item').eq(sectionEq).addClass('active')
						.siblings().removeClass('active');

				}, 1250)

			}

			
	}

	$('.wrapper').on('wheel', function(e) {
		
		var deltaY = e.originalEvent.deltaY,
				activeSection = sections.filter('.active'),
				nextSection = activeSection.next(),
				prevSection = activeSection.prev();

		if(deltaY>0){ //скроллим вниз
			
			if (nextSection.length){
				scrollToSection(nextSection.index());	
			}
			
		}

		if(deltaY<0){ //скроллим вверх


			if (prevSection.length){
				scrollToSection(prevSection.index());	
			}
				
		}

	});

	$('.arrow__down').on('click', function(e) {
		e.preventDefault();

		scrollToSection(1);
	});

	$('.fixed__menu-link, .order__link, .menu__link').on('click', function(e){
		e.preventDefault();

		var href = parseInt($(this).attr('href'));

		scrollToSection(href);


	});

	$(document).on('keydown', function(e){

		var deltaY = e.originalEvent.deltaY,
				activeSection = sections.filter('.active'),
				nextSection = activeSection.next(),
				prevSection = activeSection.prev();

		switch(e.keyCode){
			case 40: 
				if (nextSection.length){
					scrollToSection(nextSection.index());	
				}
				break;		

			case 38:

				if (prevSection.length){
					scrollToSection(prevSection.index());	
				}

				break;
		}

	});

});


//slider

$(function() {

	var burgerCarousel = $('.slider').owlCarousel({
		items : 1,
		loop : true
	});

	$('.arrow__right').on('click', function(e){
		e.preventDefault();
		burgerCarousel.trigger('next.owl.carousel');
	});

	$('.arrow__left').on('click', function(e){
		e.preventDefault();
		burgerCarousel.trigger('prev.owl.carousel');
	});

});


//vertical team acco

$(function(){
	$('.team-acco__trigger').on('click', function(e){
		e.preventDefault();

		var $this = $(this),
				item = $this.closest('.team-acco__item'),
				container = $this.closest('.team-acco'),
				items = container.find('.team-acco__item'),
				content = item.find('.acco__content'),
				otherContent = container.find('.acco__content');

		if(!item.hasClass('team-acco__item_active')){
			items.removeClass('team-acco__item_active');
			item.addClass('team-acco__item_active');
			otherContent.slideUp();
			content.slideDown();
		}	else{
			item.removeClass('team-acco__item_active');
			content.slideUp();
		}	
				
		
	});

});

$(function(){
	$('.menu-acco__trigger').on('click', function(e){
		e.preventDefault();

		var $this = $(this),
				container = $this.closest('.menu-acco'),
				item = $this.closest('.menu-acco__item'),
				items = container.find('.menu-acco__item'),
				activeItem = items.filter('.menu-acco__item_active'),
				content = item.find('.menu-acco__content'),
				activeContent = activeItem.find('.menu-acco__content');

		if (!item.hasClass('menu-acco__item_active')){

			items.removeClass('menu-acco__item_active');
			item.addClass('menu-acco__item_active');

			activeContent.animate({
					'width' : '0px'
			}, 300);

			content.animate({
					'width' : '550px'
			}, 300);

		} else{
			item.removeClass('menu-acco__item_active');
			content.animate({
					'width' : '0px'
			}, 300);
		}			

	});

	$(document).on('click', function(e){

		var $this = $(e.target);

		if(!$this.closest('.menu-acco').length) {

			$('.menu-acco__content').animate({
					'width' : '0px'
			}, 300);

			$('.menu-acco__item').removeClass('menu-acco__item_active');

		}

	});

});


//input mask

$(function(){
		$('.phone-mask').inputmask('+7 (999) 999 99 99');
})



//fancybox

$(function(){
	$('.review__button').fancybox({
		type : 'inline',
		width : 460,
		fitToView : false,
		padding : 0
	});

	$('.full-review__close').on('click', function(e){
		e.preventDefault();

		$.fancybox.close();

	});
});


// form submit
$(function(){
	$('#order__form').on('submit', function(e){
		e.preventDefault();

		var 
				form = $(this),
				formData = form.serialize();

		
		$.ajax({
			url: '../mail.php',
			type: 'POST',
			data: formData,
			success: function (data){
				
				var popup = data.status ? '#success' : '#error';
				console.log(popup);
			
					$.fancybox.open(
						[{src : popup}],
						{type : 'inline',
							maxWidth: 250,
							fitToView: false,
							padding: 0,
							afterClose : function () {
                      form.trigger('reset');
              }
						}
					);
				
			}

		})
		

	});

	 $('.status-popup__close').on('click', function (e) {
                e.preventDefault();
                $.fancybox.close();
    });
});


$(function(){
	ymaps.ready(init);
    var myMap;

    function init(){     
        myMap = new ymaps.Map("map", {
            center: [53.902145030835825,27.562198324218727],
            zoom: 13,
            controls : []
        });

        var coords = [
        			[53.90944329413029,27.57644621850582],
        			[53.91238251050052,27.55928008081051],
        			[53.90609841580992,27.548293752685503],
        ],
        myCollection = new ymaps.GeoObjectCollection({}, {
       		draggable: false,
       		iconLayout: 'default#image',
        	iconImageHref: '../img/icons/map-marker.svg',
        	iconImageSize: [46, 57],
        	iconImageOffset: [-26, -52]
     		});

        for(var i = 0; i<coords.length; i++){
        	myCollection.add(new ymaps.Placemark(coords[i]))
        }

        myMap.geoObjects.add(myCollection);
        myMap.behaviors.disable('scrollZoom');
    }
});
