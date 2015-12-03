// Project: Brand AM
// Date Created:  17/02/2015 - E Rugalev


/*
 * Table of Contents
 *
 *  1. Global Functions and Vars
 *
 *  2. Document Ready
 *      2.1 init items counter in DownloadLis
 *      2.2 2.2 Adding Classes
 *		2.3 Visual asstes carousel
 *		2.4 Visual asstes carousel
 *		2.5 Download list (CLASSIC SKIN)
 *		2.6 Download list (MODERN SKIN)
 *		2.7 DEMO
 *
 *  3. Additional Plugins
 */


//---------------------------------------------------------------------------
//  1. GLOBAL FUNCTIONS
//---------------------------------------------------------------------------


// Slick slider global options
var slickOpts = {
		dots: true,
		fade: true,
		customPaging: function(slider, i) {
			if ($(slider.$slides).find('.slide-title').length > 0) {
				$(slider.$slider).addClass('customSlidesTitles');
				return '<button class="tab">' + $(slider.$slides[i]).find('.slide-title').text() + '</button>';
			} else {
				return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
			}
		}
	},
	// extending Slick Slider global options
	// with dynamic initial slide
	newInitialSlide;


// Unviversal CSS classes toggler for defined DOM els
// usage: stateSwitcher( elWhichIsClicked, elWhereToggleClass, name_of_class_to_toggle ); 
function stateSwitcher(elWhichIsClicked, elWhereToggleClass, className) {
	if ($(elWhichIsClicked).length) {
		$(elWhichIsClicked).on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			$(this).toggleClass('active');
			$(elWhereToggleClass).toggleClass(className);
			$(window).resize(function() {
				$('.gallery-download').attr('style','');
				if ($('.va-carousel').length) {
					var current = $('.va-carousel').slick('slickCurrentSlide');
					$('.va-carousel').slick('slickGoTo',current);
				}
			}).resize();
		});
	}
}

// Checkboxes behaviour func
var // leave empty if you want to take `text`-value from markup automatically
	// or use plural form of items name, etc.: `cars`
	pluralItemsName = '';

function checkboxesBehaviour(chbxContainer, chbxRow, chkAllEl, counterItem) {

	if ($(chbxContainer).length) {

		// `CHECK / UNCHECK ALL`-listener for checkbox in HEAD OF DOWNLOAD-LIST
		$(chbxContainer + ' ' + chkAllEl).on('change', function() {
			// set property as in `Check All`-element (= chckAllEl)
			$(chbxContainer + ' ' + chbxRow + ' [type="checkbox"]').prop('checked', $(this).prop("checked"));
			// status of checkbox in HEAD OF DOWNLOAD-LIST:
			//		1) if overall els quantity = all :checked els 
			//		2) or there is no :checked els
			if ($(chbxContainer + ' ' + chbxRow + ' [type="checkbox"]').length == $(chbxContainer + ' ' + chbxRow + ' [type="checkbox"]:checked').length || $(chbxContainer + ' ' + chbxRow + ' [type="checkbox"]:checked').length === 0) {
				$(this).next().removeClass('alfa-50');
			} else {
				$(this).next().addClass('alfa-50');
			}
			//counter
			dowloadListCounter(chbxContainer,chbxRow,counterItem);
		});

		// `CHECK / UNCHECK ALL`-behaviour for other items
		if ($(chbxContainer + ' ' + chbxRow + ' [type="checkbox"]').length) {
			$(chbxContainer + ' ' + chbxRow + ' [type="checkbox"]').on('change', function() {
				// status of checkbox in HEAD OF DOWNLOAD-LIST:
				//		1) if quantity of all els = all :checked els
				if ($(chbxContainer + ' ' + chbxRow + ' [type="checkbox"]').length == $(chbxContainer + ' ' + chbxRow + ' [type="checkbox"]:checked').length) {
					$(chbxContainer + ' ' + chkAllEl).prop('checked', 'checked').next().removeClass('alfa-50');
				} else if ($(chbxContainer + ' ' + chbxRow + ' [type="checkbox"]:checked').length === 0) {
				//		2) if there is no :checked els
					$(chbxContainer + ' ' + chkAllEl).prop('checked', '').next().removeClass('alfa-50');
				} else {
					$(chbxContainer + ' ' + chkAllEl).prop('checked', 'checked').next().addClass('alfa-50');
				}
				//counter
				dowloadListCounter(chbxContainer,chbxRow,counterItem);
			});
		}
	}
}

function dowloadListCounter(chbxContainer, chbxRow, counterItem) {
	
	// set `counterItem`-var as object 
	counterItem = $(counterItem);
		
	if ($(chbxContainer + ' ' + chbxRow + ' [type="checkbox"]:checked').length !== 0) {
		
		// set `text`-value for counter name
		if (pluralItemsName === '') {
			pluralItemsName = counterItem.find('span:last').text();
		}

		// enable `Download`-button
		$(chbxContainer + ' .download-btn').removeClass('pure-button-disabled');
		
		// show Counter with value
		counterItem.show(1, function() {
			counterItem.find('span:first').text($(chbxContainer + ' ' + chbxRow + ' [type="checkbox"]:checked').length);
			if ($(chbxContainer + ' ' + chbxRow + ' [type="checkbox"]:checked').length === 1) {
				counterItem.find('span:last').text(pluralItemsName.substr(0, pluralItemsName.length - 1));
			} else {
				counterItem.find('span:last').text(pluralItemsName);
			}
		});

	} else {

		// disable `Download`-button
		$(chbxContainer + ' .download-btn').addClass('pure-button-disabled');
		// hide counter
		counterItem.hide();
	}
}

