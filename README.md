# Bamazon
***

The Bamazon Node application allows the user to set up a database on mysql, and provides two seperate .js files which grant the user customer or manager privileges to the mysql database. 

The customer is enabled the ability to buy items from the database (if the stock is available) and is then told the cost associated. 

The manager is enabled the ability to view the entire database, view all entries in the database with a low (less than 5) stock, to add to the quantity of an existing entry, and to add a new entry to the database. 


## Why Bamazon
***

Because it's cheap and easy to use as well as satisifies all of your management needs... what more of a reason do you need? 


## Features
***

* Customer Purchase
* Manager Inventory View
* Manager Low Inventory View
* Manager Add Stock 
* Manager Add New Item


## NPMs Required
***

* Inquirer
* MySQL
* Console.Table


## Application Walkthrough
***

#### Customer Application

This is the starting prompt of the customer application, which requests an ID number to be input or a Q if the user would like to exit.
<br />
![alt text](./assets/images/bamazon-customer-startprompt.JPG?raw=true "Starting Prompt")
<br />
This is a final of all inputs used. You can see in the image that the user selected item_id 4, which are the "Cool Shades" and desired to purchase 25 of the item. Because only 5 are in stock that transaction is not possible. The user is then prompted with the same question asking how many they'd like to purchase. The user then inserts the number 2, which is less than the stock_quantity and thus the transaction is made. The result is the user being told what they've purchased and how much it would cost. Additionally the user is given a list of whether they'd like to CONTINUE or QUIT. If continue is selected, the start prompt is displayed (as seen below).
<br />
![alt text](./assets/images/bamazon-customer-continueshopping.JPG?raw=true "Entire Program")
<br />

#### Manager Application