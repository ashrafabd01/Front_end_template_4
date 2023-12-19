let ProductsInCart = JSON.parse(localStorage.getItem("ProductsInCart"))
let allProducts = document.querySelector(".products")

let favourite = document.querySelector(".fav .items")
let FavouriteInCart = JSON.parse(localStorage.getItem("FavouriteInCart"))

if(ProductsInCart){
    drawCartProducts(ProductsInCart)
}

function drawCartProducts(products){
    allProducts.innerHTML = ""
    let y = products.map((item) => {
            return  `<div class="cart-item d-flex justify-content-around p-4 mb-4">
                        <div class="img">
                            <img src = ${item.imageURL} alt="" width="100%" height="180px">
                        </div>
                        <div class="cart-info w-50">
                            <h5 class="fw-bold">product : ${item.productName}    </h5>
                            <h5 class="fw-bold">category : ${item.category}      </h5>
                            <h5 class="fw-bold">price : ${item.price}$     </h5>
                            <div class= "row mt-3">
                                <span class = "float-right col-6 h3">
                                    <span id="counter${item.id}" class="p-2">0</span>
                                    <button class="button countBtn text-success" onclick="increment(${item.id})">+</button>
                                    <button class="button countBtn text-danger" onclick="decrement(${item.id})">-</button>
                                </span>
                                <button class="btn btn-danger col-6" onClick="removeFromCart(${item.id})">Remove</button>
                            </div>
                    </div>
                    </div>`

    })
    for(let x of y){
        allProducts.innerHTML += x;
    }
}

////////////////////////////////////////////////////////////////

let logOutBtn = document.querySelector("#logout")

logOutBtn.addEventListener("click" ,function(){
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    } ,1500);
})  

////////////////////////////////////////////////////////////////
function removeFromCart(id){
    let choosenItem = ProductsInCart.findIndex((item) => item.id == id);
    ProductsInCart.splice(choosenItem,1);
    localStorage.setItem("ProductsInCart" , JSON.stringify(ProductsInCart))
    drawCartProducts(ProductsInCart)
    drawPrice()
}

/////////////////////////////////////////////////////////////////
var totalPrice = 0
let countPrice = document.querySelector("section .price span")

function drawPrice() {
    countPrice.innerHTML = ""
    totalPrice = 0
    ProductsInCart.forEach(function (item){
            totalPrice += +(item.price) 
        }
    )
    countPrice.innerHTML = totalPrice + "$";
}
drawPrice();
/////////////////////////////////////////////////////////////////
function drawCartFavourite(products){
    favourite.innerHTML = ""
    let y = products.map((item) => {
            return  `<div class="item px-4 py-3 swiper-slide" style="width : 500px;">
                        <img src="${item.imageURL}" alt="" width="60%" height="70%" class="rounded-4" style="margin: 0 60px;">
                        <div class="info p-3">
                            <h5 style="font-weight: 600;">Product : ${item.productName}</h5>
                            <h5 style="font-weight: 600;">Category : ${item.category}  </h5>
                        </div>
                    </div>`

    })
    for(let x of y){
       favourite.innerHTML += x;
    }
}
drawCartFavourite(FavouriteInCart)
/////////////////////////////////////////////////////////////
if(screen.availWidth > 768){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
}
if(screen.availWidth <= 768){
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
}
////////////////////////////////////////////////
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