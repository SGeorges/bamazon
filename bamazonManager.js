var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "INSERT PASSWORD HERE",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startPrompt();
});

function startPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do? ",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"],
            name: "action"
        }
    ]).then(function(response) {
        switch(response.action) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewInventory();
                break;

            case "Add to Inventory":
                connection.query("SELECT product_name FROM bamazon.products", function(err, res){
                    var products = [];
                    for (let i = 0; i < res.length; i++) {
                        products.push(res[i].product_name);
                    };

                    addInvPrompt( products );
                });
                break;
            
            case "Add New Product":
                addProduct();
                break;

            case "Quit":
                connection.end();
                break;
        }
    });
}

function viewProducts() {
    connection.query("SELECT * FROM bamazon.products", function (err, res){
        console.table(res);

        startPrompt();
    });
}

function viewInventory() {
    connection.query("SELECT * FROM bamazon.products WHERE stock_quantity <= 5", function(err, res){
        console.table(res);

        startPrompt();
    });
}

function addInvPrompt( products ) {
    inquirer.prompt([
        {
            type: "list",
            message: "Which item would you like to add inventory to? ",
            choices: products,
            name: "selection"
        }
    ]).then(function(response) {
        connection.query("SELECT * FROM bamazon.products WHERE ?",
        {
            product_name: response.selection
        }, 
        function(err, res) {
            addInv(response.selection, res[0].stock_quantity);
        })
    });
}

function addInv( selected_product, stock_quantity ) {
    inquirer.prompt([
        {
            type: "input",
            message: "How much" + selected_product + "would you like to add? ",
            name: "amt",
            default: 0
        }
    ]).then(function(response) {
        var newAmt = parseInt(stock_quantity) + parseInt(response.amt);

        connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newAmt
            },
            {
                product_name: selected_product
            }
        ], 
        function(err,res) {
            console.log(selected_product + " now has " + newAmt + " units in stock.");
            startPrompt();
        });
    });
}

function addProduct(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the product you'd like to add? ",
            name: "name"
        },
        {
            type: "input",
            message: "What is the department the product belongs? ",
            name: "dept"
        },
        {
            type: "input",
            message: "What is the price of the product? ",
            name: "price"
        },
        {
            type: "input",
            message: "How much of the product do we have in stock? ",
            name: "stock"
        }
    ]).then(function(response){
        connection.query("INSERT INTO products SET ?",
        {
            product_name: response.name,
            department_name: response.dept,
            price: response.price,
            stock_quantity: response.stock
        }, function(err, res){
            if (err) throw err;

            console.log("Your item " + response.name + " has been added.");
            startPrompt();
        });
    });
}