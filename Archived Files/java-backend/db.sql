--  Super‑Math‑io Brothers  –  database schema for Java backend
drop schema if exists db cascade;
create schema db;
set schema 'db';

create domain question_type as varchar(4)
  check (value in ('ALG','PHYS','STAT','CALC'));

create table questions(
    type     question_type not null,
    question text          not null,
    answer   text          not null,
    constraint pk_question primary key (type, question)
);

create table player(
    name  varchar(30),
    world int default 1 not null,
    level int default 1 not null,
    constraint pk_player primary key (name)
);
