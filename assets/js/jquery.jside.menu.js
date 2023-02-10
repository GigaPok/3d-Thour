(function($){
   var openByStart = true; // Show / hide menu on start !!!

   $.fn.jSideMenu = function(options){
   var setting = $.extend({
   		   jSidePosition: "position-left", //possible options position-left or position-right 
           jSideSticky: true, // menubar will be fixed on top, false to set static
           jSideSkin: "default-skin", // to apply custom skin, just put its name in this string
           
		   jSideTransition: 400, //Define the transition duration in milliseconds 
  
  	}, options);
  
  return this.each(function() {
  var jSide, target, headHeight, devHeight, arrow, dimBackground;   
   target = $(this);
		
//Accessing DOM
  jSide = $(".menu-container, .menu-head");

  //hidddenByStart ? $(jSide).addClass('open') : $(jSide).removeClass('open');
  
  devHeight = $(window).height();
  headHeight = $(".menu-head").height();
  dHeading = $(".dropdown-heading");
  menuTrigger = $(".menu-trigger");
  arrow = $("<i></i>");
  dimBackground = $("<div>");
  
// Set the height of side menu according to the available height of device
$(target).css({
    //'height' : devHeight-headHeight
});

    if (setting.jSideSticky == true){
     //$(".menubar").addClass("sticky");
}  else{
     //$(".menubar").removeClass("sticky");
   }

$(".menubar").addClass(setting.jSideSkin);
 $(jSide).addClass(setting.jSideSkin).addClass(setting.jSidePosition);

   if ($(jSide).hasClass("position-left")){
$(".menu-trigger").addClass("left").removeClass("right");
     }
  else{
$(".menu-trigger").removeClass("left").addClass("right");
   }

//Dropdown Arrow
    $(arrow).addClass("material-icons d-arrow").html("keyboard_arrow_down").appendTo(dHeading);
    checkActiveMenuItem();
//Dim Layer	
    $(dimBackground).addClass("dim-overlay").appendTo("body");
//Dropdowns
$(dHeading).click(function(){
 });

 
$('.has-sub.first-element > .dropdown-heading').click(function(){
   $('.has-sub.first-element > .dropdown-heading').not(this).next('ul').css({'display':'none'}).removeClass('active');
   $('.has-sub.first-element > .dropdown-heading').not(this).removeClass('active');
   $(this).toggleClass('active');
   $(this).next('ul').slideToggle(setting.jSideTransition);
   $('.has-sub.first-element > .dropdown-heading').not(this).find(".d-arrow").removeClass('d-down');
   $(this).find(".d-arrow").toggleClass("d-down");  
});

$('.has-sub.sub > .dropdown-heading').click(function(){
   $('.has-sub.sub > .dropdown-heading').not(this).next('ul').css({'display':'none'});
   $('.has-sub.sub > .dropdown-heading').not(this).removeClass('active');
   $(this).toggleClass('active');
   $(this).next('ul').slideToggle(setting.jSideTransition);
   
   $('.has-sub.sub > .dropdown-heading').not(this).find(".d-arrow").removeClass('d-down');
   $(this).find(".d-arrow").toggleClass("d-down"); 
});


$('.has-sub ul li a').click(function(){
   $('.has-sub ul li a').removeClass('active');
   $(this).addClass('active');
});

$(menuTrigger).click(function(){
   $('.menu-container, .menu-head').removeClass('side');
   $('.menu-body, .menu-container, .menu-head, .menubar').removeClass('hide');
   $(jSide).toggleClass("open");
   //$(dimBackground).show(setting.jSideTransition);
   $(".menu-body").removeClass("visibility");
   $('.menu-close').addClass("visibility");
});

if (
   $(window).width() > 600 &&
   openByStart == true
)
{  
  // $(menuTrigger).trigger('click');
  $('.menu-body, .menu-container, .menu-head, .menubar').removeClass('hide');
  $(".menu-body").addClass("visibility");
  $('.menu-close').addClass("visibility");
  $('.menu-container, .menu-head').addClass('side');
}

else {
   $('.menubar').removeClass('hide');
}

$('.hts').on('click touchstart', function() {
   $('.menu-container, .menu-head').removeClass('side');
   $(jSide).removeClass("open");
   $('.menu-close').removeClass("visibility");
});

$('.menu-close').on('click touchstart', function() {
   $('.menu-container, .menu-head').removeClass('side');
});

//close menu if user click outside of it
   // $(window).click(function(e) {
   //    if ($(e.target).closest('.menu-trigger').length){
   //       return;
   //    }
   //    if ($(e.target).closest(jSide).length){
   //       return;
   //    }
    
   //    //$(jSide).removeClass("open");
   //    if (!$(jSide).hasClass("open")) {
   //       //$(dimBackground).hide(setting.jSideTransition);
   //    }
   //    // $(".menu-body").addClass("visibility");
   //    //$('.menu-close').removeClass("visibility");
   //    });
   });

   
 };

 $('.menu-close').click(function(e) {
   $(".menu-container, .menu-head").removeClass("open");
   if (! $(".menu-container, .menu-head").hasClass("open")) {
      
   }
   $(".menu-body").addClass("visibility");
   $('.menu-close').removeClass("visibility");
 });

 $('li > a').on('click tap', function() {
   $(".menu-container, .menu-head").removeClass("open");
   $(".menu-body").addClass("visibility");
   $('.menu-close').removeClass("visibility");
});

var nodeImg = $('div.node-img > img');

$('li').on('mouseenter', function() {
   var url = '';
   $('.node-img').css({
     left: 310
   });
   if (
     $(this).attr('data-target') == undefined ||
     $(this).attr('data-target') == null ||
     $(this).attr('data-target') == 'undefined' ||
     $(this).attr('data-target') == ''
   )  {
     $('.node-img').removeClass('active').css({
        left: 310
     }).stop();
   }
   else {
     //url = $(this).attr('data-image');
     var offset = $(this).offset();
     var top = offset.top - 62.5 + ($(this).height()/2);

     var tmpDataTarget = $(this).attr('data-target');
     var prefix ='images/thumbnail_nodeimage_';
     var suffix = '.jpg';
     nodeImg.attr('src', prefix+tmpDataTarget+suffix);


    // $('.node-img > img').attr('src', url);
     $('.node-img').css({
        'top': top
     })
     .addClass('active').stop().animate({
        left: 300
     }, 200);
     
   }


  console.log($(this).attr('data-image'));
});

$('li').on('mouseleave', function() {
  $('.node-img').removeClass('active').css({
     left: 310
  }).stop();
});

$('.menu-items > li').on('click tap', function(e) {
   
  $('.menu-items > li').not(this).removeClass('active').children('ul').css({'display':'none'});
  $('.menu-items > li').not(this).children('span').removeClass('active');
  $('.menu-items > li').removeClass('active');
  $('.node-img').removeClass('active');
  $(this).addClass('active');

  $('.menu-items > li').not(this).find('i').removeClass('d-down');
  $('.menu-items > li').not(this).find('.dropdown-heading').removeClass('active');
  $('.menu-items > li').not(this).find('.dropdown-heading').next('ul').css('display','');
  
});

$("[data-target]").on('click tap', function () {
   $('.menu-container, .menu-head').removeClass('side open');
});

$(".close-menu").on('click tap', function () {
   $('.menu-container, .menu-head').removeClass('side open');
   $('.menu-close').removeClass("visibility");
});

function closeMenu() {
   alert('sg');
   $('.menu-container, .menu-head').removeClass('side open');
   $('.menu-close').removeClass("visibility");
}



pano.on('changenode', function() {
   checkActiveMenuItem();
});


})(jQuery);


