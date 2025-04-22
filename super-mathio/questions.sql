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
    check( value in('ALG', 'PHYS', 'STAT', 'CALC'));
create table questions(
    type question_type not null,
    question text not null,
    answer text not null,
    constraint pk_question primary key (type, question, answer)
);

--Player
create table player(
    name varchar(30),
    world int default 1 not null,
    level int default 1 not null,
    constraint pk_player primary key (name, world, level)
);

insert into db.questions(type, question, answer) values ('ALG', 'Solve for x: 4x + -10 = -14', '-1');
insert into db.questions(type, question, answer) values ('ALG', 'Solve for x: 2x + 2 = -10', '-6');
insert into db.questions(type, question, answer) values ('ALG', 'Solve for x: 2x + -6 = -8', '-1');
insert into db.questions(type, question, answer) values ('ALG', 'Solve for x: 9x + -10 = 26', '4');
insert into db.questions(type, question, answer) values ('ALG', 'Solve for x: 2x + -6 = 2', '4');
insert into db.questions(type, question, answer) values ('ALG', 'Solve for x: 9x + 1 = 91', '10');
insert into db.questions(type, question, answer) values ('ALG', 'Solve for x: 1x + -5 = -4', '1');
insert into db.questions(type, question, answer) values ('ALG', 'Solve for x: 8x + -6 = 2', '1');
insert into db.questions(type, question, answer) values ('ALG', 'Solve for x: 4x + 2 = -26', '-7');
insert into db.questions(type, question, answer) values ('ALG', 'Solve for x: 2x + -10 = -8', '1');
insert into db.questions(type, question, answer) values ('ALG', 'Evaluate: 10(x + 7) - -5 for x = 2', '95');
insert into db.questions(type, question, answer) values ('ALG', 'Evaluate: 10(x + -12) - 6 for x = -1', '-136');
insert into db.questions(type, question, answer) values ('ALG', 'Evaluate: 3(x + 20) - 10 for x = 4', '62');
insert into db.questions(type, question, answer) values ('ALG', 'Evaluate: 2(x + -20) - -10 for x = 2', '-26');
insert into db.questions(type, question, answer) values ('ALG', 'Evaluate: 6(x + -2) - 8 for x = 3', '-2');
insert into db.questions(type, question, answer) values ('ALG', 'Evaluate: 5(x + -12) - 8 for x = 0', '-68');
insert into db.questions(type, question, answer) values ('ALG', 'Evaluate: 9(x + -6) - 0 for x = -2', '-72');
insert into db.questions(type, question, answer) values ('ALG', 'Evaluate: 3(x + 15) - 5 for x = -2', '34');
insert into db.questions(type, question, answer) values ('ALG', 'Evaluate: 3(x + 20) - 3 for x = 5', '72');
insert into db.questions(type, question, answer) values ('ALG', 'Evaluate: 7(x + 13) - 6 for x = 4', '113');
insert into db.questions(type, question, answer) values ('ALG', 'Compute: 4^4 + 10', '266');
insert into db.questions(type, question, answer) values ('ALG', 'Compute: 3^2 + -5', '4');
insert into db.questions(type, question, answer) values ('ALG', 'Compute: 4^4 + -4', '252');
insert into db.questions(type, question, answer) values ('ALG', 'Compute: 4^3 + 10', '74');
insert into db.questions(type, question, answer) values ('ALG', 'Compute: 2^4 + -4', '12');
insert into db.questions(type, question, answer) values ('ALG', 'Compute: 5^2 + 8', '33');
insert into db.questions(type, question, answer) values ('ALG', 'Compute: 4^4 + -2', '254');
insert into db.questions(type, question, answer) values ('ALG', 'Compute: 3^3 + -2', '25');
insert into db.questions(type, question, answer) values ('ALG', 'Compute: 3^2 + -4', '5');
insert into db.questions(type, question, answer) values ('ALG', 'Compute: 5^1 + 1', '6');
insert into db.questions(type, question, answer) values ('STAT', 'Mean of [3, 12, 7, 13, 0]', '7');
insert into db.questions(type, question, answer) values ('STAT', 'Mean of [11, 3, 17, 0, 15]', '9');
insert into db.questions(type, question, answer) values ('STAT', 'Mean of [19, 6, 9, 9, 10]', '10');
insert into db.questions(type, question, answer) values ('STAT', 'Mean of [20, 7, 8, 7, 19]', '12');
insert into db.questions(type, question, answer) values ('STAT', 'Mean of [10, 18, 12, 5, 16]', '12');
insert into db.questions(type, question, answer) values ('STAT', 'Mean of [1, 1, 1, 15, 17]', '7');
insert into db.questions(type, question, answer) values ('STAT', 'Mean of [20, 14, 10, 3, 15]', '12');
insert into db.questions(type, question, answer) values ('STAT', 'Mean of [3, 18, 0, 11, 11]', '8');
insert into db.questions(type, question, answer) values ('STAT', 'Mean of [10, 18, 0, 16, 18]', '12');
insert into db.questions(type, question, answer) values ('STAT', 'Mean of [18, 15, 1, 7, 1]', '8');
insert into db.questions(type, question, answer) values ('STAT', 'Median of [1, 4, 12, 12, 13]', '12');
insert into db.questions(type, question, answer) values ('STAT', 'Median of [3, 5, 9, 18, 20]', '9');
insert into db.questions(type, question, answer) values ('STAT', 'Median of [6, 15, 17, 20, 20]', '17');
insert into db.questions(type, question, answer) values ('STAT', 'Median of [4, 7, 10, 11, 12]', '10');
insert into db.questions(type, question, answer) values ('STAT', 'Median of [7, 10, 12, 17, 17]', '12');
insert into db.questions(type, question, answer) values ('STAT', 'Median of [8, 9, 12, 17, 19]', '12');
insert into db.questions(type, question, answer) values ('STAT', 'Median of [3, 7, 7, 8, 17]', '7');
insert into db.questions(type, question, answer) values ('STAT', 'Median of [7, 9, 12, 18, 20]', '12');
insert into db.questions(type, question, answer) values ('STAT', 'Median of [3, 7, 12, 15, 17]', '12');
insert into db.questions(type, question, answer) values ('STAT', 'Median of [0, 0, 6, 10, 12]', '6');
insert into db.questions(type, question, answer) values ('STAT', 'Range of [10, 10, 20, 12, 13]', '10');
insert into db.questions(type, question, answer) values ('STAT', 'Range of [10, 15, 4, 5, 6]', '11');
insert into db.questions(type, question, answer) values ('STAT', 'Range of [0, 4, 19, 17, 17]', '19');
insert into db.questions(type, question, answer) values ('STAT', 'Range of [9, 9, 19, 1, 1]', '18');
insert into db.questions(type, question, answer) values ('STAT', 'Range of [8, 20, 3, 14, 12]', '17');
insert into db.questions(type, question, answer) values ('STAT', 'Range of [15, 19, 9, 10, 19]', '10');
insert into db.questions(type, question, answer) values ('STAT', 'Range of [2, 2, 9, 8, 1]', '8');
insert into db.questions(type, question, answer) values ('STAT', 'Range of [1, 12, 6, 14, 19]', '18');
insert into db.questions(type, question, answer) values ('STAT', 'Range of [1, 7, 9, 13, 10]', '12');
insert into db.questions(type, question, answer) values ('STAT', 'Range of [7, 12, 8, 8, 10]', '5');
insert into db.questions(type, question, answer) values ('CALC', 'Find f''(0) if f(x) = 5x^4', '0');
insert into db.questions(type, question, answer) values ('CALC', 'Find f''(2) if f(x) = 1x^5', '80');
insert into db.questions(type, question, answer) values ('CALC', 'Find f''(3) if f(x) = 2x^4', '216');
insert into db.questions(type, question, answer) values ('CALC', 'Find f''(1) if f(x) = 5x^3', '15');
insert into db.questions(type, question, answer) values ('CALC', 'Find f''(3) if f(x) = 5x^3', '135');
insert into db.questions(type, question, answer) values ('CALC', 'Find f''(0) if f(x) = 5x^4', '0');
insert into db.questions(type, question, answer) values ('CALC', 'Find f''(1) if f(x) = 4x^2', '8');
insert into db.questions(type, question, answer) values ('CALC', 'Find f''(3) if f(x) = 4x^2', '24');
insert into db.questions(type, question, answer) values ('CALC', 'Find f''(4) if f(x) = 1x^2', '8');
insert into db.questions(type, question, answer) values ('CALC', 'Find f''(4) if f(x) = 1x^3', '48');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫3 dx from 0 to 1', '3');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫5 dx from 0 to 3', '15');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫10 dx from 0 to 3', '30');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫9 dx from 0 to 8', '72');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫1 dx from 0 to 4', '4');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫7 dx from 0 to 7', '49');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫6 dx from 0 to 5', '30');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫2 dx from 0 to 8', '16');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫9 dx from 0 to 8', '72');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫6 dx from 0 to 2', '12');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫3x dx from 0 to 2', '6');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫1x dx from 0 to 6', '18');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫2x dx from 0 to 8', '64');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫5x dx from 0 to 2', '10');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫5x dx from 0 to 6', '90');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫1x dx from 0 to 8', '32');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫2x dx from 0 to 8', '64');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫4x dx from 0 to 6', '72');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫1x dx from 0 to 6', '18');
insert into db.questions(type, question, answer) values ('CALC', 'Compute ∫5x dx from 0 to 2', '10');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute force when mass = 9 kg and acceleration = 2 m/s^2', '18');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute force when mass = 6 kg and acceleration = 5 m/s^2', '30');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute force when mass = 5 kg and acceleration = 8 m/s^2', '40');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute force when mass = 9 kg and acceleration = 5 m/s^2', '45');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute force when mass = 2 kg and acceleration = 2 m/s^2', '4');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute force when mass = 5 kg and acceleration = 2 m/s^2', '10');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute force when mass = 3 kg and acceleration = 1 m/s^2', '3');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute force when mass = 8 kg and acceleration = 10 m/s^2', '80');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute force when mass = 5 kg and acceleration = 2 m/s^2', '10');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute force when mass = 10 kg and acceleration = 1 m/s^2', '10');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute distance when velocity = 17 m/s over 7 s', '119');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute distance when velocity = 19 m/s over 5 s', '95');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute distance when velocity = 9 m/s over 6 s', '54');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute distance when velocity = 16 m/s over 4 s', '64');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute distance when velocity = 3 m/s over 6 s', '18');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute distance when velocity = 3 m/s over 6 s', '18');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute distance when velocity = 7 m/s over 10 s', '70');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute distance when velocity = 18 m/s over 8 s', '144');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute distance when velocity = 17 m/s over 9 s', '153');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute distance when velocity = 18 m/s over 1 s', '18');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute kinetic energy (in J) for mass = 4 kg and speed = 9 m/s', '162');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute kinetic energy (in J) for mass = 6 kg and speed = 9 m/s', '243');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute kinetic energy (in J) for mass = 6 kg and speed = 9 m/s', '243');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute kinetic energy (in J) for mass = 8 kg and speed = 9 m/s', '324');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute kinetic energy (in J) for mass = 8 kg and speed = 2 m/s', '16');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute kinetic energy (in J) for mass = 6 kg and speed = 5 m/s', '75');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute kinetic energy (in J) for mass = 8 kg and speed = 2 m/s', '16');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute kinetic energy (in J) for mass = 8 kg and speed = 3 m/s', '36');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute kinetic energy (in J) for mass = 4 kg and speed = 3 m/s', '18');
insert into db.questions(type, question, answer) values ('PHYS', 'Compute kinetic energy (in J) for mass = 6 kg and speed = 5 m/s', '75');
