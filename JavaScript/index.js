fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(nounourses => listeProductNounours(nounourses));

const STORAGE_KEY = "cart"

function loadCart (){
    const cart = localStorage.getItem(STORAGE_KEY)
    if (cart === null){
      return []
    }
    return JSON.parse(cart)
  }


//FONCTION GLOBALE
let cart = loadCart()
cartCount()

function addDiv(urlImage, name, id){
    let div = document.getElementById('contenu')
    let newDiv = document.createElement('div')
    newDiv.className = "produit"
    newDiv.dataset.id = id
    div.appendChild(newDiv)
    addImage(newDiv, urlImage)
    addName(newDiv, name)
    addLink(newDiv)
}

//FONCTION SECONDAIRE POUR CREE LES ELEMENTS DE L'OURSON
function addImage(parent, urlImage){
    let eltImage = document.createElement("img");
    eltImage.src = urlImage
    parent.appendChild(eltImage)
}

function addName(parent, name) {
    let eltName = document.createElement('h3');
    let teddyTitle = document.createTextNode(name);
    parent.appendChild(eltName)
    eltName.appendChild(teddyTitle)
}

function addLink (parent){
    let eltLink = document.createElement('a');
    eltLink.textContent= "Plus d'informations";
    eltLink.href= "product.html?id=" + parent.dataset.id
    parent.appendChild(eltLink)
}

//FONCTION FINALE 
function listeProductNounours(nounourses) {
    for (let nounours of nounourses) {
       addDiv(nounours.imageUrl, nounours.name, nounours._id);
    }
}

// FUNCTION FOR ADD QUANTITY DANS INFOBULLE
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
