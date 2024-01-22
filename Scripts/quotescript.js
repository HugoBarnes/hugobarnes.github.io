document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#back-button').addEventListener('click', function(){
        window.location.href = '../index.html';
    });
});
$(document).ready(function() {
    var getQuote = function() {
        var category = 'history';
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/quotes?category=' + encodeURIComponent(category),
            headers: { 'X-Api-Key': '+7c4/ENzhG3/tnJFqg4AGg==JdiiuHgKQwwPru1Q' },
            success: function(result) {
                if (Array.isArray(result) && result.length > 0) {
                    $('#quote').html(result[0].quote);
                    $('#author').html(result[0].author);
                } else {
                    $('#quote').html('No quote found.');
                    $('#author').html('');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error: ', textStatus, errorThrown);
                $('#quote').html('Error fetching quote.');
                $('#author').html('');
            }
        });
    };
    getQuote();
    window.onload = getQuote;
    // Add the event listener
    document.getElementById('next-button').addEventListener('click', getQuote);
});
