// IMPORTATION FUNCTIONS
//import {saveCart, loadCart} from "./function.js"


//CREATE KEY FOR LOCALSTORAGE
const STORAGE_KEY = "cart"

// SAVE CART FUNCTION
function saveCart (cart){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }
  
  // LOAD CART FUNCTION 
function loadCart (){
    const cart = localStorage.getItem(STORAGE_KEY)
    if (cart === null){
      return []
    }
    return JSON.parse(cart)
  }

//GLOBAL VARIABLE
const url = new URL (window.location.href)
const id = url.searchParams.get("id")
const cart = loadCart ()
cartCount()

//FUNCTION FOR ADD ALL INFORMATIONS FOR TEDDY 
function display (nounourse){
  document.querySelector("h3").textContent=nounourse.name
  document.querySelector("img").src=nounourse.imageUrl
  document.querySelector("p").textContent=`Prix : ${nounourse.price/100} €`
  document.querySelector("aside>p").textContent=nounourse.description
  document.getElementById("price").value = nounourse.price
  for ( const color of nounourse.colors){
    const eltOption = document.createElement ("option")
    eltOption.textContent=color
    eltOption.value=color
    document.getElementById ("color").appendChild (eltOption)
    }
}


// ADD TEDDY TO MY CART FUNCTION
function addToCart (){
  let price = document.getElementById("price").value
  let img = document.querySelector("#teddy img")
  let name = document.getElementById("teddy-name").textContent
  let color = document.getElementById("color").value
  let quantity = Number(document.getElementById("quantity").value)
  //CREATE OBJECT OF TEDDY WITH ALL INFORMATIONS
  const product = {
    color : color, 
    quantity : quantity, 
    id : id,
    name : name,
    imageUrl : img.src,
    price : price
  }
  let isPresent = false 
  //IF QUANTITY IS NULL , ALERT FOR SELECT QUANTITY
  if(quantity === 0){
    alert("Veuillez selectionner une quantité")
  }
  else{
  // IF COLOR IS PRESENT ADD QUANTITY AND IF COLOR IS FALSE ADD MY TEDDY IN CART
    for (const [index, item] of cart.entries()){
      if (product.id === item.id && product.color === item.color){
        cart[index].quantity += product.quantity
        isPresent = true
      }
    }
    if (isPresent == false){
      cart.push(product)
    }
  
    saveCart(cart)
    window.location.reload() // RELOAD FOR ADD QUANTITY IN BULLE
  }
}


// FUNCTION FOR ADD QUANTITY IN INFOBULLE
function cartCount(){
    let total = 0
      for (let product of cart){
      total += product.quantity
      }
      createCartCount(total)
}
function createCartCount(total){
  let eltCount = document.getElementById("cart_count")
  let createTxt = document.createTextNode(total)
  eltCount.appendChild(createTxt)
}

//PRINCIPAL CODE

//RECOVERY OF API AND ID LINKED ON THE PAGE
fetch("http://localhost:3000/api/teddies/" + id)
.then(response => response.json())
.then(display);

//LISTEN THE BUTTON FOR ADD TO CART
document.getElementById("add-product-button").addEventListener('click', addToCart)


