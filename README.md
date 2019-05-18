# bamazon

* This project uses node and mySQL to create an online store. 
* The program displays different items with their description, quantity, and price.
* The user is then prompted to enter the ID number and quantity for the item they want to purchase.
* If the user enters an item with a quantity that is higher than the amount in stock it displays a message that says insufficient quantity and prompts the user to choose again. 
* If the user enters a item with a quantity that is lower or equal to the amount in stock, the program tells the user that the order was successful. It then displays the total and updates the new number of items in stock.
* If the user enters a item id that is not valid the program prompts the user to try again.
* If no input is entered the program will output that the item id is invalid.
* A quantity entered that is not a number will output that there is an insufficient quantity.
* If the quantity is left blank then the program will sent quantity to zero.
* The project is useful because it allows someone to enter an item and alter the item's quantity in a database.
* Simply get started by entering "node bamazonCustomer.js" and following the prompts.
* Any questions or issues regarding this program can be directed to Haylee Bell email hayleeb13@gmail.com.

* Links to pictures of working code:
* Input Example:
https://github.com/hayleeb13/bamazon/blob/master/command.PNG

* Outputs:
https://github.com/hayleeb13/bamazon/blob/master/insufficient_inventory.PNG
https://github.com/hayleeb13/bamazon/blob/master/invalid_id.PNG
https://github.com/hayleeb13/bamazon/blob/master/order_successful.PNG
https://github.com/hayleeb13/bamazon/blob/master/updated_quantity.PNG