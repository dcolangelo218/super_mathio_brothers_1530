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

-- Algebra Questions
insert into questions values 
('ALG', 'What is the solution to 2x + 3 = 7?', 'x = 2'),
('ALG', 'Factor: x^2 - 5x + 6', '(x - 2)(x - 3)'),
('ALG', 'Solve for x: x/3 = 4', 'x = 12'),
('ALG', 'Simplify: (3x^2)(2x)', '6x^3'),
('ALG', 'What is the slope of the line y = 2x + 5?', '2'),
('ALG', 'Solve for x: x^2 = 49', 'x = ±7'),
('ALG', 'Factor: x^2 - 9', '(x - 3)(x + 3)'),
('ALG', 'What is the y-intercept of y = -3x + 2?', '2'),
('ALG', 'Simplify: (x^2)^3', 'x^6'),
('ALG', 'Solve: 5x - 2 = 3x + 6', 'x = 4');

-- Physics Questions
insert into questions values 
('PHYS', 'What is the acceleration due to gravity on Earth?', '9.8 m/s^2'),
('PHYS', 'What is Newton’s Second Law?', 'F = ma'),
('PHYS', 'What is the unit of force?', 'Newton'),
('PHYS', 'What is the formula for kinetic energy?', 'KE = 0.5mv^2'),
('PHYS', 'What is the speed of light?', '3.0 x 10^8 m/s'),
('PHYS', 'What is the formula for work?', 'W = Fd'),
('PHYS', 'State Ohm’s Law.', 'V = IR'),
('PHYS', 'What type of energy does a stretched spring have?', 'Potential energy'),
('PHYS', 'What is the unit of electric current?', 'Ampere'),
('PHYS', 'What is the momentum formula?', 'p = mv');

-- Statistics Questions
insert into questions values 
('STAT', 'What is the mean of 2, 4, 6, 8, 10?', '6'),
('STAT', 'What is the median of 1, 3, 5, 7, 9?', '5'),
('STAT', 'What is the mode of 1, 2, 2, 3, 4?', '2'),
('STAT', 'What is the formula for the mean of a data set?', 'Sum of values divided by the number of values'),
('STAT', 'What is the standard deviation?', 'Square root of variance'),
('STAT', 'What is the probability of flipping heads on a coin?', '0.5'),
('STAT', 'What is a histogram used for?', 'Displaying frequency distribution'),
('STAT', 'What is the range of 3, 5, 7, 10?', '7'),
('STAT', 'What is a sample?', 'A subset of a population'),
('STAT', 'What is a normal distribution?', 'A bell-shaped symmetric distribution');

-- Calculus Questions
insert into questions values 
('CALC', 'What is the derivative of x^2?', '2x'),
('CALC', 'What is the integral of 1/x?', 'ln|x| + C'),
('CALC', 'What is the derivative of sin(x)?', 'cos(x)'),
('CALC', 'What is the limit of (x^2 - 1)/(x - 1) as x approaches 1?', '2'),
('CALC', 'What is the integral of e^x?', 'e^x + C'),
('CALC', 'What is the derivative of ln(x)?', '1/x'),
('CALC', 'What rule is used to differentiate a product of two functions?', 'Product Rule'),
('CALC', 'What is the Fundamental Theorem of Calculus?', 'It links differentiation and integration'),
('CALC', 'What is the derivative of cos(x)?', '-sin(x)'),
('CALC', 'What is the integral of x^2?', '(1/3)x^3 + C');
