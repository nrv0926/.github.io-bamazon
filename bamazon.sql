DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id int NOT NULL AUTO_INCREMENT,
  product_name varchar(255) NOT NULL,
  department_name varchar(255) NOT NULL,
  price DECIMAL  NULL,
  stock_quantity int  NULL,
  PRIMARY KEY (item_id)
  
);

INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "pen", "office supplies",2.99, 200 );
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "pencils", "office supplies",1.99, 400 );
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "papper", "office supplies",8.99, 220 );
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "stapler", "office supplies",4.99, 400 );
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "folders", "office supplies",.99, 150 );
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "printer", "office supplies",69.99, 200 );
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "ink", "office supplies",59.99, 1100 );
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "erasers", "office supplies",7.99, 200 );
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "laminator", "office supplies",76.99, 20 );
INSERT INTO products ( product_name, department_name, price, stock_quantity) VALUES ( "notebooks", "office supplies",12.99, 500 );
