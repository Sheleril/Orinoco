//Retrieving the orderId
const url = new URL (window.location.href)
const orderId = url.searchParams.get("orderid")

const cart = JSON.parse(localStorage.getItem("cart"))

//ADD PARA FOR ORDERID
function addDetailOrder (){
    let eltDetail = document.getElementById('confirm-block')
    let eltPara = document.createElement('p')
    let contenu = document.createTextNode (`Votre numéro de commande : ${orderId}`)
    eltDetail.appendChild(eltPara)
    eltPara.appendChild(contenu)
}

//ADD TOTALPRICE FOR ORDER
function totalPriceToPay(cart){
    //INITIALIZE PRICE TO 0 
    let total = 0
    for (let product of cart){
        let totalPriceProduct = product.quantity * product.price
        total += totalPriceProduct
    }
    let eltDetail = document.getElementById('confirm-block')
    let contenu = document.createElement('p')
    let eltPrice = document.createTextNode(`Et le montant total de votre commande est de : ${total/100} €`)
    eltDetail.appendChild(contenu)
    contenu.appendChild(eltPrice)
}

//CLEAN THE LOCALSTORAGE 
localStorage.clear()

//SEND FUNCTION
addDetailOrder()
totalPriceToPay(cart)
