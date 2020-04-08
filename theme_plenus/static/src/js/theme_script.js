odoo.define('theme_plenus.plenus_script',function(require){
'use strict';
var sAnimations = require('website.content.snippets.animation');
	require('web.dom_ready');
	
	/* ---------- top menu hover dropdown  ---------- */
	// Moved this code from theme_ecommerce.js because it was not executing
	//when navbar was sticky then hover effect is not work 
	$(window).load(function(){
		$(function(){
		if ($(window).innerWidth() > 1200) {
			$("#top_menu > .dropdown").each(function(){
				if(! $(this).closest(".o_extra_menu_items").length ) {
					$(this).closest("a").click(function(){return false;});
			$(this).hover(            
	            function() {
	                $('> .dropdown-menu', this).stop( true, true ).fadeIn("slow");
	                $(this).toggleClass('open');
	            },
	            function() {
	                $('> .dropdown-menu', this).stop( true, true ).fadeOut("fast");
	                $(this).toggleClass('open');
	            }
		    );
				}
			})
		}
		$('.o_extra_menu_items .dropdown-menu').css("display","none")
		$('.o_extra_menu_items .dropdown').click(function(event){
			  event.stopImmediatePropagation();			
			  $(this).find(".dropdown-menu").toggle();
		});
	
	});
	
	//Remove images in extra menu
		$("li.o_extra_menu_items").find("img").removeAttr("src alt");
});
	/* ---------- Header top when transparent header  ---------- */
	$(window).load(function(){
		var header_before_height = $(".t_header_before_overlay").outerHeight();
		if($("body").find(".o_header_overlay").length > 0)
			{
				$("header:not(.o_header_affix)").addClass("transparent_top")
				$(".transparent_top").css("top",header_before_height);
				$(".o_header_affix.affix").removeClass("transparent_top")
			}
	})
	/*  ---------- Category mega menu ---------- */
	// Moved this code from theme_ecommerce.js because it was not executing
	$(window).load(function(){
     $("#custom_menu li").each(function(){
 		var has_ctg = $(this).find("ul.t_custom_subctg").length > 0
 		if(has_ctg){
 			$(this).append("<span class='ctg_arrow fa fa-angle-right' />")
 			
 			$(".ctg_arrow").click(function(ev){
 				ev.preventDefault();
 				ev.stopPropagation();
 				var self =$(this).siblings("ul.t_custom_subctg");
 				var ul_index=$(self).parents("ul").length;
 				$(self).stop().animate({
 				        width: "100%"
 				        });
 				$(self).css({"display":"block","transition":"0.3s easeout","z-index":ul_index})
 				$(self).parent().parent(".t_custom_subctg").css("overflow-y","hidden");
 				$(self).parent().parent(".t_custom_subctg").scrollTop(0);
 				$(this).parents("#custom_menu").scrollTop(0);
 				$(this).parents("#custom_menu").css("overflow-y","hidden");
 			})
 			$(this).find("ul.t_custom_subctg").children(".t_prent_ctg_heading").click(function(ev){ 
 				ev.preventDefault();
 				ev.stopPropagation();
 				$(this).parent("ul#custom_recursive").stop().animate({
 			        width: "0"
 			        },function() { 
 			           $(this).css("display","none")
 			           $(this).parent().parent(".t_custom_subctg").css("overflow-y","auto");
 			        }
 				);
 			})	   
 		}
 	})
});
 	$("#custom_menu > li > ul.t_custom_subctg > .t_prent_ctg_heading").click(function(){
 		 $(this).parents("#custom_menu").css("overflow-y","auto");
 	 })
	
	// Compare Script
	/*$('.o_product_comparison_table > span').text(function(_, txt) {
	  var min_height = $('#read_more').height();
	  var product_name_height = $('.o_product_comparison_table').height();
			 if(txt.length > 22) {
			 	$(this).attr("id","long_width");
			 	var temp_width = $(this).height();
			  	if(temp_width > 25)
			  	{	
				  	$(this).css({'width':'150px','white-space':'nowrap','overflow':'hidden','line-height':'1'});
					$(this).parents('#read_more').after().append("<a id='expand' href='' class='d-inline-block small'>..More</a>");
					$('#read_more > #expand').click(function(){
				  		if($(this).hasClass("less")) {
						  	$(this).parent().find('span').css({'width':'150px','white-space':'nowrap','overflow':'hidden','line-height':'1'});
				        	$(this).removeClass("less");
				            $(this).html('more');
			        } else {
			        	$(this).parent().find('span').css({'white-space':'unset','width':'100%','line-height':'unset','overflow':'unset'})
			        	$('.morecontent').css({'display':'inline-block'});
			            $(this).addClass("less");
			            $(this).html('less');
			        }
			        $(this).parent().prev().toggle();
			        $(this).prev().toggle();
			        return false;

				  	});
			  }
		}
	});*/
	
	// Portal script
	if($('div').hasClass('o_portal_my_home'))
	{   
		if(!$('a').hasClass('list-group-item') ) 
		{
			$(".page-header").css({'display':'none'})
		}
	}
	//product script
	$('#t_product_tabs li a:not(:first)').addClass('inactive');
	$('.t_product_tab').hide();
	
	$('#t_product_tabs li').each(function(){
		if(!$(this).find("a").hasClass('inactive'))
			{
			 var t = $(this).find("a").attr('id');
			 $('.'+ t + 'C').fadeIn('slow');
			}
	})
	$('#t_product_tabs li a').click(function(){
	    var t = $(this).attr('id');
	  if($(this).hasClass('inactive')){ 
	    $('#t_product_tabs li a').addClass('inactive');           
	    $(this).removeClass('inactive');
	    
	    $('.t_product_tab').hide();
	    $('.'+ t + 'C').fadeIn('slow').addClass('content_animation');
	 }
	});

	// border transition
	$('#t_product_tabs li:first a').addClass('current_tab');
	$('#t_product_tabs li a').on('click', function(){
    	$('li a.current_tab').removeClass('current_tab');
    	$(this).addClass('current_tab');
	});

	// if slider then active first slide
	if($('.recommended_product_slider_main').length){
		$(".theme_carousel_common").each(function(){
			$(this).find(".carousel-item").first().addClass("active");
		})
	}
	// if compare specification is active then active specification tab
	if($('#product_specifications').length){
		$('.specification_li').addClass("active");
	}
	// if rating is active then rating tab is active
	if($('.o_shop_discussion_rating').length){
		$('.rating_review_li').addClass("active");
	}
	// Change in carousel to display two slide
	
		$('.theme_carousel_common .carousel-item').each(function(){
			var next = $(this).next();
			if (!next.length) {
				next = $(this).siblings(':first');
			}
			next.children(':first-child').clone().appendTo($(this));
		});

	// shop script
	$(window).load(function(){
		$("form.js_attributes input:checked").each(function(){ 
			var self=$(this);
			var val=this.value;
			// For Radio Type
			var radio_attr = self.parent("label").find("span").html();
			var curr_parent=self.parents("ul");
			var target =  curr_parent.parent("li.nav-item").find("a.clear_all_variant");
			target.css("display","block");
			// For Color Only
			var color_attr = self.parent("label").next(".color-name").html();
			var target_color = self.parents("li.nav-item").find("a.clear_all_variant");
			target_color.css("display","block");
			// Show clear all(at top) link when any attribute is selected on load
			if(target.length >= 0 || target_color.length >=0){
				$(".clear_all_form_selection").css("display","block");
				// If any attributes are selected then show 'View Filter Button'
				$(".view_filter_span").css("display","inline-block");
				// Attribute value are display in view filter dropdown 
				if(radio_attr){
					$(".view_all_filter_inner").append("<div class='attribute'>" + radio_attr + "<a data-id='"+val+"' class='clear_attr_a'>x</a></div>");
				}
				if(color_attr){
					$(".view_all_filter_inner").append("<div class='attribute'>" + color_attr + "<a data-id='"+val+"' class='clear_attr_a'>x</a></div>");
				}
			}else{
				$(".clear_all_form_selection").css("display","none");
			}
			
			// Clear particular selected attribute(checkbox only)
			$(".clear_attr_a").click(function(){        			
				var id=$(this).attr("data-id");
				if(id){        				
					$("form.js_attributes input[value="+id+"]").removeAttr("checked");        				
					$("form.js_attributes input").closest("form").submit();        			
				}
			})
			// Change sequence of selected attribute to top
			var first_li = self.closest("ul").find("li").first();
			var selected_li = self.closest("li.nav-item");
			$(first_li).before(selected_li);
			
			// if any attribute are selected then automatically this section is Expand
			if(!curr_parent.hasClass("open_ul")){
				curr_parent.parent("li.nav-item").find('.t_attr_title').click();
			}
		});
		$("form.js_attributes select").each(function(){
			var self=$(this);
			var val = self.find("option:selected").val();
			var select_attr = self.find("option:selected").html();
			var target_select = self.parents("li.nav-item").find("a.clear_all_variant");
			if(val.length >= 1){
				target_select.css("display","block");
				$(".clear_all_form_selection").css("display","block");
				// If any attributes are selected then show 'View Filter Button'
				$(".view_filter_span").css("display","inline-block");
				// Attribute value are display in view filter dropdown 
				if(target_select){
					$(".view_all_filter_inner").append("<div class='attribute'>" + select_attr + "<a data-id='"+val+"' class='clear_attr_a'>x</a></div>");
				}
				self.parents("li.nav-item").find(".t_attr_title").click();
				
			}
			// Clear particular selected attribute(Selectionbox)
			$(".clear_attr_a").click(function(){        			
				var id=$(this).attr("data-id");
				if(id){        				
					$("form.js_attributes option:selected[value="+id+"]").remove();        				
					$("form.js_attributes input").closest("form").submit();        			
				}
			})
		})
		// Active first attribute section
		$(".t_shop_attr_ul > li.nav-item:first-child").each(function(){
			var self=$(this);
			var ul_main = self.find("ul");
			if (ul_main.length == 1){
				if(!ul_main.hasClass("open_ul")){
					self.find('.t_attr_title').click();
				}
			}
		})
		// Click to appear scrollbar to see all attributes  
		$(".view_more_attr").click(function(){
	            var self = this;
	            $(self).parent('li.nav-item').find("ul").css({
	                    "overflow": "auto"
	                });
	                $(self).animate({
	                    "opacity": "0"
	                }, 300, function() {
	                	$(self).addClass('d-none')
	                	$(self).parent('li.nav-item').find(".view_less_attr").removeClass( "d-none" )
	                	$(self).parent('li.nav-item').find(".view_less_attr").css("display","inline-block")
	                	$(self).parent('li.nav-item').find(".view_less_attr").animate({
	                        opacity: 1
	                    });
	                });
	        })
	       $(".view_less_attr").click(function(){
	            var self = this;
	            $(self).parent('li.nav-item').find("ul").css({
	                    "overflow": "hidden"
	                });
	                $(self).animate({
	                    "opacity": "0"
	                }, 300, function() {
	                	$(self).addClass('d-none')
	                	$(self).parent('li.nav-item').find(".view_more_attr").removeClass( "d-none" )
	                	$(self).parent('li.nav-item').find(".view_more_attr").css("display","inline-block")
	                	$(self).parent('li.nav-item').find(".view_more_attr").animate({
	                        opacity: 1
	                    });
	                });
	        })
	});
	// Clear individual attributes list
	$(".clear_all_variant").click(function(){
		var self=$(this);
		var curent_div = self.parents("li.nav-item");
		$(curent_div).find("input:checked").each(function(){
			$(this).removeAttr("checked");
		});
		$(curent_div).find("option:selected").each(function(){
			$(this).remove();
		})
		$("form.js_attributes input").closest("form").submit();
	});
	// Clear all attributes(form)
	$(".clear_all_form_selection").click(function(){
		$("form.js_attributes .t_shop_attr_ul > li").each(function(){
			var self=$(this);
			self.find("select option:selected").prop('selected', false);
			self.find("input:checked").prop('checked', false);
		})
		$("form.js_attributes").closest("form").submit();
	});
	// Click Filters to toggle div and show selected attribtues list 
	$(".view_filter_span").click(function(){
		$(".view_all_filter_inner").toggle("slow");
	})
	// Click on color name to also check color checkbox
	$(".color-with-name-divmaxW .color-name").click(function(){
		var self=$(this);
		self.parents("li.color-with-name-divmaxW").find("input").click();
	})
	// Collapse - Expand attribute section
	$(".t_attr_title").click(function(){
		var self=$(this);
		var main_li = self.parents("li.nav-item");
		var ul_H = main_li.find("ul").outerHeight();
		// If attribute type is selection box
		if (main_li.find("select").length == 1){
			var main_select = main_li.find("select");
			main_select.toggle('slow');
			var clicks = $(this).data('clicks');
			if (clicks) {
				self.find("i").removeClass('fa-caret-down').addClass('fa-caret-right');
			} else {
				self.find("i").removeClass('fa-caret-right').addClass('fa-caret-down');
			}
			$(this).data("clicks", !clicks);
			return;
		}
		var main_ul = main_li.find("ul");
		// If attribute type is radio or color
		// Toggle attribute section
		if(main_ul.hasClass("open_ul")){
			main_ul.removeClass("open_ul");
			self.find("i").removeClass('fa-caret-down').addClass('fa-caret-right');
			main_ul.toggle('slow');
			// hide view more
			main_li.find('.view_more_attr').removeClass('active');
			main_li.find('.view_more_attr').css("display","none");
		}else{
			main_ul.addClass("open_ul");
			self.find("i").removeClass('fa-caret-right').addClass('fa-caret-down');
			main_ul.toggle('slow');
			// show view more
			if(ul_H >= 125){
				main_li.find('.view_more_attr').addClass('active');
				main_li.find('.view_more_attr').css("display","inline-block");
			}
		}
	})
	// Hover on product item to active cart,quickview, wishlist
	if ($(window).width() > 1200) {
		$(".oe_grid.oe_product").mouseenter(function(){
			var self=$(this);
			var section_H = self.find("section").outerHeight();
			//self.find("section").css('height', + section_H);
			//self.find(".product_price").addClass("bottom_animation");
			self.find(".oe_product_image").css({"opacity":"0.2","transition":"1s"});
		});
		$(".oe_grid.oe_product").mouseleave(function(){
			var self=$(this);
			//self.find(".product_price").removeClass("bottom_animation")
			self.find(".oe_product_image").css("opacity","1");
		});
	}
	else
		{
			$(".product_price").addClass("bottom_animation");
		}
	//Shop filter slide left responsive
	$('.shop_filter_resp').click(function(){
		$("#products_grid_before").toggleClass("t_filter_slide");
		$("#wrapwrap").toggleClass("wrapwrap_trans");
		$('body').css("overflow-x","hidden");
	});
	$('.filter_close').click(function(){
		$("#products_grid_before").removeClass("t_filter_slide")
		$("#wrapwrap").removeClass("wrapwrap_trans");
	});

	//header style
	$(".t_srch_icon").click(function(){
		 $(".t_search_popover").addClass("visible");
		 $(this).css("display","none");
		 $(".t_srch_close").css("display","block");
	});
	$(".t_srch_close").click(function(){
		$(".t_search_popover").removeClass("visible");
		$(this).css("display","none");
		$(".t_srch_icon").css("display","block");
	});
	$(document).click(function(event) {
	 //if you click on anything except the modal itself or the "open modal" link, close the modal
		 if (!$(event.target).closest(".t_search_popover,.t_srch_icon_header").length) {
			$("body").find(".t_search_popover").removeClass("visible");
			$('.t_srch_close').css("display","none");
			$(".t_srch_icon").css("display","block");
			}
	});
	//Search Animation For Header Style 6
	if ($(".header_style_6_main").length){
		$(".header_6_srch_icon").click(function(){
			$(".t_header_before_right").addClass("search_animate");
			if ($(window).width() < 768) {
				$(".t_header_before_left").addClass("search_animate");
			}
			$(".t_header_search input").css("width","100%");
			setTimeout(function(){
				if ($(window).width() > 768) {
					$(".t_header_before_right").css("display","none");
				}else{
					$(".t_header_before_right").css("display","none");
					$(".t_header_before_left").css("display","none");
				}
				$(".t_header_search").css("display","block");
			}, 500);
		})
		$(".t_header_search_close").click(function(){
			$(".t_header_before_right").removeClass("search_animate").css("display","block");
			$(".t_header_before_left").removeClass("search_animate").css("display","block");
			$(".t_header_search").css("display","none");
			$(".t_header_search input").css("width","0%");
		})
	}
	// Vertical menu toggle	
    $('.te_bar_icon').click(function(){
		$(".te_vertical_menu").toggleClass("te_open");
		if($('.menu_vertical_option').length){
			$("#wrapwrap").addClass("te_menu_overlay");
		}
	});
	$('.te_menu_icon_close').click(function(){
		$(".te_vertical_menu").removeClass("te_open");
		$("#wrapwrap").removeClass("te_menu_overlay");
	});
	// Vertical menu position
	var $h_menu = $("#oe_main_menu_navbar").height();
	$(".te_vertical_menu").css({top:$h_menu + 0, bottom: 0, right: 0, position:'fixed'});
	
	/*expertise progress bar*/ 
	$(window).load(function(){
	$('.progress').each(function(){ 
		    	var area_val = $(this).find('.progress-bar').attr("aria-valuenow")
		    	$(this).find('.progress-bar').css("max-width",area_val+ "%")
		    })
	})
	
	/* customer carousel snippet */
	$(document).ready(function(){
		$('.carousel[data-type="multi"]').each(function() {
			$('#'+this.id).on('slide.bs.carousel', function (e) {
				var carousel_id =this.id;
				var $e = $(e.relatedTarget);
				var idx = $e.index();
				var itemsPerSlide = 4;
				var totalItems = $('#'+carousel_id).find('.carousel-item').length;
				if (idx >= totalItems-(itemsPerSlide-1)) {
				var it = itemsPerSlide - (totalItems - idx);
			        for (var i=0; i<it; i++) {
			        	if (e.direction=="left") {
			            	$(this).find('.carousel-item').eq(i).appendTo($(this).find('.carousel-inner'));
			            }
				        else {
				        	$(this).find('.carousel-item').eq(0).appendTo($(this).find('.carousel-inner'));
				        }
					}
				}
			});
	
			$('#'+this.id).carousel ({
			  interval: 10000
			})
		});
	})
	sAnimations.registry.WebsiteSale.include({
		/**
		* Adds the stock checking to the regular _onChangeCombination method
		* @override
		*/
		_updateProductImage: function (){
			
			this._super.apply(this, arguments);
			if ($(window).width() > 767) {
				if($('.carousel .vertical .carousel-item').length > 5)
					{
						$('.carousel .vertical .carousel-item').each(function(){
							  var next = $(this).next();
						
							  if (!next.length) {
							    next = $(this).siblings(':first');
							  }
							  next.children(':first-child').clone().appendTo($(this));
							  
							  for (var i=1;i<4;i++) {
							    next=next.next();
							    if (!next.length) {
							    	next = $(this).siblings(':first');
							  	}					    
							    next.children(':first-child').clone().appendTo($(this));
							  }							
						});
					}
				else
					{
						$('.carousel .vertical .carousel-item').each(function(){
							$(this).addClass("active");
						})
						$(".carousel-control-up, .carousel-control-down").addClass("d-none");
					}
				}
			else
				{
					$("#carousel-pager .vertical").addClass("carousel-indicators");
				}
			}, 	
	});
	/* ------------ quantity design in cart lines when promotion app installed -------------*/
	
	$(".t_cart_table .css_quantity > span").siblings("div").css("display","none")
	
	/*------- Price Filter -------*/

	    /*------------- Check on page lode if min and max values are correct or not ---------------*/
	  	if($(".price_filter_main_div").length){
	  		var get_min_val = $('input#price_slider_min').val();
	  		var get_max_val = $('input#price_slider_max').val();
	  		$("span.min-amount").html(parseInt(get_min_val));
	  		$("span.max-amount").html(parseInt(get_max_val));
	  		
	  		var current_min_val = $('input#price_range_min_value').val();
	  		var current_max_val = $('input#price_range_max_value').val();
	  		
	  		// Prevent Form From Getting Submit on change event of attributes
	  		$('input#priceRangeLower, input#price_range_min_value').change(function(ev) {
	  			ev.preventDefault();
	  			return false;
	  		})
	  		$('input#priceRangeUpper, input#price_range_max_value').change(function(ev) {
	  			ev.preventDefault();
	  			return false;
	  		})
	  		/* Allow only numbers and "." in calculator input fields */
	  		$.fn.inputFilter = function(inputFilter) {
	  			return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
	  				if (inputFilter(this.value)) {
	  			        this.oldValue = this.value;
	  			        this.oldSelectionStart = this.selectionStart;
	  			        this.oldSelectionEnd = this.selectionEnd;
	  				} else if (this.hasOwnProperty("oldValue")) {
	  					this.value = this.oldValue;
	  					this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
	  				}
	  		    });
	  		};
	  		
	  		$(".filter-price input#price_range_min_value, .filter-price input#price_range_max_value").inputFilter(function(value) {
	  			return /^-?\d*[0-9]?\d*$/.test(value);
	  		});
	  		
	  		/*----------- price filter(Form) validations to check enterrd ammount is correct or not ---------------*/
	  		$("#price_slider_form").click(function() {
	  			$('span#submit-error').removeClass("price_error_message");
	  			$('span#submit-error').html("");
	  			$('#price_range_min_value').css({'border-color': 'inherit', 'background': '#ffffff'});
	  			$('#price_range_max_value').css({'border-color': 'inherit', 'background': '#ffffff'});   
	  		
	  			if($("#price_range_min_value").val() == "" || $("#price_range_min_value").val() < parseInt(get_min_val) || $("#price_range_min_value").val() > parseInt(get_max_val) ) {
	  			    $('#price_range_min_value').css({'border-color': 'red', 'background': '#f2dede'});
	  			    $('span#submit-error').addClass("price_error_message");
	  			    $('span#submit-error').html("Invalid Input");
	  			    return false
	  			}
	  		
	  			if($("#price_range_max_value").val() == "" || $("#price_range_max_value").val() < parseInt(get_min_val) || $("#price_range_max_value").val() > parseInt(get_max_val)) {
	  			    $('#price_range_max_value').css({'border-color': 'red', 'background': '#f2dede'});
	  			    $('span#submit-error').addClass("price_error_message");
	  			    $('span#submit-error').html("Invalid Input");
	  			    return false
	  			}
	  		
	  			if(parseFloat($("#price_range_max_value").val()) <= parseFloat($("#price_range_min_value").val())) {
	  			    $('span#submit-error').addClass("price_error_message");
	  			    $('span#submit-error').html("Minimum amount can't be more or equal to maximum amount");
	  			    return false
	  			}
	  			else {
	  				$("form.js_attributes").submit();
	  			}
	  		})
	  		
	  		/* Change price range slider to change into the input box
	  		 * Also change the value if price result is active */
	  		
	  		var lowerSlider = document.querySelector('#priceRangeLower');
	  		var  upperSlider = document.querySelector('#priceRangeUpper');
	  		
	  		document.querySelector('#price_range_max_value').value = parseInt(upperSlider.value);
	  		document.querySelector('#price_range_min_value').value = parseInt(lowerSlider.value);
	  		
	  		var  lowerVal = parseInt(current_min_val);
	  		var upperVal = parseInt(current_max_val);
	  		
	  		upperSlider.oninput = function () {
	  		    lowerVal = parseInt(lowerSlider.value);
	  		    upperVal = parseInt(upperSlider.value);
	  		    if (upperVal < lowerVal + 4) {
	  		        lowerSlider.value = upperVal - 4;
	  		        if (lowerVal == lowerSlider.min) {
	  		        upperSlider.value = 4;
	  		        }
	  		    }
	  		    if(parseInt(this.value) <= lowerVal){
	  		    	$('span#submit-error').addClass("price_error_message");
	  		    	$('span#submit-error').html("Maximum amount can't be less or equal to minimum amount");
	  		    	document.querySelector('#price_range_max_value').value=lowerVal
	  		    }else{
	  		    	$('span#submit-error').removeClass("price_error_message").html('');
	  		    	document.querySelector('#price_range_max_value').value=parseInt(this.value)
	  		    }
	  		};
	  		
	  		lowerSlider.oninput = function () {
	  			lowerVal = parseInt(lowerSlider.value);
	  		    upperVal = parseInt(upperSlider.value);
	  		    if (lowerVal > upperVal - 4) {
	  		        upperSlider.value = lowerVal + 4;
	  		        if (upperVal == upperSlider.max) {
	  		            lowerSlider.value = parseInt(upperSlider.max) - 4;
	  		        }
	  		    }
	  		    if(parseInt(this.value) >= upperVal){
	  		    	$('span#submit-error').addClass("price_error_message");
	  		    	$('span#submit-error').html("Minimum amount can't be more or equal to maximum amount");
	  		    	document.querySelector('#price_range_min_value').value=upperVal
	  		    }else{
	  		    	$('span#submit-error').removeClass("price_error_message").html('');
	  		    	document.querySelector('#price_range_min_value').value=parseInt(this.value)
	  		    }
	  		};
	  		
	  		lowerSlider.value = lowerVal;
	  		upperSlider.value = upperVal;
	  	}
	  	
	/*-------- Changes when website search is installed -----------*/
	
	//Changed search form action in theme's search when website search is installed
	 $(window).load(function(){
			if($("body").find(".website_search_form_main").length > 0)
			{
				$(".t_header_search").each(function(){
					$(this).find("form").attr("action","/search-result");
				})
				$(".website_search_form_main").html("");
			}
	 })

	 /*------------------- Compare Read More----------------------*/
	 $(document).ready(function(){
    
        var maxLength = 26;
        var ellipsestext = "...";
        var moretext = "More";
        var lesstext = "less";
        $(".more").each(function(){
            var myStr = $(this).text();
            if($.trim(myStr).length > maxLength){
                var newStr = myStr.substring(0, maxLength);
                var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
                var html = newStr + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + removedStr + '</span>&nbsp;&nbsp;<a href="" class="read-more">' + moretext + '</a></span>';
                $(this).html(html);
            }
        });
        $(".read-more").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
        });
    });
});


