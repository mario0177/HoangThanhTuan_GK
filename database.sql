create database QuanLyNhanVien;

create table `user` (
    username varchar(20) not null primary key,
    `password` varchar(100) not null,
    email varchar(50),
    phonenumber varchar(13)
);

create table Nhanvien(
    id int auto_increment not null primary key,
    `name` varchar(255) not null,
    `image` varchar(255),
    `position` varchar(255) character set utf8 collate utf8_unicode_ci not null,
    `email` varchar(30),
    `dob` datetime,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into `user`(username, `password`, email, phonenumber) values('tuan', '123', 'tuan@gmail.com', '123456789');

insert into nhanvien(name, image, position, email, dob) values('bac', 'nike.png', 'nhan vien', 'a@gmail.com', '2020-02-3')