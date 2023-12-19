let firstName = document.querySelector("section #first")
let lastName = document.querySelector("section #last")
let email = document.querySelector("section #email")
let password = document.querySelector("section #password")

let btn = document.querySelector("section #submit")

btn.addEventListener("click" , function(e){
    e.preventDefault()
    if(firstName.value === "" || lastName.value === "" || email.value === "" || password.value === ""){
        alert("please fill your data")
    }else {
        localStorage.setItem("username" , firstName.value + " " + lastName.value);
        localStorage.setItem("email" , email.value);
        localStorage.setItem("password" , password.value);

        setTimeout( () => {
            window.location = "login.html"
        }, 1500)
    }
    console.log("kjbbbbbbbbbbb")
})