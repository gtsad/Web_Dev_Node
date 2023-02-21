const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const { v4: uuidv4 } = require("uuid");
const sessions = require("express-session");
const { json } = require("express");

app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const myusername = "user1";
const mypassword = "mypassword";

var user = {
  username: "user1",
  password: "user1",
  cart: [],
  cartitems: 0,
  sessionid: 0,
  totalcost: 0,
};

// a variable to save a session

var session;

app.get("/", (req, res) => {
  var options = {
    root: path.join(__dirname, "public"),
  };

  res.sendFile("index.html", options, function (err) {
    console.log(err);
  });
});

app.get("/category.html", (req, res) => {
  var options = {
    root: path.join(__dirname, "public"),
  };

  res.sendFile("index.html", options, function (err) {
    console.log(err);
  });
});

app.post("/login", (req, res) => {
  var login_data = req.body;
  if (
    login_data["username"] === user.username &&
    login_data["psw"] === user.password
  ) {
    sessionsid = uuidv4();
    user.sessionid = sessionsid;
    res.json(JSON.stringify({ sessionID: sessionsid }));
  } else {
    res.sendStatus(404);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.post("/addcart", (req, res) => {
  var item_info = req.body;

  if (item_info["username"] === null) {
    res.sendStatus(404);
  } else {
    if (
      item_info["username"] === user.username &&
      item_info["sessionid"] === user.sessionid
    ) {
      var p_id = item_info["id"];
      let subid = item_info["subcategory_id"];
      let img = item_info["img"];
      let title = item_info["title"];
      let price = item_info["price"];
      price = parseInt(price);

      user.cartitems++;
      user.totalcost += price;

      if (user.cart.length === 0) {
        user.cart.push({
          id: p_id,
          sub_id: subid,
          number: 1,
          img: img,
          title: title,
          price: price,
        });
      } else {
        var alreadyExists;
        var pos = false;
        for (var i = 0; i < user.cart.length; i++) {
          if (user.cart[i].id == p_id) {
            pos = i;
            alreadyExists = true;
            break;
          }
        }

        if (alreadyExists) {
          user.cart[pos].number++;
        } else {
          user.cart.push({
            id: p_id,
            sub_id: subid,
            number: 1,
            img: img,
            title: title,
            price: price,
          });
        }
      }

      res.json(JSON.stringify({ cartitem: user.cartitems }));
      console.log(item_info);
      console.log(user);
    } else {
      res.sendStatus(404);
    }
  }
});

app.post("/removeItem", (req, res) => {
  var item_info = req.body;

  if (item_info["username"] === null) {
    console.log(item_info["username"]);
    res.sendStatus(404);
  } else {
    if (
      item_info["username"] === user.username &&
      item_info["sessionid"] === user.sessionid
    ) {
      var p_id = item_info["id"];
      let subid = item_info["subcategory_id"];
      let img = item_info["img"];
      let title = item_info["title"];
      let price = item_info["price"];
      price = parseInt(price);

      user.cartitems--;
      user.totalcost -= price;

      if (user.cart.length === 0) {
        user.cart.push({
          id: p_id,
          sub_id: subid,
          number: 1,
          img: img,
          title: title,
          price: price,
        });
      } else {
        var alreadyExists;
        var pos = false;
        for (var i = 0; i < user.cart.length; i++) {
          if (user.cart[i].id == p_id) {
            pos = i;
            alreadyExists = true;
            break;
          }
        }

        user.cart[pos].number--;

        if (user.cart[pos].number == 0) {
          user.cart.splice(pos, 1);
        }
      }

      res.json(JSON.stringify({ cartitem: user.cartitems }));
      console.log(item_info);
      console.log(user);
    } else {
      res.sendStatus(404);
    }
  }
});

app.get("/getcart", (req, res) => {
  res.json(user);
});

app.get("/cart", (req, res) => {
  if (
    user.username === req.query.username &&
    user.sessionid === req.query.sessionid
  ) {
    var options = {
      root: path.join(__dirname, "public"),
    };

    res.sendFile("cart.html", options, function (err) {
      console.log(err);
    });
  } else {
    var options = {
      root: path.join(__dirname, "public"),
    };

    res.sendFile("cart_fail.html", options, function (err) {
      console.log(err);
    });
  }
});
