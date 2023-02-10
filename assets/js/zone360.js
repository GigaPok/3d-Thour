'usestrict';

var lang = '';
var panotitleDiv = '';
var activeNode = '';

function removeEmpthyDivs (target) {
    var i;
    for (i = 0; i < target.length; i++) {
        
        $(target[i]).find("div:not([class])").replaceWith(function() { return this.innerHTML; });
        $(target[i]).replaceWith(function() { return this.innerHTML; });
        
    } 
}

function removeEmpthyDiv (target) {
    var i;
    for (i = 0; i < target.length; i++) {
        $(target[i]).removeAttr('style').removeClass('ggskin ggskin_container ggskin_text ggskin_text').find('br').remove();
        $(target[i]).find("div:not([class])").replaceWith(function() { return this.innerHTML; });
    } 
}

function changeNodeTitle() {
    switch (pano.getVariableValue('lang')) {
        case 0:
            panotitleDiv.text(pano.getNodeUserdata(activeNode).title);
        break;
        case 1:
            panotitleDiv.text(pano.getNodeUserdata(activeNode).description);
        break;            
        case 2:
            panotitleDiv.text(pano.getNodeUserdata(activeNode).author);
        break;        
    }
}

function ul(target) {
    var tmpHTML = '';

    var i;
    for (i = 0; i < target.length; i++) {
        tmpHTML = $(target[i]).innerHTML;

        if (innerHTML == 'undefined') 
        {
            $('div.ul').replaceWith('<ul></ul>');  
        }

        else {
            $('div.ul').replaceWith($('<ul>' + this.innerHTML + '</ul>'));
        }
    }
    
}

function modifyUl(target) {
    var tmpHTML = '';

    var i;
    for (i = 0; i < target.length; i++) {
        tmpHTML = $(target[i]).attr('class');

        $(target[i]).replaceWith(function() { return '<ul class="'+tmpHTML+'">'+this.innerHTML+'</ul>'; });
    }
    
}

function appendUl1() {
    var target = $('.sub-1');
    var targetLenght = target.length;
    for (var i = 0; i < targetLenght; i++) {
        $(target[i]).append($(target[i]).next('.sub-menu'));     
        $(target[i]).children('.sub-menu').replaceWith(function() { return '<ul>'+ this.innerHTML+'</ul>'; });   
    }
}

function appendUl2() {
    var target = $('.sub-2');
    var targetLenght = target.length;
    for (i = 0; i < target.length; i++) {
        if (
            $(target[i]).next('.sub-sub-menu')
        )
        {
           
        }
        $(target[i]).append($(target[i]).next('.sub-sub-menu'));     
        $(target[i]).children('.sub-sub-menu').replaceWith(function() { return '<ul>'+ this.innerHTML+'</ul>'; });
        //     tmpElement = $(target[i]).next('ul');

        // $(target[i]).append(tmpElement);
        
        
    }
}

function checkActiveMenuItem() {
    var curreentNode = pano.getCurrentNode();
    $('.d-arrow').removeClass('d-down');
    $('li.active, a, ul, span').removeClass('active');
    $('ul').css({'display': ''});
    $('[data-target='+curreentNode+']').children('a').addClass('active');
    $('[data-target='+curreentNode+']').addClass('active').closest('ul').css({
       'display' : 'block'
    });
    $('[data-target='+curreentNode+']').parent('ul').prev('.dropdown-heading').addClass('active').find('.d-arrow').addClass('d-down lama');
    
    $('[data-target='+curreentNode+']').parent('ul').parent('li').parent('ul').css({
       'display' : 'block'
    });
    $('[data-target='+curreentNode+']').parent('ul').parent('li').parent('ul').prev('.dropdown-heading').addClass('active');
    $('[data-target='+curreentNode+']').parent('ul').parent('li').parent('ul').prev('.dropdown-heading').find('.d-arrow').addClass('d-down');
    $('[data-target='+curreentNode+']').parent('ul').parent('li').parent('ul').prev('.dropdown-heading').parent('li').addClass('active');
    $('[data-target='+curreentNode+']').parent('ul').prev('span').find('.d-arrow').addClass('d-down');
 }

pano.on('configloaded', function() {
    removeEmpthyDivs(['.sub-sub-menu > .delete']);
    removeEmpthyDivs(['.sub-menu > .delete']);
    removeEmpthyDivs(['.delete']);
    removeEmpthyDiv(['.clean']);
    modifyUl(['.ul-menu','.sub-menu']);
    appendUl1([$('.sub-1')]);
    appendUl2(['.sub-2']);
    modifyUl(['.sub-sub-menu']);
    $('.remove').remove();
    panotitleDiv = $('.pano-title');
    activeNode = pano.getCurrentNode();
    lang = pano.getVariableValue('lang');
    changeNodeTitle();

    $.getScript( "assets/js/jquery.jside.menu.js", function() {
        $(function(){
            $(".menu-container").jSideMenu({
                jSidePosition: "position-left", //possible options position-left or position-right
                jSideSticky: true, // menubar will be fixed on top, false to set static
                jSideSkin: "default-skin", // to apply custom skin, just put its name in this string
            });
         }); 
    })
    .done(function() {
        // $("#loader").fadeOut("normal", function() {
        //     $(this).remove();
        // });
        checkActiveMenuItem();
    });

    $('li').on('click', function() {
        var tmpDataTarget = $(this).attr('data-target');
        if (
            tmpDataTarget != '' &&
            tmpDataTarget != null &&
            tmpDataTarget != 'undefined' 
            )
        {
            pano.openNext('{'+ $(this).attr('data-target')+'}');
        }
    });

    pano.on('varchanged_lang', function() {
        changeNodeTitle();
    });

    pano.on('changenode', function() {
        activeNode = pano.getCurrentNode();
        changeNodeTitle();
    });
    function closeMenu() {
        $('.menu-container, .menu-head').removeClass('side open');
     }
});
