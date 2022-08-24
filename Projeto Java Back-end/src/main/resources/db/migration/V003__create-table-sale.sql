CREATE TABLE sale(
	id serial CONSTRAINT id_sale PRIMARY KEY,
	client_id INTEGER NOT NULL,
	FOREIGN KEY (client_id) REFERENCES client (id)
);

INSERT INTO sale (client_id) VALUES (1);
INSERT INTO sale (client_id) VALUES (2);
INSERT INTO sale (client_id) VALUES (3);
INSERT INTO sale (client_id) VALUES (4);
INSERT INTO sale (client_id) VALUES (5);