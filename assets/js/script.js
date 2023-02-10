function addSwiper() {
	$(function(){
		var swiper = new Swiper('.carousel-gallery .swiper-container', {
		  effect: 'slide',
		  speed: 900,
		  slidesPerView: 1,
		  spaceBetween: 20,
		  simulateTouch: true,
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		  autoplay: {
		    delay: 3000,
		    stopOnLastSlide: false,
		    disableOnInteraction: true
		  },
		});
	});	

	$('.carousel-gallery > .center').on('click touchstart', function() {
		pano.setVariableValue('infopanel', false);
	});
}

// Variables

var testObject = [];
var imgArray = [];
var captionsArray = [];
var tmpString = [];
var finalStringArray = [];

var getFromBetween = {
    results:[],
    string:"",
    getFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var SP = this.string.indexOf(sub1)+sub1.length;
        var string1 = this.string.substr(0,SP);
        var string2 = this.string.substr(SP);
        var TP = string1.length + string2.indexOf(sub2);
        return this.string.substring(SP,TP);
    },
    removeFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
        this.string = this.string.replace(removal,"");
    },
    getAllResults:function (sub1,sub2) {
        // first check to see if we do have both substrings
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

        // find one result
        var result = this.getFromBetween(sub1,sub2);
        // push it to the results array
        this.results.push(result);
        // remove the most recently found one from the string
        this.removeFromBetween(sub1,sub2);

        // if there's more substrings
        if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
            this.getAllResults(sub1,sub2);
        }
        else return;
    },
    get:function (string,sub1,sub2) {
        this.results = [];
        this.string = string;
        this.getAllResults(sub1,sub2);
        return this.results;
    }
};

function fancyInfo() {
	$('.menu-container, .menu-head').removeClass('side');
	imgArray = [];
	testObject = [];
	imgArray = pano.getVariableValue('data').split('||');

	for (let i = 0; i < imgArray.length; i++) {
		testObject.push(
			{
				src : imgArray[i], type: 'html'
			}
			)
	  } 

	$.fancybox.open(
		testObject
	, {
		loop : false,
		// buttons: [  // Modify Buttons here - > just add // before line
		// 	"zoom",
		// 	"share",
		// 	"slideShow",
		// 	"fullScreen",
		// 	"close"
		// ]
	});

	$('.menu-container, .menu-head').removeClass('side open');
	$('.menu-close').removeClass("visibility");
}

function fancyGallery() {
	$('.menu-container, .menu-head').removeClass('side');
	imgArray = [];
	testObject = [];
	tmpString = [];
	captionsArray = [];

	tmpString = pano.getVariableValue('data');
	var count = tmpString.split("[").length - 1;

	captionsArray.push(getFromBetween.get(tmpString,"[","]"));

	imgArray = tmpString.split(',');
	//console.log(imgArray);

	var finalString = tmpString;

	for (let i = 0; i < count; i++) {
		finalString = finalString.replace(captionsArray[0][i], "");
		finalString = finalString.replace('[]', "");
	}

	finalStringArray = finalString.split(',');
	console.log(finalStringArray); // všetky obrázky
	console.log(captionsArray); // všetky popisy

	for (let i = 0; i < finalStringArray.length; i++) {
		testObject.push(
			{
				src : finalStringArray[i], type : 'image',
				opts : {
					thumb   : finalStringArray[i],
					caption: captionsArray[0][i]
				}
			}
		)
	}

	$.fancybox.open(
		testObject
	, {
		loop : false
	});
}

function fancyVideo() {
	$('.menu-container, .menu-head').removeClass('side');
	imgArray = [];
	testObject = [];
	imgArray = pano.getVariableValue('data').split(',');

	for (let i = 0; i < imgArray.length; i++) {
		testObject.push(
			{
				src : imgArray[i]
			}
		)
	} 

	$.fancybox.open(
		testObject
	, {
		loop : false,
		// buttons: [ // Modify Buttons here - > just add // before line
		// 	"zoom",
		// 	"share",
		// 	"slideShow",
		// 	"fullScreen",
		// 	"thumbs",
		// 	"close"
		// ]
	});
}

function fancyIframe() {
	$('.menu-container, .menu-head').removeClass('side');
	imgArray = [];
	testObject = [];
	imgArray = pano.getVariableValue('data').split(',');

	for (let i = 0; i < imgArray.length; i++) {
		testObject.push(
			{
				src : imgArray[i], type : 'iframe'
			}
		)
	} 

	$.fancybox.open(
		testObject
	, {
		loop : false,
		// buttons: [ // Modify Buttons here - > just add // before line
		// 	"zoom",
		// 	"share",
		// 	"slideShow",
		// 	"fullScreen",
		// 	"thumbs",
		// 	"close"
		// ]
	});
}