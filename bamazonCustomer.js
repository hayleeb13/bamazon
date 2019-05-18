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
  console.log("connected as id " + connection.threadId);
  console.log("Welcome to Bamazon!");
  displayProducts();
});

function displayProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].item_id +
          " | " +
          res[i].product_name +
          " | " +
          res[i].department_name +
          " | " +
          res[i].price +
          " | " +
          res[i].stock_quantity
      );
    }
    console.log("-----------------------------------");
  });
  buyProduct();
}

function buyProduct() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
        name: "choice",
        type: "rawlist",
        message: "What is the ID of the item you would like to buy?",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results[i].length; i++) {
            choiceArray.push(results[i].item_id);
          }
          return choiceArray;
        },
        },
        {
        name: "amount",
        type: "input",
        message: "How many units would you like to buy?"
        }
      ])
      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.choice) {
            chosenItem = results[i];
          }
        }
        if (chosenItem.stock_quantity >= parseInt(answer.amount)) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: stock_quantity - answer.amount
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Order Sucessful!");
              console.log("Your total is: " + answer.amount * chosenItem.price);
            }
          )
        }
        else {
          console.log("Insufficient Quantity!");
        }
      });
  });
}
