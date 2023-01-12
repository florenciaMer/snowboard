function productsInCart(){
    let total = 0;
    if(localStorage.cart){
      let cart = JSON.parse(localStorage.cart)
      for(let i =0; i< JSON.parse(localStorage.cart).length; i++){
        total = parseInt(cart[i].quantity) + total;
      }
     return total
    }else{
      return 0
    }
    //return localStorage.cart? JSON.parse(localStorage.cart).length:0;
  }

function setCartVacio() {
    cartRows.innerHTML = `
    <tr>     
        <td colspan="5"><div class="alert alert-warning my-2 text-center">Dont have products in the cart</div></td>
    </tr>            
    `;
  }

function removeItem(index) {
    let cart = JSON.parse(localStorage.cart)

    if (cart.length > 1) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      document.getElementById(`row${index}`).remove();
      
    } else {
      localStorage.removeItem("cart");
      myProducts = [];
      setCartVacio();
    }
  
    let cartNumber = document.querySelector(".cart-number");
    cartNumber.innerText = productsInCart();
    myProducts = JSON.parse(localStorage.cart)

    var myProducts = [];
if(localStorage.cart){
    let cart = JSON.parse(localStorage.cart)
    cart.forEach((item, index) => {
        fetch(`/api/product/${item.id}`)
        .then(res => res.json()
        .then(product =>{
           if(product){ //si el producto no viene lo tengo que borrar de la lista del local
      
                    myProducts.push({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: item.quantity,
                    });
                   
                
                }else{ // no vino el producto de la base de datos
                        //borra la cantidad de item indicada de localstorage
                        cart.splice(index, 1)
                        localStorage.setItem('cart', JSON.stringify(cart))
                    }
        })
        .then(() =>{
            console.log('myproduct in reduceeee')
            console.log(myProducts)
            document.querySelector('.totalAmount').innerText = `$${calTotal(myProducts)}.-`
            }));
        });
}

   
  
    toastr.success("Item deleted");
  }

function setCart(){
    cartRows.innerHTML = `
        <tr>
            <td colspan="5"><div class="alert alert-warning my-2 text-center">
                Do not have any products in the cart
            </td>
        </tr>`
}

function removeCart(){
    localStorage.removeItem("cart");
}


function calTotal(products){
    console.log(products)
      return products.reduce(
        (acum, product) =>  
             (acum += Number(product.price) * Number(product.quantity)),
            0    
    );
}

let cartRows = document.querySelector('.cartRows')
var myProducts = [];
if(localStorage.cart){
    let cart = JSON.parse(localStorage.cart)
    cart.forEach((item, index) => {
        fetch(`/api/product/${item.id}`)
        .then(res => res.json()
        .then(product =>{
           if(product){ //si el producto no viene lo tengo que borrar de la lista del local
            cartRows.innerHTML += `
             
               
                <tr id="row${index}" class="rowsColumn">
                 
                    <td> <img src="/images/${product.image}" width="60"</td>
                    <td>${product.name}</td>
                    <td>$${product.price}.-</td>
                    <td>

                    <input id="form1" min="1" name="inputQuantity" value="${item.quantity}" type="number"
                    class="inputQuantity form-control form-control-sm w-60 d-inline " />
                  
                    </button>
                    </td>
                    <td class="subtotal">$${parseFloat(product.price * item.quantity,2).toFixed(0)}.-</td>
                    <td><button class="btn btn-danger btn-sm" onclick=removeItem(${index})><i class="fas fa-trash"></i></button></td>
                </tr>   
                
            `
                    myProducts.push({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: item.quantity,
                    });
                
                let inputQuantity = document.querySelector('.inputQuantity')
                let subtotal = document.querySelector('.subtotal')
                inputQuantity.addEventListener("change", function(){
                    subtotal.innerHTML = "$"+parseFloat(product.price * inputQuantity.value,2).toFixed(0)+".-"
                    
                    let cart = JSON.parse(localStorage.cart)
                    for(let i =0; i< cart.length; i++){
                     
                   
                        if(cart[i].id == product.id){
                         
                            cart[i].quantity = inputQuantity.value
                            localStorage.setItem('cart', JSON.stringify(cart))
                            cart = JSON.parse(localStorage.cart)
                         
                           for(let i =0; i< cart.length; i++){
                               for(let j=0; j< myProducts.length; j++){
                                if(cart[i].id == myProducts[j].productId){
                                    cart[i].price = myProducts[j].price
                                }
                               }
                            }
                            document.querySelector('.totalAmount').innerText = `$${calTotal(cart)}.-`
                        };
                    }
                   
                })
                }else{ // no vino el producto de la base de datos
                        //borra la cantidad de item indicada de localstorage
                        cart.splice(index, 1)
                        localStorage.setItem('cart', JSON.stringify(cart))
                    }
        })
        .then(() =>{
            console.log('myproduct in reduce')
            console.log(myProducts)
            document.querySelector('.totalAmount').innerText = `$${calTotal(myProducts)}.-`
            }));
        });
}

let checkoutCart = document.querySelector('#checkoutCart');

checkoutCart.addEventListener('submit', function(e){
    e.preventDefault() 
    //armo el objeto que voy a mandar 
    const formData = {
        OrderItems: myProducts,
        paymentMethod: checkoutCart.paymentMethod.value,
        shippingMethod: checkoutCart.shippingMethod.value,
        total: calTotal(myProducts),
    };
    
    //le mando los datos de la compra a controller
    fetch(`/api/checkout`,{
        method: "POST",
        headers: {"Content-type":"application/json;charset=utf-8",
        'Access-Control-Allow-Origin': '*'
    },
        body: JSON.stringify(formData),
       // mode:"no-cors",
    }).then(response => response.json())

        .then(res =>{
            console.log('response en then desp checkout')
            if(res.ok){
                console.log('hizo el checkout')
             //   removeCart()

               location.href = `/order/${res.order.id}`
            }
        })
    
    })


 