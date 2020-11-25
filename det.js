//variables
const detailsDOM = document.querySelector(".small-cont");
const PriceDOM = document.querySelector(".price-info");
let cart = []

//buttons
class ProductDetails{
    async getProductDetails(){
        try{
             let result = await fetch('producta.json')
             let data = await result.json();
             let newProducts = data.items
             newProducts = newProducts.map(item =>{
                const{title,price,descrip,tax} = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                const imagea = item.fields.imagea.fields.file.url;
                const imageb = item.fields.imageb.fields.file.url;
                const imagec = item.fields.imagec.fields.file.url;
                const imaged = item.fields.imaged.fields.file.url;
                return {title, price,descrip,tax,id, image, imagea, imageb,imagec,imaged};
            });
            return newProducts;
        }catch(error){
            console.log(error);
        }
    }
}

class UI{
    displayProductD(newProducts){
        let result = "";
        newProducts.forEach(product => {
        result +=`
            <div class="row">
                <div class="col-2">
                    <img class="pro-img" src="${product.image}" alt="" width="100%">
                
                    <div class="small-img-row">
                        <div class="small-img-col" onclick="changeImage(this)">
                            <img src="${product.imagea}" alt="" width="100%" class="small-img" >
                        </div>
                        <div class="small-img-col" onclick="changeImage(this)">
                            <img src="${product.imageb}" alt="" width="100%" class="small-img" >
                        </div>
                        <div class="small-img-col" onclick="changeImage(this)">
                            <img src="${product.imagec}" alt=""  width="100%" class="small-img" >
                        </div>
                        <div class="small-img-col" onclick="changeImage(this)">
                            <img src="${product.imaged}" alt="" width="100%" class="small-img" >
                        </div>
                    </div>
                </div>
            
                <div class="col-2">
                    <p><i class="fa fa-indent"></i>${product.descrip}</p>
                    <h1>${product.title}</h1>
                    <h4>${product.price}</h4>
                     <h4>${product.tax}</h4>
                    <a href="" class="btn">Add to cart</a>
                </div>
            </div> `
        });
        detailsDOM.innerHTML = result;
    }
}

class Storage{
    static saveProducts(newProducts){
        localStorage.setItem("newProducts", JSON.stringify(newProducts)
        );
    }
}






//event listener
document.addEventListener("DOMContentLoaded", ()=>{
    const ui = new UI();
    const products = new ProductDetails();
    // get all product
    products.getProductDetails().then(newProducts =>{
        ui.displayProductD(newProducts);
        Storage.saveProducts(newProducts);
    }).then(()=>{

    });
})
    //image changer
function changeImage(event){
    const thumbs=document.querySelector(".small-img-row").children;
    document.querySelector(".pro-img").src=event.children[0].src
        for(let i=0; i > thumbs.length; i++){
            thumbs[i].classList.remove("active");
        }
        event.classList.add("active")
    }