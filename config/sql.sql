--Create database
create database management;
use management;

-- Create table
create table roles (
  id int primary key not null auto_increment,
  name varchar(128),
);

create table users (
  id int primary key not null auto_increment,
  username varchar(128),
  password varchar(128),
  email varchar(128),
  roleId int,
  createAt timestamp default current_timestamp,
  updateAt timestamp default current_timestamp,
  foreign key (roleId) references roles (id)
);

-- Insert record to roles table
insert into roles values (1, 'admin');
insert into roles values (2, 'normal');

-- Insert record to users table
insert into users values (1, 'admin', '123123', 'admin@gmail.com', 1);