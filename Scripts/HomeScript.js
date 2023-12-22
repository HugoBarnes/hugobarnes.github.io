$(document).ready(function(){
    $(".card-automaton").hover(
        function(){
            
            $(this).find(".Automaton").css("opacity", "0");
            console.log("this code is running");
            $(this).find(".automaton-caption").css("opacity", "1");
            $(this).find(".automaton-picture").css("opacity", "1");

        }, 
        function(){
            $(this).find(".Automaton").css("opacity", "1");
            $(this).find(".automaton-caption").css("opacity", "0");
            $(this).find(".automaton-picture").css("opacity", "0");
        }
    );
});
$(document).ready(function(){
    $(".card-matrix-master").hover(
        function(){
            $(this).find(".Matrix-Master").css("opacity", "0");
            $(this).find(".matrix-master-caption").css("opacity", "1");}, 
        function(){
            $(this).find(".Matrix-Master").css("opacity", "1");
            $(this).find(".matrix-master-caption").css("opacity", "0"); }
    );
});
$(document).ready(function(){
    $(".card-the-kings-quest").hover(
        function(){
            $(this).find(".TKQ").css("opacity", "0");
            $(this).find(".tkq-caption").css("opacity", "1");}, 
        function(){
            $(this).find(".TKQ").css("opacity", "1");
            $(this).find(".tkq-caption").css("opacity", "0");}
    );
});
$(document).ready(function(){
    $(".card-word-wizard").hover(
        function(){
            $(this).find(".Word-Wizard").css("opacity", "0");
            $(this).find(".word-wizard-caption").css("opacity", "1");}, 
        function(){
            $(this).find(".Word-Wizard").css("opacity", "1");
            $(this).find(".word-wizard-caption").css("opacity", "0");}
    );
});
$(document).ready(function(){
    $(".card-grid-genius").hover(
        function(){
            $(this).find(".Grid-Genius").css("opacity", "0");
            $(this).find(".grid-genius-caption").css("opacity", "1");}, 
        function(){
            $(this).find(".Grid-Genius").css("opacity", "1");
            $(this).find(".grid-genius-caption").css("opacity", "0");}
    );
});
function goToProjects(event){
    var projectSection = document.getElementsByClassName('project-title')[0];
    projectSection.scrollIntoView({behavior: 'smooth'});
}
function goToContactMe(event){
    var projectSection = document.getElementsByClassName('contact-title')[0];
    projectSection.scrollIntoView({behavior: 'smooth'});
}
function goToHugo(event){
    var projectSection = document.getElementsByClassName('hugo-title')[0];
    projectSection.scrollIntoView({behavior: 'smooth'});
}
function goToLinkedIn(event){
    window.open('https://www.linkedin.com/in/hugo-barnes/');
}
function goToGitHub(event){
    window.open('https://github.com/HugoBarnes');
}
function goToCV(event){
    window.open('https://drive.google.com/file/d/1Onm_GlI0uhoV00EjikqnuCWqtc0iTWL8/view?usp=drive_link');
}
window.addEventListener('scroll', function() {
    var scrollUpElements = document.querySelectorAll('.scroll-up');
    var windowHeight = window.innerHeight;

    scrollUpElements.forEach(function(element) {
        var elementPosition = element.getBoundingClientRect().top;

        if(elementPosition - windowHeight <= 0) {
            element.classList.add('appear');
        }
    });
});
