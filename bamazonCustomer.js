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
    writeTable();
});

function writeTable() {
    connection.query("SELECT * FROM bamazon.products", function (err, res){
        console.table(res);
        startPrompt();
    });

}

function startPrompt() {

    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the item you would like to purchase? [Quit with Q] ",
            name: "unitID",
            default: "Q"
        }
    ]).then(function(response) {
        if (response.unitID === "Q"){
            connection.end();
        }
        else {
            amountPrompt( response.unitID);
        }
    });
}

function amountPrompt( unitID ) {
    inquirer.prompt([
        {
            type: "input",
            message: "How many units of the product would you like to purchase? ",
            name: "unitAmt",
            default: "0"
        }
    ]).then(function(response) {
        purchasePrompt( unitID, response.unitAmt );
    });
}

function purchasePrompt( unitID, unitAmt ) {
    connection.query("SELECT * FROM products WHERE ?",
    {
        item_id: unitID
    },
    function(err, res) {
        if (unitAmt > res[0].stock_quantity) {
            console.log("Insufficient quantity");
            amountPrompt( unitID );
        }
        else {
            conductTransaction( unitID, unitAmt, res[0].product_name, res[0].price, res[0].stock_quantity );
        }
    });
}

function conductTransaction( unitID, unitAmt, unitName, unitPrice, unitStock ) {
    var cost = unitAmt * unitPrice;
    var remainingStock = unitStock - unitAmt;

    console.log("You've purchased " + unitAmt + "x of " + unitName + ".");
    console.log("The total cost of your order is " + cost + " usd.")

    connection.query("UPDATE products SET ? WHERE ?",
    [
        {
            stock_quantity: remainingStock
        },
        {
            item_id: unitID
        }
    ],
    function(err, res) {
        continueQuery();
    });
}

function continueQuery() {
    inquirer.prompt ([
        {
            type: "list",
            message: "Would you like to make another purchase? ",
            choices: ["CONTINUE", "QUIT"],
            name: "selection"
        }
    ]).then(function(response) {
        switch (response.selection) {
            case "CONTINUE":
                writeTable();
                break;
            
            case "QUIT":
                connection.end();
                break;
        }
    });
}