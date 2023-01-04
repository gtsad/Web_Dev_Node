function fetchAndShowProducts(sub_id) {


const currentUrl = window.location.search;
const parmsFromUrl = new URLSearchParams(currentUrl);

  var id = parmsFromUrl.get('categoryId')



console.log(id);
  var api_url = "https://wiki-shop.onrender.com/categories/" + id + "/products";
  var template = "products-template";
  var div = "items_grid";
  fetchAndShow(api_url, template, div);
  fetchAndShowTitle(id);
  fetchAndShow(
    "https://wiki-shop.onrender.com/categories/" + id + "/subcategories",
    "categoriesMenu-template",
    "categories_list"
  );
}

function filterById(jsonObject, id) {
  return jsonObject.filter(function (jsonObject) {
    return jsonObject["id"] == id;
  })[0];
}

function filterBySubId(jsonObject, id) {
  return jsonObject.filter(function (jsonObject) {
    return jsonObject["subcategory_id"] == id;
  });
}

function fetchAndShowTitle(id) {
  var api_url = "https://wiki-shop.onrender.com/categories";
  var template = "catTitle-template";
  var div = "gridddd";

  fetchAndShow(api_url, template, div, true, id);
}

function fetchAndShowCategories() {
  var api_url = "https://wiki-shop.onrender.com/categories";
  var template = "welcome-template";
  var div = "main_divdiv";
  fetchAndShow(api_url, template, div);
}

function fetchAndShow(api_url, template, div, specific_el, id, subCat) {
  // Defining async function
  async function getapi(url) {
    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    show(data);
  }
  // Calling that async function
  getapi(api_url);

  let myinfo = document.getElementById(template);

  var template = Handlebars.compile(myinfo.textContent);

  var text_temp = myinfo.textContent;

  function show(data) {
    var wrapper = { objects: data };
    console.log(wrapper);
    if (specific_el === true) {
      var wrapper = filterById(wrapper["objects"], id);
    }

    var filled = template(wrapper, { noEscape: false });

    document.getElementById(div).innerHTML += filled;
  }
}

function changeFunc(value) {
  var boxes = document.querySelectorAll(".product_card");


  if (value === "all") {
    boxes.forEach((boxes) => {
      boxes.style.display = "flex";
    });
  }else{
    boxes.forEach((boxes) => {
      boxes.style.display = "flex";
      if (boxes.dataset.sub_id !== value) {
        boxes.style.display = "none";
      }
    });
  }



 
}
