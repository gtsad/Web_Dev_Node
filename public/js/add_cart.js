function addToCart(id,price,img,title) {
  
  const currentUrl = window.location.search;
  const parmsFromUrl = new URLSearchParams(currentUrl);

  var catid = parmsFromUrl.get("categoryId");

  var usernamepar = parmsFromUrl.get("username");

  var sessionid = parmsFromUrl.get("sessionid");

  console.log(id);

  var object = {};
  object["title"]= title;
  object["price"]= price;
  object["id"] = id;
  object["subcategory_id"] = catid;
  object['username']=usernamepar;
  object['img']=img;
  object['sessionid']=sessionid;
  var json = JSON.stringify(object);

  console.log(json);

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
      return response.json();
    }
    else{
        window.alert('You have to login to add to cart')
        
        throw new Error('Something went wrong')
    }
  }).then((responseJson) => {
    console.log(JSON.parse(responseJson))
     var cartitems=JSON.parse(responseJson)['cartitem']
     console.log(cartitems)
     document.getElementById('text-counter').innerText= cartitems;
     
  })
}


function tempAlert(msg,duration,add)
{

 var el = document.createElement("div");
 el.setAttribute("id","item-added");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}

