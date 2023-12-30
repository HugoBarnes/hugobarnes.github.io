const cards = document.querySelectorAll('.card');
const automatonPicture = document.querySelector('.automaton-picture');
const inProgressPicture = document.querySelector('.in-progress-picture');
cards.forEach(card => {
  card.addEventListener('mouseover', function () {
    if (card.classList.contains('first_card')) {
      automatonPicture.style.display = 'block';
      inProgressPicture.style.display = 'none';
      document.querySelector('#projects>div').style.alignItems = "flex-end";
    } else {
      automatonPicture.style.display = 'none';
      inProgressPicture.style.display = 'block';
      document.querySelector('#projects>div').style.alignItems = "center";
    }
  });
  card.addEventListener('mouseout', function () {
    automatonPicture.style.display = 'none';
    inProgressPicture.style.display = 'none';
  });
  card.addEventListener('click', function (){
    if(card.classList.contains('first_card')){
      window.location.href="Pages/AutomatonIndex.html";
    }
  })
});
window.addEventListener('load', function() {
  var hash = window.location.hash;
  if (hash) {
    var targetElement = document.querySelector(hash);
    if (targetElement) {
      targetElement.scrollIntoView();
    }
  }
});