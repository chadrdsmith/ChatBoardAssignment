$(document).ready(function() {

  // Ajax call to set background color for user based on Cookies
  
  $.ajax({
    url: '/currentUser',
    type: 'GET',
    success: function (username) {
        var ck = getCookie(username);
        if (ck) {
            $('body').css('background-color', ck )
        }
    },
    error: function (err) {
        throw new Error (err)}
    });

    // Event Listener for Direction button on settings page
    
    $(document).on('click', '#direction', function () {
        var dir = $(this).data('dir');
             
        $.ajax({
            url: '/setDirection',
            type: 'PUT',
            contentType: "application/x-www-form-urlencoded",
            data: 'dir=' +dir,
               
            success: function (result) {
                document.querySelector('.alert').style.display = 'inline';
                setTimeout(() => {
                document.querySelector('.alert').style.display = 'none';
                }, 2000);
                },
                error: function (err) {
                    throw new Error (err)}
        }); 
    });

    // Function to get Cookie
    
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    
    // Ajax request to delete posts

    $(document).on('click', '#btnPost', function (evt) {
        var id = $(this).data('id');
        
        $.ajax({
            url: '/delete',
            type: 'DELETE',
            contentType: "application/x-www-form-urlencoded",
            data: 'id=' +id,
            success: function (result) {
                window.location.href='/users'},
            error: function (err) {
                throw new Error (err)}
        });
    });

    // Ajax request for Admin to delete posts

    $(document).on('click', '#adminChatDelete', function (evt) {
        var id = $(this).data('id');
       
        $.ajax({
            url: '/deleteChat',
            type: 'DELETE',
            contentType: "application/x-www-form-urlencoded",
            data: 'id=' +id,
            success: function (result) {
                window.location.href='/chatroom'},
            error: function (err) {
                alert('You do not have permission to delete posts')
            }
        });
    });

    // ajax request for Admin to delete User

    $(document).on('click', '#delUser', function (evt) {
        var id = $(this).data('id');
           
        $.ajax({
            url: '/deleteUser',
            type: 'DELETE',
            contentType: "application/x-www-form-urlencoded",
            data: 'id=' +id,
            success: function (result) {
                window.location.href='/currentUsers'},
            error: function (err) {
                alert('You do not have permission to delete posts')
            }
            });
        });

    // Ajax request for Admin to disable User

      
    $(document).on('click', '#disUser', function (evt) {
        var id = $(this).data('id');
       
        $.ajax({
            url: '/disableUser',
            type: 'PUT',
            contentType: "application/x-www-form-urlencoded",
            data: 'id=' +id,
            success: function (result) {
                //window.location.href='/currentUsers'
                document.querySelector('.alert').style.display = 'inline';
                setTimeout(() => {
                document.querySelector('.alert').style.display = 'none';
                }, 2000);
                
            },
            error: function (err) {
                alert('You do not have permission to delete posts')
            }
        });
    });

    // Ajax request for buttons on settings page

    $(document).on('click', '#setClrBtn', function () {
        var clr = $(this).data('clr');
        $('body').css('background-color', clr);
        
        $.ajax({
            url: '/setCookie',
            type: 'PUT',
            contentType: "application/x-www-form-urlencoded",
            data: 'clr=' +clr,
            success: function (result) {
            },
            error: function (err) {
                console.log (err)}
        });
    });
});    



