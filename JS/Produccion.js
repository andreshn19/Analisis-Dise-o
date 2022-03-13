$("#showmenu").click(function(e){
    $("#menu").toggleClass("show");
});
$("#menu a").click(function(event){
    if($(this).next('ul').length){
event.preventDefault();
        $(this).next().toggle('fast');
        $(this).children('i:last-child').toggleClass('fa-caret-down fa-caret-left');
    }
});