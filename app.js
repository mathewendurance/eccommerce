// variables
const productsDOM = document.querySelector(".products");
const closeProduct = document.querySelector(".close-productOverlay");
const productOverlayDOM = document.querySelector(".product-details")
const productOverlay = document.querySelector(".product-overlay");
const productsContent = document.querySelector(".small-cont");
const cartItem = document.querySelector(".row");
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const cartBox = document.querySelector(".cart-box");



let Preview = [];
let cart =[];

//buttons
let buttonsDOM =[]; 

//getting products
class Products{
    async getProducts(){
        try{
             let result = await fetch('products.json')
             let data = await result.json();
             let newProducts = data.items
             newProducts = newProducts.map(item =>{
                const { title,descrip,price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                const imagea = item.fields.imagea.fields.file.url;
                const imageb = item.fields.imageb.fields.file.url;
                const imagec = item.fields.imagec.fields.file.url;
                const imaged = item.fields.imaged.fields.file.url;
                return {title, descrip, price, id,image, imagea, imageb,imagec,imaged};
             })
             return newProducts;
        } catch(error){
            console.log(error);
        }
       
    }
}

//display products
class UI{
    displayProducts(newProducts){
       let result = "";
        newProducts.forEach(product => {
        result +=`
        <div class="col-4">
                <img src="/${product.image}" alt="">
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                    add to bag
                </button>
                <button class="bag-btnA" data-id=${product.id}>
                    <i class="fas fa-eye"></i>
                    Preview
                </button>
               
                <h4>${product.title}</h4>
                <p>$${product.price}</p>
                
            </div>` 
        });
        productsDOM.innerHTML = result;
    }
    getPreviewButtons(){
        const buttons = document.querySelectorAll(".bag-btnA")
        Preview = buttons
        buttons.forEach(button=>{
        let id = button.dataset.id;
        button.addEventListener('click', (event)=>{
            //get product deatails from product
        let productsItems = {...Storage.getProducts(id)}
        

        // add product to product deataisl
        Preview =productsItems;
        
        //display Preview
        this.addProductsItems(productsItems);
        // show details product
      
        this.Preview()
       
    
    })
        
    })
    }

    addProductsItems(item){
        const div = document.createElement('div');
        div.classList.add("row")
        div.innerHTML = `
        <div class="col-2">
               <img class="pro-img" src="${item.image}" alt="" width="100%">
                
                    <div class="small-img-row">
                        <div class="small-img-col" onclick="changeImage(this)">
                            <img src="${item.imagea}" alt="" width="100%" class="small-img" >
                        </div>
                        <div class="small-img-col" onclick="changeImage(this)">
                            <img src="${item.imageb}" alt="" width="100%" class="small-img" >
                        </div>
                        <div class="small-img-col" onclick="changeImage(this)">
                            <img src="${item.imagec}" alt=""  width="100%" class="small-img" >
                        </div>
                        <div class="small-img-col" onclick="changeImage(this)">
                            <img src="${item.imaged}" alt="" width="100%" class="small-img" >
                        </div>
                    </div>
                </div>
                <div class="col-2 productD">
                    
                    <p><i class="fa fa-indent"></i>${item.descrip}<i class="fa fa-indent"></i></p>
                    <h1>${item.title}</h1>
                    <h4>$${item.price}</h4>
                    
                    <button class="bag-btn" data-id=${item.id}>
                    <i class="fas fa-shopping-cart"></i>
                    add to bag
                    </button>
                    
                </div>
            </div>`;
            productsContent.appendChild(div);
            console.log(productsContent);
            
        }

Preview(){
        productOverlay.classList.add('transparentBch');
        productOverlayDOM.classList.add("Preview")
}
setupApp2(){
        closeProduct.addEventListener('click',this.hidePreview)
    }

