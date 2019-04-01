window.onload = function(){
   
   
//    var but = document.getElementById('btnPost');
//    but.addEventListener('click', function(){
           
//         var id = but.dataset.id;   
//        var params = 'id=' +id
//        var xhttp = new XMLHttpRequest;
//        xhttp.open("DELETE", '/delete', true);
//        xhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
//        xhttp.send(params);

//        sendIt();
       
       
       
//    }); 

   
};

function sendIt() {
    var xhr = new XMLHttpRequest;
    xhr.open("GET", '/users', true);
    console.log('sendit');
    xhr.send();
   }


// $(document).ready(function() {
//     $('#btnPost').on('click', function (evt) {
//         var id = $('')
//         $target = $(evt.$target);
//         console.log($target);
//     });
// });
  
      