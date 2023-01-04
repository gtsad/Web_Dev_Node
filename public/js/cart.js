async function getapi(url) {
    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    show(data);
  }
  // Calling that async function
  getapi('http://localhost:3000/getcart');

 function show(data){
    console.log(data)

    let myinfo = document.getElementById('products-template');

    var template = Handlebars.compile(` {{#each .}}
    <div id="cart_item">
      <div id="cart_img_container"><img src='{{this.img}}' alt="0" /></div>
      <div id="cart-item-title"><h2>{{this.title}}</h2></div>
      <div id="cart-item-price"><h2 >{{this.price}}$ </h2></div>
      <div id="meter" >
        <div><button onclick="increaseQuantity('{{this.id}}','{{this.price}}')"
         class="quant" id="plus">+</button></div>
        <div><p id="quant-text">Quantity: {{this.number}}</p></div>
        <div><button onclick="decreaseQuantity('{{this.id}}','{{this.price}}')" class="quant" id="min">-</button></div>
      </div>
    </div>
  {{/each}}`);

    var filled = template(data.cart, { noEscape: true });

    document.getElementById('cart_container').innerHTML = filled;

   myinfo = document.getElementById('totalcost-template');

   template = Handlebars.compile(` <h2 id="totalpricetext">Total: {{this.totalcost}}$</h2>`);

   filled = template(data, { noEscape: true });

    document.getElementById('total-price').innerHTML = filled; 

    console.log('len is'+data.cart.lenght)
   if (data.cart.length===0){
      document.getElementById('cart_container').innerHTML = "<h2>Your cart is empty</h2>";
   }else{
      
   }



 }

 function increaseQuantity(id,price){
   const currentUrl = window.location.search;
   const parmsFromUrl = new URLSearchParams(currentUrl);
 
   var usernamepar = parmsFromUrl.get("username");

   var sessionid = parmsFromUrl.get("sessionid");
 
   console.log(id);
 
   var object = {};

   object['username']=usernamepar;
   object['sessionid']=sessionid;
   object["id"] = id;
   object["price"]= price;
   var json = JSON.stringify(object);


   fetch("http://localhost:3000/addcart", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
  
      //make sure to serialize your JSON body
      body: json,
    }).then((response) => {
      if (response.ok) {
          tempAlert('Item added to your cart!',1000)
        console.log("added successfyllu");
        getapi('http://localhost:3000/getcart');
        return response.json();
      }
      else{
          window.alert('You have to login to add to cart')
          throw new Error('Something went wrong')
      }
    })

   
 
  }


  function decreaseQuantity(id,price){
   const currentUrl = window.location.search;
   const parmsFromUrl = new URLSearchParams(currentUrl);
 
   var usernamepar = parmsFromUrl.get("username");

   var sessionid = parmsFromUrl.get("sessionid");
 
   console.log(id);
 
   var object = {};

   object['username']=usernamepar;
   object['sessionid']=sessionid;
   object["id"] = id;
   object["price"]= price;
   var json = JSON.stringify(object);


   fetch("http://localhost:3000/removeItem", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
  
      //make sure to serialize your JSON body
      body: json,
    }).then((response) => {
      if (response.ok) {
          tempAlert('Item removed from your cart!',1000,false)
        console.log("added successfyllu");
        getapi('http://localhost:3000/getcart');
        return response.json();
      }
      else{
          window.alert('You have to login to add to cart')
          throw new Error('Something went wrong')
      }
    })

   
 
  }



   