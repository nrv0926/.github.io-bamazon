// require packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// database hosting information 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "vega060615",
    database: "bamazonDB"
});

// error connection catch/ start application
connection.connect(function (error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId + "\n");
    customerMenu();
});

function customerMenu() {
    // clear screen 
    console.clear();
    // main menu customer option display
    console.log("\n----------=Main Menu=----------\n")
    inquirer.prompt([{
            name: "products",
            message: "Please select a product",
            type: "list",
            choices: ["Checkout", "Cancel Order"]
        }

    ]).then(function (item) {
        var selection = item.products;
        switch (selection) {
            case ("Checkout"):
                console.clear();
                productList();
                break;

            case ("Cancel Order"):
                connection.end();
                break;
        }
    });
}

function productList() {
    console.log("\n----------=Product List=----------\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var items = res;
        for (var i = 0; i < items.length; i++) {
            console.log("|| ID: " + items[i].item_id + "\n||" + " Product: " + items[i].product_name + "\n||" + " Department: " + items[i].department_name + "\n|| " + "Price: " + items[i].price + "\n||" + " Quantity in Stock: " + items[1].stock_quantity);
            console.log("\n----------------------------------\n");

        };
        findProduct(items);
    });
}

function findProduct(items) {
    inquirer.prompt([{
            name: "id",
            message: "Enter ID number: ",
            type: "number",
        }])
        .then(function (res) {
            var purchasedItem = items[(res.id - 1)];
            selectQuantity(purchasedItem);
        });
}

function selectQuantity(purchasedItem) {
    inquirer.prompt([{
        name: "quantity",
        message: "Great! please input how many units of  \"" + purchasedItem.product_name + "\" would you like to purchase?",
        type: "number",
    }]).then(function (res) {
        if (res.quantity > purchasedItem.stock_quantity) {
            tryAgain();
        } else {
            var price = (purchasedItem.price * res.quantity);
            var newQuantity = purchasedItem.stock_quantity - res.quantity;
            newStockQuantity(newQuantity, purchasedItem, price);
            console.log("Thank you for purchasing " + res.quantity + " unit(s) of " + purchasedItem.product_name + "(s)\n" + "Total Cost is: $" + price + "\n");
            continueShopping();

        }

    });
}

function tryAgain() {
    inquirer.prompt([{
        name: "insufficient",
        message: "insufficient stock please enter a lower order size.",
        type: "list",
        choices: "Try Again"


    }]).then(function (res) {
        customerMenu();
    });
}

function continueShopping() {
    inquirer.prompt([{
            name: "continue",
            message: "Would you wish to continue shopping?",
            type: "list",
            choices: ["Continue", "Finished for now"]
        }

    ]).then(function () {
        var selection
        switch (selection) {
            case ("Continue"):
                console.clear();
                customerMenu();
                break;

            case ("Finished for now"):
                connection.end();
                break;
        }
    });
}

function newStockQuantity(newQuantity, purchasedItem, price) {
    var query = connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: newQuantity
        }, {
            item_id: purchasedItem.item_id
        }],

    );
};