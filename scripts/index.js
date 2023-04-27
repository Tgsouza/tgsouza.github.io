alert("Hello World!");
//CONTACT US FUNCTION USING EMAILJS

(function(){emailjs.init("9OsFrNgY5SvlJVOdK");})();

function sendEmail(){
    emailjs.init("9OsFrNgY5SvlJVOdK");

var name = document.getElementById("name");
var email = document.getElementById("email");
var message = document.getElementById("message");

var param = {
    name:name,
    email: email,
    message:message
}

jsemail.sendForm('service_7l0lh51','template_x5jidla', params).then(function(response){
    console.log("SUCCESS", response.status, response.text)
}, function(error){
    console.log('FAILED...', error);
});

document.getElementById("contactForm").reset();

}