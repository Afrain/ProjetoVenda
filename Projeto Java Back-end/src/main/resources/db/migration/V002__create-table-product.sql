CREATE TABLE product(
	id serial CONSTRAINT id_product PRIMARY KEY,
	name varchar(100) NOT NULL,
	description varchar(100),
	price DECIMAL(10,2) NOT NULL
);

INSERT INTO product (name, description, price) VALUES ('ARROZ', 'TIO JORGE 5KG', 19.99);
INSERT INTO product (name, description, price) VALUES ('FEIJÃO', 'DONA COTA 1KG', 8.99);
INSERT INTO product (name, description, price) VALUES ('MACARRÃO', 'EMEGE 300G', 4.99);
INSERT INTO product (name, description, price) VALUES ('AÇUCAR', 'CRISTAL 5KG', 13.99);
INSERT INTO product (name, description, price) VALUES ('LEITE', 'PIRACANJUBA', 8.99);