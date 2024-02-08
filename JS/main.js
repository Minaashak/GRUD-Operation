// !---InPut-Variable
var productName = document.getElementById("pName");
var productPrice = document.getElementById("pPrice");
var productModeol = document.getElementById("pModel");
var productDesc = document.getElementById("pDesc");
var AddProductBtn = document.getElementById("AddProductBtn");
var UpdateProductBtn = document.getElementById("UpdateProductBtn");

// !--Products-index
var productsIndex = 0;

//!-- Array Added In it the Product
var allProducts=[];

if(localStorage.getItem("products") == null){
    allProducts = [];
}else{
    allProducts = JSON.parse(localStorage.getItem("products"));
    //console.log(allProducts);
    displayData(allProducts);

}


console.log(productDesc);

// !----AddProduct-Function---
function addProduct(){
    console.log('Hello');

    var product= {
        name:productName.value,
        price: productPrice.value,
        model:productModeol.value,
        desc:productDesc.value
    }
    allProducts.push(product);
    clearForm();
    displayData(allProducts);
    localStorage.setItem("products" , JSON.stringify(allProducts));
//    console.log(allProducts);
};


// !----Display-Data---
function displayData(products){
    var container = ``;
    
    for(var i =0 ; i < products.length ; i++){
        container += `
        <tr>
            <td>${[i+1]}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].model}</td>
            <td>${products[i].desc}</td>
            <td>
                <button  onclick="updateProducts(${i})" class="btn btn-outline-warning btn-sm">UpDate</button>
            </td>
            <td>
                <button onClick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
        </tr>
        `
    }
    document.getElementById("bodyData").innerHTML = container;

};


// !---Clear-Form

function clearForm(){
    productName.value = " ";
    productPrice.value = " ";
    productModeol.value = " ";
    productDesc.value = " ";
};

// !---Delete-Product---

function deleteProduct(elementNumber){

    //console.log("Hello");
allProducts.splice(elementNumber,1);
localStorage.setItem("products" , JSON.stringify(allProducts));
displayData(allProducts);

};


// !--Search-By-Product_name

function searchByProductName(term){
    
    var itemsFound=[];

    for(var i = 0 ; i< allProducts.length ; i++){
        if( allProducts[i].name.toLowerCase().includes(term.toLowerCase())== true ){
            console.log("Found" , i);
            itemsFound.push(allProducts[i]);
        }
    }
    displayData(itemsFound);
};

// searchByProductName("E");

// !--- Update-Products-Button

function updateProducts(prod){

    productsIndex = prod;
    // console.log(prod);

    AddProductBtn.classList.add("d-none");
    UpdateProductBtn.classList.replace("d-none" , "d-block");

    productName.value = allProducts[prod].name;
    productPrice.value = allProducts[prod].price;
    productModeol.value = allProducts[prod].model;
    productDesc.value = allProducts[prod].desc;


};

// !---Update-Items

function updateItems(){

    var product= {
        name:productName.value,
        price: productPrice.value,
        model:productModeol.value,
        desc:productDesc.value
    };

    allProducts.splice(productsIndex , 1, product);

    AddProductBtn.classList.remove("d-none");
    UpdateProductBtn.classList.add("d-none");

    localStorage.setItem("products" , JSON.stringify(allProducts));
    displayData(allProducts);
    clearForm();
};




