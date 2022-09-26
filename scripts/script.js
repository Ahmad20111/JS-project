'use strict';

let body = document.querySelector("body");
let products = document.createElement("div");
products.className = "products";

body.append(products);

let product = document.createElement("div");
product.className = "product";

products.appendChild(product);

let h1 = document.createElement("h1");
h1.className = "h1";
h1.innerText = "Our Products";

product.appendChild(h1);

let proArray = [
    {
        id: 0,
        name: "Apples",
        price: 5.40,
        amount: 20
    },
    {
        id: 1,
        name: "Bananas",
        price: 2.50,
        amount: 25
    },
    {
        id: 2,
        name: "Cherries",
        price: 8.00,
        amount: 30
    },
    {
        id: 3,
        name: "Strawberries",
        price: 9.90,
        amount: 35
    },
]

let br1 = document.createElement("br");
products.appendChild(br1);

let choice = document.createElement("div");
choice.className = "choice";
products.appendChild(choice);

let select = document.createElement("select");
select.className = "choose";
choice.appendChild(select);

for (let i = 0; i < proArray.length; i++) {

    let prods = document.createElement("div");
    prods.className = "fruits";
    prods.id = "prodsID-" + proArray[i].id;

    let proImg = document.createElement("img");
    proImg.className = "img";
    proImg.src = `./images/${proArray[i].name}.jpg`;

    let proName = document.createElement("span");
    proName.className = "fruitName";
    proName.textContent = proArray[i].name;

    let proPrice = document.createElement("span");
    proPrice.textContent = "$" + proArray[i].price.toFixed(2);

    let proAmount = document.createElement("span");
    proAmount.className = "proAmount";
    proAmount.amount = proArray[i].amount;
    proAmount.textContent = `Left ${proArray[i].amount}kg`;


    prods.appendChild(proImg);
    prods.appendChild(proName);
    prods.appendChild(proPrice);
    prods.appendChild(proAmount);

    product.appendChild(prods);


    let selectOption = document.createElement("option");
    selectOption.className = "selectOption";
    selectOption.value = proArray[i].id;
    selectOption.innerText = proArray[i].name;

    select.appendChild(selectOption);


}

let br2 = document.createElement("br");
products.appendChild(br2);

let input1 = document.createElement("input");
input1.className = "kilo";
input1.type = "number";
input1.placeholder = "Kilo";
input1.min = "1";
input1.required = true;
choice.appendChild(input1);

let input2 = document.createElement("input");
input2.value = "Add to Cart";
input2.className = "toCart";
input2.type = "button";
choice.appendChild(input2);

let br3 = document.createElement("br");
products.appendChild(br3);

let chosenBlock = document.createElement("div");
chosenBlock.className = "chosen-block";
products.appendChild(chosenBlock);

let chosen = document.createElement("div");
chosen.className = "chosen";
chosenBlock.appendChild(chosen);

let prodName = document.createElement("span");
let prodKilo = document.createElement("span");
let prodCost = document.createElement("span");

chosen.appendChild(prodName);
chosen.appendChild(prodKilo);
chosen.appendChild(prodCost);

let br4 = document.createElement("br");
products.appendChild(br4);

let totalsBlock = document.createElement("div");
totalsBlock.className = "totalsBlock";
products.appendChild(totalsBlock);

let checkB = document.createElement("div");
checkB.className = "checkB";
totalsBlock.appendChild(checkB);

let check = document.createElement("input");
check.type = "checkbox";
check.className = "check";
checkB.appendChild(check);

let delivery = document.createElement("span");
delivery.textContent = "Includes delivery";
checkB.appendChild(delivery);

let totals = document.createElement("div");
totals.className = "totals";
totalsBlock.appendChild(totals);

let totalPrice = 0;

function addToCart() {
    let choose = document.querySelector(".choose");
    let kilo = document.querySelector(".kilo");
    chosenBlock.style.display = 'inline-block';
    totals.style.display = 'inline-block';
    document.querySelector(".checkB").style.display = 'inline-block';
    
    let prodV = proArray.find(b => b.id === +choose.value);

    const prodHTML = document.getElementById(`prodsID-${prodV.id}`);
    const prodVAmount = prodHTML.querySelector('.proAmount');
    
    let hiddenN = document.createElement("h4");
    let hiddenK = document.createElement("h4");
    let hiddenC = document.createElement("h4");
    
    if (prodHTML.id === `prodsID-${prodV.id}`) {
        if (prodV.amount === 0) {
            alert(`Selected product (${prodV.name}) has been sold out!`);
        } else if (kilo.value > prodV.amount) {
            alert(`From selected product(${prodV.name}) left only ${prodV.amount}kg`);
            prodV.amount = prodV.amount;
        } else {
            prodV.amount -= kilo.value;
            prodVAmount.textContent = `Left ${prodV.amount}kg`;
            hiddenN.textContent = `${prodV.name}`;
            hiddenK.textContent = `${kilo.value}Kg`;
            hiddenC.textContent = `$${(prodV.price * +kilo.value).toFixed(2)}`;        
            totalPrice += prodV.price * +kilo.value;
        }
    }

    prodName.appendChild(hiddenN);
    prodKilo.appendChild(hiddenK);
    prodCost.appendChild(hiddenC);

    totals.textContent = `Total: $${(totalPrice).toFixed(2)}`;

    choose.value = "";
    kilo.value = "";
}

input2.addEventListener("click", addToCart);

check.addEventListener("change", (e) => {
    if (e.target.checked) {
        totalPrice += 10;
    } else {
        totalPrice -= 10;
    }
    let totals = document.querySelector(".totals");
    totals.textContent = `Total: $${(totalPrice).toFixed(2)}`;
})


