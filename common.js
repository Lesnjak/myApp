$(document).ready(function() {
// ////////////////formScrollTextInput//////////////
$('.userInput').on('focus',function () {


    $(this).parent().addClass('focus');
})
$('.userInput').on('blur',function () {

    if($(this).val()==''){

    $(this).parent().removeClass('focus')
    }

})
//////////////////video fon///////////////////////////////
//
    var videobackground = new $.backgroundVideo($('body'), {
        "align": "centerXY",
        "width": 1280,
        "height": 720,
        "path": "video/",
        "filename": "night",
        "types": ["mp4","ogg","webm"],
        "preload": true,
        "autoplay": true,
        "loop": true
    });


/////////////////////////drop down block//////////////////////////////


    $('.image article').on('click', function () {
        $('.descriptions').css({ 'height':'600px'});
        $('.all').css({ 'opacity':'0'});
    })

    $('.fa-times-circle').on('click', function () {
       $('.descriptions').css({'height':'0'});
       $('.all').css({ 'opacity':'1'});

    })
///////////////////////////drop down block add img & food name/////////////////////

$('.image article div ').on('click',function () {
    var attr= $(this).parent().children('img').attr('src');
    var foodName=$(this).parent().children('div').text();
    $('.img img').attr('src',attr);
    $('.img p:first-child').text(foodName);
})
    ///////////////get neme from local storage////////////////////////////////////

    var nameReal='';
    function showNames() {
        var Lockstore=localStorage.length;
        if(Lockstore>0){
            for(var i=0; i<Lockstore; i++){
                var key = localStorage.key(i);
                console.log();
                if(key.substring(0,4)=='tdl_'){
                    continue
                }
                else{
                    nameReal=key;
                }

            }
        }

    }
    showNames();

    ///////////////validation form and add agree block////////////////////////////////////

$('form button').on('click',function (e) {
    e.preventDefault();
    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if($('form #a').val()==''){
     $('#a').css('border-bottom','1px solid red');
     $('#a').on('focus',function () {
     $('#a').css('border-bottom','1px solid #a5a5a5');
     })

    }
     else if(($('form #b').val()=='')||(!pattern.test($('form #b').val()))){
        $('#b').css('border-bottom','1px solid red');
        $('#b').on('focus',function () {
        $('#b').css('border-bottom','1px solid #a5a5a5');
        })

    }
    else if($('form #c').val()==''){
        $('#c').css('border-bottom','1px solid red');
        $('#c').on('focus',function () {
        $('#c').css('border-bottom','1px solid #a5a5a5');
        })

    }
    else {
        var name=$('form #a').val();
        localStorage.setItem(name,name);
        $('header span').text(name);
        var formHeight=$('.dws-container').height()-48;
        var formWidth=$('.dws-container').width();
        $('form').css({'width':formWidth,'height':formHeight});
        $('.disNone').css('display','none');
        $('.agree').css('display','block');
        $('.text textarea').val('');
        $('.agree p').html($('form #a').val()+'<br> Вы зарегестрированы!<br>Теперь можете оставлять cвои комментарии<br><br>Если хотите выйти из своей учетной записи нажните кнопку');
        $('.agree input').on('click',function () {
            $('header span').text('');
            $('.agree').css('display','none');
            $('.disNone').css('display','block')
            $('form #a').val('');
            $('form #b').val('');
            $('form #c').val('');


        })

    }

})

///////////////////////////////////header add name///////////////////////////////

    $('header span').text(nameReal);



////////////////////////unic id for localstorege///////////////////////

var list=$('.prevComments ul');
var idmask='tdl_';
function showTasks() {
    var Lockstore=localStorage.length;
    if(Lockstore>0){
        for(var i=0; i<Lockstore; i++){
            var key = localStorage.key(i);
            if(key.indexOf(idmask)==0){
                $('<li></li>').attr('data-itemid',key).html(localStorage.getItem(key)).prependTo(list);
            }
        }
    }
    
}
showTasks();

////////////////////////add info in comments///////////////////////

$('.text button').on('click',function () {
    if($('header span').text()){
    if($('.text textarea').val().length>0){
    var id=0;
    var stars=""
    if($('.star-rating input:checked ').attr('value')==5){
        stars="*****";
    };
    if($('.star-rating input:checked ').attr('value')==4){
        stars="****";
    };
    if($('.star-rating input:checked ').attr('value')==3){
        stars="***";
    };
    if($('.star-rating input:checked ').attr('value')==2){
        stars="**";
    };
    if($('.star-rating input:checked ').attr('value')==1){
        stars="*";
    };
    var d=$('header span').text();
    var res='<p>'+d+' '+stars+'</p><p>'+$(new Date())[0]+'</p><p>Комментарий</p><p>'+$('.text textarea').val() +'</p>';
    list.children().each(function (index, el) {
        var letId= $(el).attr('data-itemid').slice(4);
        if(letId>id){
            id=letId;
        }
    })
    id++;
    localStorage.setItem(idmask+id, res);

    $('<li></li>').attr('data-itemid',idmask+id).html(res).prependTo(list);

    $('.text textarea').val('');

}
else {
    $('.text .redText').css('display','block');
}
}
else {
    $('.text textarea').val('Вам необходимо зарегестрироваться, заполните блок ВХОД / РЕГИСТРАЦИЯ');
}

})

    $('.text textarea').on('click', function () {
        $('.text .redText').css('display','none');
    })

})





