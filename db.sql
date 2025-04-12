---------------------------------------------
-- Database for 1530 project group 1
-- Super Mathio Brothers
-- Author: Domenic Colangelo
---------------------------------------------

drop schema if exists db cascade;
create schema db;
set schema 'db';

drop table if exists questions cascade;
drop table if exists players cascade;

--Questions
create domain question_type as varchar(4)
    check( value in('ALG1', 'PHYS', 'STAT', 'ALG2', 'CALC'));
create table questions(
    type question_type not null,
    question text not null,
    constraint pk_question primary key (type, question)
);

--Player
create table player(
    name varchar(30),
    world int default 1 not null,
    level int default 1 not null,
    constraint pk_player primary key (name, world, level)
);
