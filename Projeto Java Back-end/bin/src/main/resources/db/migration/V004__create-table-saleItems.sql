CREATE TABLE sale_items(
	product_id INTEGER NOT NULL,
	sale_id INTEGER NOT NULL,
	amount INTEGER NOT NULL,
	price DECIMAL(10,2),
	
	FOREIGN KEY (product_id) REFERENCES product (id),
	FOREIGN KEY (sale_id) REFERENCES sale (id)
);

INSERT INTO sale_items (product_id, sale_id, amount, price) VALUES (1,1,10,19.99);
INSERT INTO sale_items (product_id, sale_id, amount, price) VALUES (2,1,10,8.99);

INSERT INTO sale_items (product_id, sale_id, amount, price) VALUES (1,2,10,19.99);
INSERT INTO sale_items (product_id, sale_id, amount, price) VALUES (2,2,10,8.99);
INSERT INTO sale_items (product_id, sale_id, amount, price) VALUES (3,2,10,4.99);

INSERT INTO sale_items (product_id, sale_id, amount, price) VALUES (3,3,10,4.99);

INSERT INTO sale_items (product_id, sale_id, amount, price) VALUES (4,4,10,13.99);

INSERT INTO sale_items (product_id, sale_id, amount, price) VALUES (5,5,10,8.99);