    hidePreview(){
         productOverlay.classList.remove('transparentBch');
        productOverlayDOM.classList.remove("Preview")
    }
getBagButtons(){
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons
    buttons.forEach(button=>{
        let id = button.dataset.id;
        let inCart = cart.find(item => item.id === id);
        if(inCart){
            button.innerText = "In Cart";
            button.disable = true;
        }
            button.addEventListener('click', event =>{
              event.target.innerText = "In Cart";
              event.target.disabled = true;
              //get product
                let cartItems = {...Storage.getProducts(id), amount:1};
                //add product to cart
                cart = [...cart, cartItems ]
                //save cart
                Storage.saveCart(cart)
               //set cart values
               this.setCartvalues(cart);
               //display cart
               this.addcartItem(cartItems)
               //show cart
               this.showCart()
            });
        }); 
    }
    setCartvalues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item =>{
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal
    }
    addcartItem(item){
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.image}" alt="product" />
            <div>
              <h4>${item.title}</h4>
              <h5>$${item.price}</h5>
              <span class="remove-item" data-id = ${item.id}>remove</span>
            </div>
            <div>
              <i class="fas fa-chevron-up" data-id = ${item.id}></i>
              <p class="item-amount">
                ${item.amount}
              </p>
              <i class="fas fa-chevron-down" data-id = ${item.id}></i>
            </div>
          </div>
            <!-- cart item -->
                `;
                cartContent.appendChild(div);
                console.log(cartContent);
               
    }

    showCart(){
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add("showCart")
}
setupApp(){
    cart = Storage.getCart();
    this.setCartvalues(cart)
    this.populateCart(cart)
    cartBtn.addEventListener('click',this.showCart)
    closeCartBtn.addEventListener('click',this.hideCart)

    }
    populateCart(cart){
        cart.forEach(item => this.addcartItem(item))
    }
   
    hideCart(){
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove("showCart")
    }
    cartLogic(){
        //clear cartbutton logic
        clearCartBtn.addEventListener('click', ()=> {
            this.clearCart();
        });
        //cart functionality
        cartContent.addEventListener('click', event =>{
            if(event.target.classList.contains('remove-item')){
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                 cartContent.removeChild(removeItem.parentElement.parentElement);
                 this.removeItem(id)
            }else if(event.target.classList.contains('fa-chevron-up')){
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartvalues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount
            }
            else if(event.target.classList.contains('fa-chevron-down')){
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                 if (tempItem.amount > 0){
                Storage.saveCart(cart);
                this.setCartvalues(cart);
                lowerAmount.previousElementSibling.innerText = tempItem.amount
            
                }
                else{
                    cartContent.removeChild(lowerAmount.parentElement.parentElement)
                    this.removeItem(id)
                }
           }
        });
    }
    clearCart(){
        let cartItems = cart.map(item => item.id)
        cartItems.forEach(id => this .removeItem(id))
        while(cartContent.children.length > 0){
            cartContent.removeChild(cartContent.children[0])
        }
        this.hideCart()
    }
    removeItem(id){
        cart = cart.filter(item => item.id !== id);
        this.setCartvalues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to bag`;
          
    }
    getSingleButton(id){
        return buttonsDOM.find(button => button.dataset.id === id);

    }
}


//local storage

class Storage{
    static saveProducts(newProducts){
        localStorage.setItem("newProducts", JSON.stringify(newProducts))
    }
    static getProducts(id){
        let newProducts = JSON.parse(localStorage.getItem('newProducts'));
        return newProducts.find(newProducts => newProducts.id === id);
    }
    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    static getCart(){
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
    }
    
}

//event listener
document.addEventListener("DOMContentLoaded", ()=>{
    const ui = new UI();
    const products = new Products();
    //set upp app
    ui.setupApp()
      ui.setupApp2()
      ui.cartLogic()
    // get all product
    products.getProducts().then(newProducts =>{
        ui.displayProducts(newProducts)
        Storage.saveProducts(newProducts)
    }).then(()=>{
       ui.getPreviewButtons();
       ui.getBagButtons();
    });
});

function changeImage(event){
    const thumbs=document.querySelector(".small-img-row").children;
    document.querySelector(".pro-img").src=event.children[0].src
        for(let i=0; i > thumbs.length; i++){
            thumbs[i].classList.remove("active");
        }
        event.classList.add("active")
    }