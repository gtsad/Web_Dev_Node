toCart()

function getForm() {
  const currentUrl = window.location.search;
  const parmsFromUrl = new URLSearchParams(currentUrl);

 
  var sessionid = parmsFromUrl.get("sessionid");
  var username=parmsFromUrl.get("username");;
  if(sessionid!==null){
    window.alert('Already logged In')
        throw new Error('Already logged In')
  }



  var form = document.getElementById("login-form");
  var formData = new FormData(form);
  var object = {};
  
  formData.forEach(function (value, key) {
    object[key] = value;
  });
  json = JSON.stringify(object);
  console.log(json);

  fetch("http://localhost:3000/login", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    //make sure to serialize your JSON body
    body: json,
  })
    .then((response) => {
        if (response.ok) {
         
          return response.json();
        }
        window.alert('Username or password wrong.')
        throw new Error('Something went wrong')
        
      })
      .then((responseJson) => {
        console.log(JSON.parse(responseJson))
        sessionid=JSON.parse(responseJson)['sessionID']
        username=JSON.parse(json)['username']
        window.location.href = document.referrer+"&sessionid="+sessionid+"&username="+JSON.parse(json)['username'];
      })
      .catch((error) => {
        console.log(error)
      });
}


function toCart(){
 
  document.getElementById("cart-img").setAttribute("onClick","javascript: onClickCart()")
}

function onClickCart(){
  const currentUrl = window.location.search;
  const parmsFromUrl = new URLSearchParams(currentUrl);

 
  var sessionid = parmsFromUrl.get("sessionid");
  var username=parmsFromUrl.get("username");;
  window.location.href = "cart"+"?sessionid="+sessionid+"&username="+username;
}
