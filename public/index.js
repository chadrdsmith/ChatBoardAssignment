window.onload = function(){
    var source = document.getElementById('greeting-template').innerHTML;
    var template = Handlebars.compile(source);
    var context = {name: 'Chad'};
    var compile = template(context);
    
    document.getElementById('g').innerHTML = compile;
    console.log(template(context));
};