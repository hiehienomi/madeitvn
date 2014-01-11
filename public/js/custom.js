var url = window.location.href;
var urlHash = window.location.hash;

function openMadeItLightBox(lightboxId) {
    if(lightboxId === undefined) {
        $('.madeit_overlay').fadeIn(function() {
            $('.madeit_lightbox').fadeIn();
        });
    } else {
        $('.madeit_overlay').fadeIn(function() {
            $('#'+lightboxId).fadeIn();
        });
    }
    /* you must "return false" to prevent browser redirect when click on anchor */
    return false;
}

//function makeSelectedShoppingCartStep(urlHash) {
//    
//    $('.shopping_cart_step a[href="'+urlHash+'"]').trigger('click');
//    
//    $('.shopping_cart_step a').each(function() {
//        shopping_cart_step_bg = $(this).parent().find('.shopping_cart_step_bg');
//        if($(this).hasClass('selected')) {
//            step = shopping_cart_step_bg.text();
//            switch(step) {
//                case '3':
//                    $('#triggerTabNextClick, #updateShoppingCart, #triggerTabPrevClick').hide();
//                    $('#goHomeBtn').show();
//                    break;
//                case '2':
//                    $('#triggerTabNextClick').text('Tiếp tục');
//                    $('#shopping_cart_nexttabid').val('shopping_cart_step3');
//                    $('#triggerTabPrevClick').show();
//                    $('#updateShoppingCart').hide();
//                    $('#shopping_cart_prevtabid').val('shopping_cart_step1');
//                    break;
//                case '1':
//                    $('#triggerTabNextClick').text('Tiếp tục');
//                    $('#shopping_cart_nexttabid').val('shopping_cart_step2');
//                    $('#updateShoppingCart').show();
//                    $('#triggerTabPrevClick').hide();
//                    break;
//            }
//            shopping_cart_step_bg.css('background-position','0 0');
//        } else {
//            shopping_cart_step_bg.css('background-position','0 -30px');
//        }
//    });
//}

function replaceUrlHash(newUrlHash) {
    if(urlHash == '') {
        url = url+newUrlHash;
    } else {
        url = url.replace(urlHash, newUrlHash);
    }
    
    window.location.href = url;
    urlHash = newUrlHash;
}

function triggerTabClick(id)
{
    $( 'a[href="#' + id + '"]' ).trigger( 'click' );
}

