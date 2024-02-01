-- database
create Pharmacy;
use Pharmacy;

-- tables
create table Users(Userid int,UserName varchar(200),Password varchar(20),Role varchar(25),primary key(Userid));

create table Medicines(MedId int ,MedName varchar(100),Description varchar(100),Quantity int ,UnitPrice decimal(10,2),primary key(MedId) );

create table Customer(CusId int,Name varchar(100),Address varchar(100),Age int, PhoneNo varchar(12),primary key(CusId));


ALTER TABLE Customer
ADD COLUMN is_deleted BOOLEAN;

ALTER TABLE Medicines
ADD COLUMN is_deleted BOOLEAN;