let p_title = document.getElementById("p_title");
let p_img = document.getElementById("p_image");
let p_price = document.getElementById("p_price");
let p_category = document.getElementById("p_category");

window.onload = ()=>{

   let editindex = JSON.parse(localStorage.getItem("editindex"));

   if(editindex != null){

        let products = JSON.parse(localStorage.getItem("products")) || [];

        p_title.value = products[editindex].product_title;
        p_img.value = products[editindex].product_image;
        p_price.value = products[editindex].product_price;
        p_category.value = products[editindex].product_category;
        


   }
}

const addProduct = ()=>{

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let editindex = JSON.parse(localStorage.getItem("editindex"));

    if(p_title.value =="" || p_img.value =="" || p_price.value =="" || p_category.value ==""){

        alert("please fill all details...");
        return;
        
    }

    if(editindex!=null){

        products[editindex].product_title=p_title.value;
        products[editindex].product_image=p_img.value;
        products[editindex].product_price=p_price.value;
        products[editindex].product_category=p_category.value;
        localStorage.removeItem("editindex");
        localStorage.setItem("products",JSON.stringify(products));
        alert("update successfully ✅");
        window.location.href = "./display_products.html";
        return;

    }

    else{

        products.push({

            "product_id":Date.now(),
            "product_title":p_title.value,
            "product_image":p_img.value,
            "product_price":p_price.value,
            "product_category":p_category.value,
        })

        alert("product added successfully ✅");
        localStorage.setItem("products",JSON.stringify(products));
        window.location.href = "./display_products.html";
       
    }

        p_title.value =="";
        p_img.value =="";
        p_price.value =="";
        p_category.value =="";

    
    
};

let tbody = document.getElementById("tbody");

let container = document.getElementById("product-container");

const renderCards = (products) => {

    let cards = "";

    products.forEach((product,index)=>{

        cards += `
        
        <div class="col-md-3 mb-4">

            <div class="card h-100 shadow">

                <img src="${product.product_image}" class="card-img-top" style="height:200px; object-fit:cover">

                <div class="card-body">

                    <h5 class="card-title">${product.product_title}</h5>

                    <p class="card-text">
                        Category : ${product.product_category}
                    </p>

                    <p class="card-text">
                        Price : ₹${product.product_price}
                    </p>

                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">
                        Delete
                    </button>

                    <button class="btn btn-primary btn-sm" onclick="editProduct(${index})">
                        Edit
                    </button>

                </div>

            </div>

        </div>
        
        `;
    });

    container.innerHTML = cards;
};

const addProductToList = () => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    renderCards(products);
};

addProductToList();

const deleteProduct = (index)=>{

    let products = JSON.parse(localStorage.getItem("products")) || [];

    products.splice(index,1);
    localStorage.setItem("products",JSON.stringify(products));
    addProductToList();


}

const editProduct = (index)=>{

    localStorage.setItem("editindex",JSON.stringify(index));
    window.location.href = "./add_product.html"
}



p_category.addEventListener("change",function(){

    let catValue = this.value.toLowerCase();
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let filtercateProduct = products.filter(product=>

        product.product_category.toLowerCase().includes(catValue)
    ); 

    renderCards(filtercateProduct);


});



let search = document.getElementById("search");

search.addEventListener("keyup", function(){

    let searchValue = this.value.toLowerCase();
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let filterProduct = products.filter(product =>
        product.product_title.toLowerCase().includes(searchValue)
    );

    renderCards(filterProduct);
});

let sortPrice = document.getElementById("sort-price");

sortPrice.addEventListener("change",function(){

    let products = JSON.parse(localStorage.getItem("products")) || [];

    if(this.value=="high"){

        products.sort((a,b) => b.product_price-a.product_price);
    }
    else{

        products.sort((a,b)=>a.product_price-b.product_price);
    }

    renderCards(products);
})


