let email = document.querySelector("section #email")
let password = document.querySelector("section #password")

let btn = document.querySelector("section #submit")

let getEmail = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

btn.addEventListener("click" , function(e){
    e.preventDefault();
    if(email.value === "" || password.value === ""){
        alert("enter your information")
    } else {
        if(getEmail && getEmail === email.value && getPassword && getPassword === password.value){
            setTimeout( () => {
                window.location = "index.html"
            })
        } else {
            alert("your email or password is wrong")
        }
    }
})