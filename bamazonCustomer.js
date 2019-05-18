var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
  console.log("Welcome to Bamazon!");
  display();
}) 

function display() {
  connection.query("SELECT * FROM products", function(err, results) {
    for (var i = 0; i < results.length; i++) {
      console.log(results[i].item_id + " | " + results[i].product_name + " | " + 
      results[i].department_name + " | $" + results[i].price + " | " + results[i].stock_quantity);
    }
    console.log("-----------------------------------");
    buy();
  });
}

function buy() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "item_id",
        type: "input",
        message: "What is the ID of the item you would like to buy?"
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How many units would you like to buy?"
      }
    ])
    .then(function(input){
      var item = input.item_id;
      var quantity = input.stock_quantity;
      var queryString = "SELECT * FROM products WHERE ?";
      connection.query(queryString, {item_id: item}, function(err, results) {
        if (err) throw error;
        var productInfo = results[0];
        if (quantity <= productInfo.stock_quantity){
          console.log("Order Successful!");
          var newQueryString = "UPDATE products SET stock_quantity = " + (productInfo.stock_quantity - quantity) + " WHERE item_id = " + item;
          connection.query(newQueryString, function(err, results){
            console.log("Your order total is: $" + productInfo.price * quantity);
            connection.end();
          })
        }
        else {
          console.log("Sorry we do not have enough inventory to fill your order. Please try again.");
          display();
        }
      })
    })
  });
}