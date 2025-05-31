create database ojek_online;
use ojek_online;
create table driver(driver_ID int not null primary key, 
             driver_username varchar (20) not  null,
             driver_password varchar (8) not null,
             driver_address text,
             driver_phone int (12) not null,
             driver_email varchar(40),
             driver_type_of_vehicle varchar(15),
             driver_number_plate varchar(15));
create table customer (
    customer_ID int not null primary key,
    customer_username varchar(30),
    customer_phone int(15), 
    customer_email varchar(20),
    customer_address varchar(20),
    customer_password varchar(8)
);
create table orders (
    order_ID int not null primary key,
    customer_ID int not null,
    driver_ID int not null,
    order_time datetime,
    pickup_location varchar(30),
    destination varchar(30),
    distance decimal(3,1),
    order_status varchar(20),
    price decimal(10,2),
    completion_time datetime,
    foreign key (customer_ID) references customer(customer_ID),
    foreign key (driver_ID) references driver(driver_ID)
);
create table payment (
    payment_ID int not null primary key,
    order_ID int not null,
    payment_method varchar(10),
    payment_status varchar(10),
    payment_time date,
    amount decimal(10,2),
    foreign key (order_ID) references orders(order_ID)
);
create table feedback (
    feedback_ID int not null primary key,
    order_ID int not null,
    rating decimal (2,2) check (rating >= 1.0 and rating <= 5.0),
    foreign key (order_ID) references orders(order_ID)
);

create table trip_history(
    hisrtory_ID int not null primary key,
    order_ID int not null,
    foreign key (order_ID) references orders(order_ID)
);

create table admin(
    admin_username varchar(20) not null primary key,
    admin_password varchar(8) not null,
    admin_email varchar(40) not null,
    order_ID int not null,
    customer_ID int not null,
    driver_ID int not null,
    foreign key (order_ID) references orders(order_ID),
    foreign key (customer_ID) references customer(customer_ID),
    foreign key (driver_ID) references driver(driver_ID)
);

create table violation(
    violation_ID int not null primary key,
    driver_ID int not null,
    violation_desc varchar(30),
    sanction text,
    foreign key (driver_ID) references driver(driver_ID)
);

insert into driver (
    driver_ID, driver_username, driver_password, driver_address,
    driver_phone, driver_email, driver_type_of_vehicle, driver_number_plate
) values
(1, 'Nunung Pasonto', 'pass1234', '123 Main St, Jatinangor', 812345678, 'john.doe@example.com', 'Car', 'B1234XYZ'),
(2, 'Apam RiLisa', 'lisa2021', 'Jl. Merdeka No. 45, Bandung', 812987654, 'lisa.m@example.com', 'Motorcycle', 'D5678ABC'),
(3, 'Budi Santoso', 'budi1234', 'Jl. Sudirman No. 10, Jatinangor', 813456789, 'budi.s@example.com', 'Car', 'L4321DEF'),
(4, 'Yana Alexo', 'alexpass', 'Jl. Gajah Mada No. 88, Sumedang', 814123456, 'alex.r@example.com', 'Van', 'BK9876GHI'),
(5, 'Agung Ninawo', 'nina123', 'Jl. Asia Afrika No. 7, Bandung', 815789012, 'nina.p@example.com', 'Motorcycle', 'AB2468JKL'),
(6, 'Bagus Rahul', 'rahul456', 'Jl. Slamet Riyadi No. 9, Sumedang', 816654321, 'rahul.d@example.com', 'Car', 'AD1122MNO'),
(7, 'Siti Norwu', 'siti2022', 'Jl. Diponegoro No. 11, Jatinangor', 817123987, 'siti.n@example.com', 'Motorcycle', 'H7788PQR'),
(8, 'Mike Lusri', 'mikepass', 'Jl. Pemuda No. 55, Jatinangor', 818098765, 'michael.t@example.com', 'Van', 'N3344STU'),
(9, 'Agus Hasto', 'aguspass', 'Jl. Kartini No. 21, Bandung', 819112233, 'agus.h@example.com', 'Car', 'KT5566VWX'),
(10, 'Didi Narwo', 'dina5678', 'Jl. Ahmad Yani No. 19, Sumedang', 820223344, 'dina.w@example.com', 'Motorcycle', 'DD7788YZA');

insert into customer (
    customer_ID, customer_username, customer_phone, customer_email, customer_address, customer_password
) values
(1, 'John Doe', 812345678, 'john@example.com', 'Jakarta', 'pass1234'),
(2, 'Lisa M', 812987654, 'lisa@example.com', 'Bandung', 'lisa2021'),
(3, 'Budi Santoso', 813456789, 'budi@example.com', 'Surabaya', 'budi1234'),
(4, 'Alex Rahmat', 814123456, 'alex@example.com', 'Medan', 'alex5678'),
(5, 'Nina Putri', 815789012, 'nina@example.com', 'Yogyakarta', 'nina0001'),
(6, 'Rahul Dev', 816654321, 'rahul@example.com', 'Solo', 'rahul234'),
(7, 'Siti Nur', 817123987, 'siti@example.com', 'Semarang', 'siti9999'),
(8, 'Michael T', 818098765, 'michael@example.com', 'Malang', 'mike4321'),
(9, 'Agus Hari', 819112233, 'agus@example.com', 'Balikpapan', 'agus5678'),
(10, 'Dina W', 820223344, 'dina@example.com', 'Makassar', 'dina1111');

-- aku belum masukin rating nya driver
