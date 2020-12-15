CREATE DATABASE database_finalBD;

USE database_finalBD;

CREATE TABLE cliente (
			cedula		NUMBER (8) PRIMARY KEY NOT NULL,
			nombre 	VARCHAR2(30) NOT NULL,
			fecha_cumple 	VARCHAR2(30),
			teléfono	VARCHAR2(30) NOT NULL,
			dirección	VARCHAR2(30),
			pedido_id	NUMBER (8) FOREING KEY REFERENCES pedido (id_pedido)
		);


		CREATE TABLE pedido (
			id_pedido		NUMBER (8) PRIMARY KEY NOT NULL,
			pedido_local		VARCHAR2 (2) NOT NULL,
			pedido_domicilio	VARCHAR2 (2) NOT NULL,
			cliente_id		NUMBER (8) FOREING KEY REFERENCES cliente (cedula) NOT NULL,
			mesero_id		NUMBER (8) FOREING KEY REFERENCES empleado (cedula) NOT NULL
		);

		CREATE TABLE empleado (
			cedula			NUMBER (8) PRIMARY KEY NOT NULL,
			sueldo			NUMBER (8) NOT NULL,
			chef			VARCHAR2 (2) NOT NULL,
			mesero			VARCHAR2 (2) NOT NULL,
			domiciliario		VARCHAR2 (2) NOT NULL,
			pedido_id		NUMBER (8) FOREING KEY REFERENCES pedido (id_pedido) NOT NULL,
			domicilio_id		NUMBER (8) FOREING KEY REFERENCES domicilio (id_domicilio) NOT NULL
		);



