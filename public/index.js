$(document).ready(function() {
    
    // ajax request to delete posts
    $(document).on('click', '#btnPost', function (evt) {
        var id = $(this).data('id');
        // $target = $(evt.$target);
        //console.log(id);
        $.ajax({
            url: '/delete',
            type: 'DELETE',
            contentType: "application/x-www-form-urlencoded",
            data: 'id=' +id,
            success: function (result) {
                console.log('success')
            
                window.location.href='/users'},
            error: function (err) {
                console.log (err)}
        });
    });

    // button requests for settings page

    $(document).on('click', '#setClrBtn', function () {
        var clr = $(this).data('clr');
        console.log(clr);
        $('body').css('background-color', clr);
        $.ajax({
            url: '/setCookie',
            type: 'PUT',
            contentType: "application/x-www-form-urlencoded",
            data: 'clr=' +clr,
            success: function (result) {
                console.log('success')},
            
                //window.location.href='/settings'},
            error: function (err) {
                console.log (err)}


    });





});
  
});    