// Download List load Previews (CLASSIC SKIN using `data-preview`)
var imgInitialPath = $('.download-preview img').attr("src");
$('.download-list tbody tr').on('click', function() {
	var imgPath = imgInitialPath + $(this).attr('data-preview');
	$('.download-preview img').attr("src", imgPath);
});

// Download List load Previews (MOdeRN SKIN using `active`-class for rows
$('.gd-content > ul li').on('click', function() {
	if (!$(this).hasClass('slick-slide') || !$(this).hasClass('active')) {
		$(this).addClass('active').siblings().removeClass('active');
	}
});



//---------------------------------------------------------------------------
//  2. DOCUMENT READY
//---------------------------------------------------------------------------

$(document).ready(function() {

		// ------ 2.1 init items counter in DownloadLis  -------------------
		dowloadListCounter('.download-list', 'td', '.download-list small');
		dowloadListCounter('.gallery-download', 'li', '.gallery-download small');



		// ------ 2.2 Adding Classes -------------------

		//add first classes
		$('table th:first-child, table td:first-child').addClass('first-child');

		//add last classes
		$('table th:last-child, table td:last-child').addClass('last-child');



		// ------ 2.3 Toggle BrandAM EVENT  ---------------
		// $(".wm-month").on('click','a', function(){
		$(".wn-month").on('click', function() {
			if (!$(this).hasClass('active')) {
				$(this).toggleClass('active').siblings().removeClass('active');
			}
		});



		// ------ 2.4 Visual asstes carousel  ---------------
		if ($('.va-carousel').length) {
			// Set the `min-height` for all `.gallery-download` container 
			if ($('.gallery-download').length) {
				$('.va-carousel').on('init', function(event, slider){
					$('.gallery-download').css('min-height', $(slider.$slider).height());
					// console.log(slider.listHeight/slider.slideCount);
				});
			}
			$('.va-carousel').slick(slickOpts);
		}


		// ------ 2.5 Download list (CLASSIC SKIN)  ---------------
		checkboxesBehaviour('.download-list', 'td', '#all-dwnld-items', '.download-list small');



		// ------ 2.6 Download list (MODERN SKIN)  ---------------
		if ($('.gallery-download').length) {

			// Toggle `Galery`-view
			$('#gdGalView').on('click', function(e) {
				e.preventDefault();
				if (!$('.gallery-download').hasClass('gal')) {
					
					// toggle this button state
					$(this).addClass('active').siblings().removeClass('active');

					// set `active` big preview
					if ($('.gd-content > ul li.active').length === 1) {
						newInitialSlide = {
							initialSlide: $('.gd-content > ul li.active').index()
						};
						$.extend( slickOpts, newInitialSlide );
						$('.gd-content > ul li.active').removeClass('active');
					}
					
					// toggle
					$('.gallery-download')
						.removeClass('list')
						.addClass('gal')
						.find('.gd-content > ul')
						// .addClass('va-carousel')
						.slick(slickOpts);
				}
			});

			// Toggle `List`-view
			$('#gdListView').on('click', function(e) {
				e.preventDefault();
				if (!$('.gallery-download').hasClass('list')) {

					// toggle this button state
					$(this).addClass('active').siblings().removeClass('active');

					// set `active` preview
					$('.slick-current').addClass('active');

					// toggle
					$('.gallery-download')
						.removeClass('gal')
						.addClass('list')
						.find('.gd-content > ul')
						// .removeClass('va-carousel')
						.slick('unslick');
				}
			});

		}

		checkboxesBehaviour('.gallery-download', 'li', '#dwnld-item-all', '.gallery-download small');



		//--------------------------------------------------------------
		// SLICK SLIDER SOLUTION: how to init .slick after display:none
		//--------------------------------------------------------------
		
			// COULD HELP IF
			// display none
			// is used
			//
			// BUT
			// you will need to rely on setTimeeout() function (jquery.appear) to trigger resizing
			// unfourtanetely

			// SOLUTION #1
			// set up Slick carousel
			// $('.gallery').has('img + img').slick({
			//     autoplaySpeed: 5e3,
			//     arrows: false,
			//     infinite: true,
			//     slide: 'img',
			//     slidesToScroll: 1,
			//     slidesToShow: 1,
			//     speed: 300,
			//     touchMove: false,
			// });
			
			// SOLUTION #2
			// // hook into Bootstrap shown event and manually trigger 'resize' event so that Slick recalculates the widths
			// $('[href="#gallery"]').on('shown.bs.tab', function (e) {
			//     $('.gallery').resize();
			// });

		//-----------------------------------------------------------------
		// END:SLICK SLIDER SOLUTION: how to init .slick after display:none
		//-----------------------------------------------------------------

		

		// ------ 2.7 DEMO  ---------------
		$('.style-toggle').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			$('.style-switcher').toggleClass('active');
		});

		$('.style-switcher').on('click', function(e) {
			e.stopPropagation();
		});

		if ($('.style-content > .nhl-skn').length) {
			if ($('body').hasClass('nhl-skin')) {
				$('.style-content > .nhl-skn').addClass('active');
			}
		}

		$(document).on('click', function() {
			if ($('.style-switcher').hasClass('active')) {
				$('.style-switcher').removeClass('active');
			}
		});

		stateSwitcher('.nhl-skn','body','nhl-skin');
		stateSwitcher('.alt-layt','body','alt-layout');


}); //end $(document).ready()