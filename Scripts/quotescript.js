document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#back-button').addEventListener('click', function(){
        window.location.href = '../index.html';
    });
});
$(document).ready(function(){
    var category = 'love';
    $.ajax({
        method:'GET',
        url:'https://api.api-ninjas.com/v1/quotes?category=' + category,
        headers: { 'X-Api-Key': '+7c4/ENzhG3/tnJFqg4AGg==JdiiuHgKQwwPru1Q'},
        contentType: 'application/json',
        success: function(result) {
            $('#quote').html(result[0].quote);
            $('#author').html(result[0].author);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error ', jqXHR.responseText);
        }
    });
});