
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
let cartNumber = document.querySelector(".cart-number")
cartNumber.innerText = productsInCart() 
let buttonBuy = document.querySelector(".addCart")

    buttonBuy.addEventListener("click",function(element){
        var dataId = document.querySelector(".addCart").getAttribute("data-id")
        let quantity = parseInt(document.querySelector(".quantity").value)

      if(localStorage.cart){
       let cart = JSON.parse(localStorage.cart)

       var index = cart.findIndex(product=>product.id==dataId); 
       if(index != -1){
        
           cart[index].quantity = parseInt(cart[index].quantity) + quantity
       }else{
            cart.push({id:dataId, quantity:quantity})
       }
       localStorage.setItem('cart', JSON.stringify(cart))
       }else{
        localStorage.setItem('cart', JSON.stringify([{id:dataId, quantity:quantity}]))
      
       }
      
          toastr["success"]("Product add to cart", "Congratulation",
          {"positionClass" : "toast-bottom-right"});
          toastr.options = {
           
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "60000",
            "extendedTimeOut": "60000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          };
          cartNumber.innerText = productsInCart()
          
     //warming  info err
})



