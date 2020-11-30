//IMPORTATION FOR FUNCTION LOADCART
//import {loadCart} from "./function.js"

const STORAGE_KEY = "cart"

function loadCart (){
    const cart = localStorage.getItem(STORAGE_KEY)
    if (cart === null){
      return []
    }
    return JSON.parse(cart)
  }

//GLOBAL VARIABLE
const cart = loadCart ()
basketRecap()

//FUNCTION WHICH ALLOWS YOU TO MAKE SUMMARIES OF THE BASKET ON LOCAL STORAGE
function basketRecap() {
    let panier = document.getElementById("basket-section")
    let cart = loadCart()
        for (let product of cart){
            let article = document.createElement("article")
            panier.appendChild(article)
            //CREATE VARIABLE FOR MULTIPLICATE PRICE
            let totalPrice = product.quantity * product.price
            //ADD ALL FUCTION IN ARTICLE
            addTeddyName(article, product.name)
            addTeddyColor(article, product.color)
            addTeddyQuantity(article, product.quantity)
            addTeddyPrice(article, totalPrice)
            addTeddyPicture(article, product.imageUrl)
            teddyDelete(article, product)
        }
        totalPriceToPay(cart, panier)
}

//FUNCTION FOR TEDDY'S NAME
function addTeddyName (parent, name){
    let eltName = document.createElement('h4')
    let contenu = document.createTextNode(name)
    parent.appendChild(eltName)
    eltName.appendChild(contenu)
}

//FUNCTION FOR TEDDY'S COLOR 
function addTeddyColor (parent, color){
    let eltColor = document.createElement("p")
    let contenu = document.createTextNode(`Couleur : ${color}`)
    parent.appendChild(eltColor)
    eltColor.appendChild(contenu)
}

//FUNCTION FOR TEDDY'S QUANTITY
function addTeddyQuantity (parent, quantity){
    let eltQuantity = document.createElement('p')
    let contenu = document.createTextNode(`Quantité : ${quantity}`)
    parent.appendChild(eltQuantity)
    eltQuantity.appendChild(contenu)
}

//FUNCTION FOR TEDDY'S PRICE
function addTeddyPrice (parent, txt){
        let eltPrice = document.createElement('p')
        let contenu = document.createTextNode(`Prix total :  ${txt/100} €`)
        eltPrice.className = `price`
        parent.appendChild(eltPrice)
        eltPrice.appendChild(contenu)
}

//FUNCTION FOR TEDDY'S PICTURE
function addTeddyPicture (parent, src){
    let eltImg = document.createElement('img')
    eltImg.src = src
    eltImg.className = 'img-product'
    parent.appendChild(eltImg)
}

//FUNCTION FOR CREATE DELETE BUTTON
function teddyDelete (parent, product){
    let eltDeleteButton = document.createElement("button")
    eltDeleteButton.textContent = 'Supprimer'
    eltDeleteButton.type = 'submit'
    eltDeleteButton.className = 'delete-button'
    eltDeleteButton.addEventListener('click', function(){
        emptyCart(product)
    })
    parent.appendChild(eltDeleteButton)
}

//FUNCTION FOR DELETE TEDDY WITH DELETE BUTTON
function emptyCart (product){
    let cart = loadCart()
    for (const [index, item] of cart.entries()){
        if(product.name === item.name && product.color === item.color){
            cart.splice (index, 1)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }
    verifCart(cart)
    window.location.reload()
}
//FUNCTION FOR DELETE ARRAY WHEN NULL
function verifCart (cart){
    if (cart.length === 0){
        localStorage.removeItem('cart')
    }
    return
}

//FUNCTION FOR ADD TOTAL PRICE IN DIV ALREADY CREATE IN HTML AND SAY NOTHING IF CART IS NULL
function totalPriceToPay(cart, parent){
    //INITIALIZE PRICE TO 0 
    let total = 0
    for (let product of cart){
        let totalPriceProduct = product.quantity * product.price
        total += totalPriceProduct
    }
    //ADD MULTIPLICATION TO MY VARIABLE INITIALIZE
    if (total === 0){
        let para = document.createElement('p')
        para.textContent = "Vous n'avez rien dans votre panier"
        para.id = 'para'
        parent.appendChild(para)
    }
    else{
        let eltDiv = document.getElementById("total-price-to-pay")
        let contenu = document.createElement('p')
        eltDiv.textContent = `Vous devez payer au total : ${total/100}€`
        contenu.id = 'totalPrice'
        eltDiv.appendChild(contenu)
    }
}

let basketValidate = document.getElementById('send-button-basket')

// TARGET FORMS AND SEND IT
function sendApi(event){

    if(cart.length === 0){
        event.preventDefault()
        alert(`Veuillez remplir votre panier s'ils vous plait`)
    }

    else{

        if (document.getElementById('prenom').value == ""){
            //alert ("Veuillez entrer votre prénom!");
            return false;
            }
        
            if (document.getElementById('nom').value == ""){
             //alert ("Veuillez entrer votre nom!");
             return false;
            }
        
            if (document.getElementById('mail').value == ""){
                //alert ("Veuillez entrer votre e-mail!");
                return false;
            }
        
            if (document.getElementById('Address').value == ""){
                //alert ("Veuillez entrer votre adresse!");
               return false;
            }
    
            if (document.getElementById('town').value == ""){
               // alert ("Veuillez entrer votre ville!");
                return false;
            }

    //VARIABLES FOR TARGET FORMS
    let contact = {
        lastName: document.getElementById('prenom').value,
        firstName: document.getElementById('nom').value,
        address: document.getElementById('Address').value,
        city: document.getElementById('town').value,
        email: document.getElementById('mail').value
    }

    //PARAMETER FOR BUTTON EVENT 
    event.preventDefault();
    
    //INITIALIZATION OF THE EMPTY TABLE FOR THE ID OF THE TEDDYS
    let products = []
    //LOOP THROUGH LOCALSTORAGE PRODUCTS
    for (let teddy of cart){
        //COMPLETE THE TABLE BY THE ID OF THE PRODUCT FOR EACH ID FOUND
        products.push(teddy.id)
    }
    
    //CREATE OBJECT WHICH GROUPS ALL INFORMATIONS
    let objet = {
        contact, 
        products
    }

    //CHANGE OBJET IN STRING
    let buy = JSON.stringify(objet)

    //XML REQUEST
    let request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        //IF THE REQUEST IS COMPLETE
        if(this.readyState == XMLHttpRequest.DONE){
            let confirmation = JSON.parse(this.responseText).orderId
            window.location.href = 'confirm.html?orderid=' + confirmation
        }
    }
    request.open('POST', 'http://localhost:3000/api/teddies/order')
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(buy)
}
}

//LISTEN TO THE BUTTON TO THE CLICK FOR THE FUNCTION
basketValidate.addEventListener('click', sendApi)
