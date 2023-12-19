let links = document.querySelector("header .links") 
let userData = document.querySelector("header .name")
let userName = document.querySelector("header .name span")
let userInfo = document.querySelector("header .user-info")

let addedFav = localStorage.getItem("FavouriteInCart") ? JSON.parse(localStorage.getItem("FavouriteInCart")) : [];

userInfo.style.display = "none";
userData.style.display = "none";

if(localStorage.getItem("username")){
    links.remove()
    userInfo.style.display = "flex";
    userData.style.display = "block";
    userName.innerHTML = ((localStorage.getItem("username")).split(" "))[0]
}

let logOutBtn = document.querySelector("#logout")

logOutBtn.addEventListener("click" ,function(){
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    } ,1500);
})  

let allProducts = document.querySelector(".products")
let products = [
    {
        id : 1,
        productName : "Galaxy s23 ultra" ,
        price : "900" ,
        category : "phone",
        imageURL : "images/s23_ultra.jpg"
    },
    {
        id : 2,
        productName : "iphone 14" ,
        price : "850" ,
        category : "phone",
        imageURL : "images/iphone_14.jpg"
    },
    {
        id : 3,
        productName : "Water Bottle" ,
        price : "30" ,
        category : "bottle",
        imageURL : "images/bottle.jpg"
    },
    {
        id : 4,
        productName : "Sun Glasses" ,
        price : "40" ,
        category : "glasses",
        imageURL : "images/glasses.jpg"
    },
    {
        id : 5,
        productName : "shoes" ,
        price : "90" ,
        category : "shoes",
        imageURL : "images/shoes.jpg"
    },
    {
        id : 6,
        productName : "yeezy" ,
        price : "70" ,
        category : "shoes",
        imageURL : "images/yeezy.jpg"
    },
]



function drawItems(pro) {
    allProducts.innerHTML = ""
    let y = pro.map( (item) => {
        return `<div class="product-item col-12 col-md-4 px-3 mt-3">
                    <img src= ${item.imageURL} alt="" width="100%" height="400px">
                    <div class="product-info my-4">
                        <h5>product : ${item.productName}  </h5>
                        <h5>price : ${item.price}$   </h5>
                        <h5>category : ${item.category} </h5>
                        <button class="btn btn-primary add ${item.addBtn}" onClick="addToCart(${item.id})">Add to cart</button>
                        <button class="btn btn-danger rem ${item.remBtn}" style="display: none;" onClick="removeFromCart(${item.id})">Remove from cart</button>
                        <button onclick="favourite(${item.id})" class = "favBtn" ><i class="fa-solid fa-heart"></i></button>
                    </div>
                </div> `
    })
    for(let x of y){
        allProducts.innerHTML += x;
    }
}
drawItems(products);

let addBtn = document.getElementsByClassName("add")
let remBtn = document.getElementsByClassName("rem")


let cartsProducts = document.querySelector(".carts_products div")
let cartsProductsParent = document.querySelector(".carts_products")
let badge = document.querySelector(".header-content .badge")

let addedItem = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];


function paraInCart(){
    cartsProducts.innerHTML = ""
    addedItem.map((item) => {
    cartsProducts.innerHTML += `<p>${item.productName}
        <span class = "float-right">
            <span id="counter${item.id}" class="p-2">0</span>
            <button class="button countBtn text-success" onclick="increment(${item.id})">+</button>
            <button class="button countBtn text-danger" onclick="decrement(${item.id})">-</button>
        </span></p>`
    })
    badge.style.display = "block"
    badge.innerHTML = addedItem.length;
}
if(addedItem){
        paraInCart()
}

if(addedItem){
    addedItem.map((item) => {
            buttonShow(item.id)
    })
}
function buttonShow(id) {
    if(remBtn[id-1].style.display == "none"){
        addBtn[id-1].style.display = "none"
        remBtn[id-1].style.display = "block"
    }
}

