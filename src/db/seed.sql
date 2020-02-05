DROP DATABASE IF EXISTS pokegame;
create database pokegame;

use pokegame;
create table poke_user (
user_ID integer auto_increment not null,
user_charName varchar (50),
user_Fname varchar (50),
user_Lname varchar (50),
user_email varchar(150),
user_passwd varchar(20),
primary key (user_ID)
);

create table user_session (
user_session_ID integer auto_increment not null,
user_ID integer not null,
session_ID integer not null,
session_win boolean not null,
primary key (user_session_ID),
foreign key (user_ID) references poke_user(user_ID)
);

create table game_session (
session_ID integer auto_increment not null,
session_start datetime not null,
session_end datetime not null,
primary key (session_ID)
);

Insert into poke_user (user_charName, user_Fname, user_Lname, user_email, user_passwd)
VALUES ('beagle', 'John', 'Smith', 'jsmith@nowwhere.com', ''),
('floppy', 'Sarah', 'Smithe', 'ssmithe@nowwhere.com', ''),
('frodo', 'Bob', 'Jones', 'bjones@nowwhere.com', ''),
('superSmash', 'Cathy', 'Henderson', 'chenderson@nowwhere.com', ''),
('fooFighter', 'James', 'West', 'jwest@nowwhere.com', '');

insert into game_session (session_start, session_end)
values ('2020-02-03 8:00:00', '2020-02-03 08:15:00'),
('2020-02-03 8:05:00', '2020-02-03 08:10:00'),
('2020-02-03 8:20:00', '2020-02-03 08:25:00');

insert into user_session (user_ID, session_ID, session_win)
values (1, 1, 0),
(3,1,1),
(2,2,1),
(5,2,0),
(3,3,0),
(4,3,1);