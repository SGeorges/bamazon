-- Drops the bamazon database if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "bamazon" database --
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect bamazon --
USE bamazon;

-- Creates the table "products" within bamazon --
CREATE TABLE products (
    -- Creates a numeric column called "item_id" which will automatically increment its default value as we create new rows --
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    -- Makes a string column called "product_name" which cannot contain null --
    product_name VARCHAR(100) NOT NULL,
    -- Makes a string column called "department_name" which cannot contain null --
    department_name VARCHAR(100) NOT NULL,
    -- Makes a numeric column called "price" which cannot contain null --
    price FLOAT(10, 2) NOT NULL,
    -- Makes a numeric column called "stock_quantity" which cannot contain null --
    stock_quantity INTEGER(10) NOT NULL,
    -- Sets "item_id" as this table's primary key which means all data contained within it will be unique --
    PRIMARY KEY (item_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Uncharted 4", "Video Games", 49.99, 147);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DOOM", "Video Games", 59.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crate of Spam", " Food and Drink", 24.50, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cool Shades", "Apparel", 75.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Aaron's Worn Denim Jeans", "Apparel", 169.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Survival Towel", "Necessities", 42.42, 42);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bill and Ted's Excellent Adventure", "Films", 15.00, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mad Max: Fury Road", "Films", 25.50, 57);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Monopoly", "Board Games", 30.50, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yahtzee", "Board Games", 19.95, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Safety Blanket", "Necessities", 50.24, 35);