if (localStorage.getItem = ("username")) {
    function addToCart(id) {
        let choosenItem = products.find((item) => item.id == id);
        cartsProducts.innerHTML += `<p>${choosenItem.productName}</p>`

        
        console.log("hello")
        addedItem = [...addedItem,choosenItem]
        localStorage.setItem("ProductsInCart" , JSON.stringify(addedItem))
        
        badge.style.display = "block"
        let carProductsLength = document.querySelectorAll(".carts_products div p")
        badge.innerHTML = carProductsLength.length;
        
        paraInCart()
        addBtn[id-1].style.display = "none"
        remBtn[id-1].style.display = "block"
    }
} else {
    window.location = "login.html"
    userInfo.style.display = "none"
}


function removeFromCart(id){
    let choosenItem = addedItem.find((item) => item.id == id);
    let addedItem1 = addedItem.filter((item) => 
        item.productName !== choosenItem.productName
    );
    addedItem = addedItem1;
    console.log(addedItem1)
    localStorage.setItem("ProductsInCart" , JSON.stringify(addedItem))

    paraInCart()

    remBtn[id-1].style.display = "none"
    addBtn[id-1].style.display = "block"
}

//////////////////////////////////////////////////////////////////

let upArrow = document.querySelector(".user-info .up-arrow")
let downArrow = document.querySelector(".user-info .down-arrow")
downArrow.style.display = "none"
upArrow.style.display = "inline"
cartsProductsParent.style.display = "none"
upArrow.addEventListener("click",function(e){
    e.preventDefault();
    cartsProductsParent.style.display = "block"
    downArrow.style.display = "inline"
    upArrow.style.display = "none"
})
downArrow.addEventListener("click",function(e){
    e.preventDefault();
    cartsProductsParent.style.display = "none"
    downArrow.style.display = "none"
    upArrow.style.display = "inline"
})

/////////////////////////////////////////////////////

let search = document.querySelector("section #myInput")
let searchType = document.querySelector("section #search-type")
let productsName;
var searchType1 = "name";

searchType.addEventListener("click",() => {
    if(searchType.value == "Name"){
        searchType1 = "name"
    }else{
        searchType1 = "category"
    }
})

search.addEventListener("input",() => {
                if(search.value){
                    if(searchType1 == "name"){
                        productsName = products.filter((item)=>
                        item.productName.toLowerCase().indexOf(search.value) > -1)
                        drawItems(productsName);
                    }else if (searchType1 == "category"){
                        productsName = products.filter((item)=>
                        item.category.toLowerCase().indexOf(search.value) > -1)
                        drawItems(productsName);
                    }
                }else if(search.value == ""){
                    drawItems(products);
                }
})

//////////////////////////////////////////
let favBtn = document.getElementsByClassName("favBtn")

if(addedFav){
    addedFav.map((item) => {
            favourite2(item.id)
    })
}

function favourite(id) {
    if(favBtn[id-1].style.color != "red"){
        favBtn[id-1].style.color = "red"
        let choosenItem = products.find((item) => item.id == id);
        addedFav = [...addedFav , choosenItem]
        localStorage.setItem("FavouriteInCart" , JSON.stringify(addedFav))
    }else if (favBtn[id-1].style.color == "red"){
        favBtn[id-1].style.color = ""
        let choosenItem = addedFav.find((item) => item.id == id);
        let addedItem1 = addedFav.filter((item) => 
            item.productName !== choosenItem.productName
        );
        addedFav = addedItem1;
        localStorage.setItem("FavouriteInCart" , JSON.stringify(addedFav))
    }
}
function favourite2(id) {
    if(favBtn[id-1].style.color != "red"){
        favBtn[id-1].style.color = "red"
    }
}
/////////////////////////////////////////////////////
let counter = [0,0,0,0,0,0];

function increment(id) {
  counter[id] = counter[id] + 1;
  let incounter = document.getElementById("counter"+id)
  incounter.innerHTML = counter[id];
}
function decrement(id) {
  if (counter[id] > 0) {
    counter[id] = counter[id] - 1;
  }
  let incounter = document.getElementById("counter"+id)
  incounter.innerHTML = counter[id];
}