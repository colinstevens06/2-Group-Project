# DROP DATABASE IF EXISTS pokegame;
# create database pokegame;

use pokegame;

create table user (
    uid integer auto_increment not null,
    username varchar (50),
    name_first varchar (50),
    name_last varchar (50),
    email varchar(150),
    pass_hash varchar(512),
    wins integer default 0,
    primary key (uid)
);

create table mon (
    mid integer auto_increment not null,
    name varchar (50),
    move1 varchar (50),
    move2 varchar (50),
    move3 varchar (50),
    move4 varchar (50),
    uid integer not null,
    primary key (mid),
    FOREIGN KEY (uid) references user (uid)
);