$(document).ready(function() {
    
    if( $( '#reg_acc_form' ).length > 0 )
    {
        $( '#reg_login_tab a' ).click( function()
        {
            replaceUrlHash( $( this ).attr( 'href' ) );
        });
    }
    
    $( '.scroll-pane' ).jScrollPane();
    
    $( '.madeit_lightbox' ).css({
        'visibility': 'visible',
        'display': 'none'
    });
    
    $( '.listStatisticJob a' ).click( function()
    {
        target = $( this ).next();
        $( '.listStatisticJob ul' ).slideUp( function()
        {
            target.slideDown();
        });
    });
    
    $( '.sortTable th' ).each( function() 
    {
        $thWidth = $( this ).outerWidth();
        
        if( $( this ).find( '.sort' ).length > 0 ) 
        {
            $text = $( this ).find( '.sortText' );
            $sort = $( this ).find( '.sort' ).parent();
            $textPosLeft = parseInt(($thWidth - ($text.outerWidth() + 7)) / 2);
            $text.css({
                'position': 'absolute',
                'left': $textPosLeft + 'px',
                'top': 2 + 'px'
            });
            if( $( this ).find( '.sort' ).hasClass( 'sortDown' ) )
            {
                $sortPosTop = -3;
            }
            else if( $( this ).find( '.sort' ).hasClass( 'sortUp' ) )
            {
                $sortPosTop = 5;
            }
            else
            {
                $sortPosTop = 1;
            }
            $sort.css({
                'position': 'absolute',
                'left': ($text.outerWidth() + $textPosLeft + 10) + 'px',
                'top': $sortPosTop + 'px'
            })
        }
    });
    
    /* start shopping cart script page */
    
//    makeSelectedShoppingCartStep(urlHash);
//    
//    $('#triggerTabNextClick').click(function() {
//        newUrlHash = '#'+$('#shopping_cart_nexttabid').val();
//        makeSelectedShoppingCartStep(newUrlHash);
//        replaceUrlHash(newUrlHash);
//    });
//    
//    $('#triggerTabPrevClick').click(function() {
//        newUrlHash = '#'+$('#shopping_cart_prevtabid').val();
//        makeSelectedShoppingCartStep(newUrlHash);
//        replaceUrlHash(newUrlHash);
//    });
    
    /* end shopping cart script page */
    
    $('.comboBox select,.comboBoxMid select,.comboBoxSmall select').change(function(){
        $(this).parent().find('span').text($(this).find('option:selected').text());
    });
    
    $('.product_thumb a').click(function(){
        $('.product_large').attr('src',$(this).attr('href'));
        return false;
    });
    
    $('div.product').hover(function(){
        $('.product_hover',this).show();
    },function(){
        $('.product_hover',this).hide();
    });
    
    $('.cartBtn').click(function() {
        $('.minicart').slideDown();
        return false;
    });
    
    $('.addToFolder').click(function(){
        $(this).parent().find('.folderList').slideDown();
        return false;
    });
    
    var mouse_is_inside = false;
    $('.minicart, .folderList').hover(function () {
        mouse_is_inside = true;
    }, function () {
        mouse_is_inside = false;
    });

    $("body").mouseup(function () {
        if (!mouse_is_inside) {
            $('.minicart').slideUp();
            $('.folderList').slideUp();
        }
    });
    
    $('.hot_store .store').live('click',function() {
        var currentStore = $(this);
        var hottestStore = $('#hottest_store');
        var currentStore_target = currentStore.parent().find('.hottest_store');
        var hottestStore_target = hottestStore.parent().find('.store');
        
        hottestStore.hide();
        currentStore.hide();
        
        hottestStore.addClass('hidden_store').attr('id','');
        hottestStore_target.removeClass('hidden_store');
        
        currentStore.addClass('hidden_store');
        currentStore_target.attr('id','hottest_store').removeClass('hidden_store');
        
        hottestStore_target.show();
        currentStore_target.show();
    });
    
    $('input.datepicker').Zebra_DatePicker({
        format: 'd-m-Y'
    });
    
    $('.advTypeOpt').hide().css('visibility','visible');
    
    $('.advType').change(function() {
        var advType = this;
        $('.advTypeOpt').stop(true, true).slideUp();
        if(advType.checked) {
            $('#'+$(advType).attr('id')+'Opt').stop(true, true).slideDown();
        }
        $('.advType').each(function(){
            if(this.checked && this != advType) {
                $(this).prop('checked', false);
            }
        });
        
    });
    
    $('.shopping_cart_table .checkAll').change(function() {
        var tbl = $(this).parents('table');
        var checkAll = this;
        if(checkAll.checked) 
        {
            tbl.find('.checkMe').prop('checked', true);
        }
        else
        {
            tbl.find('.checkMe').prop('checked', false);
        }
    });
    
    $( '.madeit_form .multiselect select' ).change( function()
    {
        var selectedText = $(this).find(":selected").text();
        var selectedVal = $(this).val();
        $(this).find(":selected").attr('disabled','disabled');
        $(this).parents('.multiselect').append('<div class="relative rm_selected_block float_left margin_left_10" style="margin-top: 3px;"><a href="#" style="font-size: 10px; top: 2px; right: 6px; color: #fff;" class="absolute rm_selected">x</a><span class="block border_radius_5 rm_selected_text" style="background: #aaa; padding: 5px 20px; color: #fff;" rel="' + selectedVal + '">' + selectedText + '</span></div>');
    });
    
    $( '.rm_selected' ).live( 'click', function()
    {
        $( this ).parents( '.multiselect' ).find( 'option[value="' + $( this ).next().attr( 'rel' ) + '"]' ).removeAttr( 'disabled' );
        $( this ).parents( '.rm_selected_block' ).remove();
        return false;
    });
    
    $('.open_madeit_lightbox').click(function(){
        openMadeItLightBox();
        
        /* you must "return false" to prevent browser redirect when click on anchor */
        return false;
    });
    
    $('.madeit_lightbox_close, .madeit_overlay').click(function(){
        $('.madeit_lightbox').fadeOut(function(){
            $('.madeit_overlay').fadeOut();
        });
        
        /* you must "return false" to prevent browser redirect when click on anchor */
        return false;
    });
    
    $('.filebox input').change(function() {
        $(this).parent().prev().val($(this).val());
    });
    
    $('.tooltipHint').tooltip({
        track: true, 
        delay: 0, 
        showURL: false, 
        showBody: " - ", 
        fade: 250 
    });
    
    $('#checkAllPersonal').change(function(){
        if($(this).is(':checked') == true) {
            $('#listPersonal input[type="checkbox"]').attr('checked', true);
        } else {
            $('#listPersonal input[type="checkbox"]').attr('checked', false);
        }
    });
    
    var ie = (function(){

        var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
            );

        return v > 4 ? v : undef;

    }());
    
    if(ie < 9) {
        $('.madeit_form .textbox, .madeit_form .comboBox span').css({
            'border':'1px solid #ddd'
        });
        
    }
});