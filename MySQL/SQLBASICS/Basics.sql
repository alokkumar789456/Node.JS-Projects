/* to CREATE DATABASE */
CREATE DATABASE marvel
/* to list all databases present  */
SHOW DATABASES;

/* to list or to show tables  */
SHOW TABLES;

/* to list/open table  */
select * from student;

-- to create database
create database college;

-- to Use the created DataBase
use college;

-- to create Table
create table student (
    id int primary key,
    name varchar(50),
    age int not null
);

-- to add values in students table
insert into student values (1, "loki", 22);

insert into student values (2, "thor", 25);

-- to list or open student table
select * from student;

USE college

DROP Table student;

CREATE Table student (
    rollNo INT PRIMARY KEY,
    name VARCHAR(50)
);

SELECT * FROM student

INSERT INTO student (rollNo, name) VALUES (101, "Karan"), (201, "Aujhla")

CREATE DATABASE company;

USE company;

CREATE Table engineers (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    salary INT NOT NULL
);

INSERT INTO
    engineers (id, name, salary)
VALUES (32316, "loki", 30000),
    (32319, "nitish", 65485),
    (56181, "nidhi", 4561237)

SHOW TABLES;

SELECT * from engineers;

CREATE DATABASE engineer;

USE engineer

CREATE Table devs (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    salary INT NOT NULL
);

INSERT INTO
    devs (id, name, salary)
VALUES (32316, "name1", 1256),
    (32319, "name2", 65412),
    (32315, "name3", 635241)

select * from devs

CREATE DATABASE temp

use temp

create table student (
    rollNo INT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    marks INT NOT NULL DEFAULT 00,
    grade VARCHAR(1),
    city VARCHAR(30)
)

INSERT INTO student 
    (rollNo, name, marks, grade, city)
VALUES
    (7, "Amit", 88, "A", "Pune"),
    (8, "Sita", 72, "B", "Chennai"),
    (9, "Rajesh", 65, "C", "Hyderabad"),
    (10, "Neha", 93, "A", "Bangalore"),
    (11, "Arjun", 58, "D", "Ahmedabad"),
    (12, "Priya", 81, "B", "Kolkata"),
    (13, "Deepak", 69, "C", "Surat"),
    (14, "Karan", 76, "B", "Jaipur"),
    (15, "Nisha", 90, "A", "Mumbai"),
    (16, "Vikram", 84, "A", "Delhi"),
    (17, "Anjali", 55, "D", "Lucknow"),
    (18, "Rohan", 79, "B", "Bhopal"),
    (19, "Pooja", 62, "C", "Patna"),
    (20, "Manish", 88, "A", "Gurgaon"),
    (21, "Swati", 74, "B", "Noida");


    

SELECT DISTINCT grade from student;

SELECT name, rollNo, grade from student;

-- use of where clause

select * FROM student
WHERE grade = "A";

select * from student 
WHERE city = "KLB";

-- use of AND operator (AND should satisfy both conditions)
select * from student 
where marks > 90 AND city = "GLB";

-- use of OR operator (OR should satisfy atLeast one condition)
select * from student 
where marks > 90 OR grade = "A";

-- use of NOT Operator (Should not satisfy single condition also/ reverse)
select * from student 
where NOT marks > 90

-- use of BETWEEN operator (Used To target a particular range using AND operator)
select * from student
where marks BETWEEN 95 AND 100;

-- Use of IN operator (Used to Take multiple inputs (instead of = this used))
SELECT * from student
where city IN ("KLB","GLB");

-- Use of NOT IN operator (used to Take multiple inputs (Just Like != ))
SELECT * FROM student
WHERE city NOT IN ("KLB","GLB");

-- Use of limit operator (can be used without where clause)
select * from student 
where marks > 80 
limit 3

-- Order By clause (Arranges data by the high to low (DESC) and Low to high (ASC))
select * from student 
where marks > 80
ORDER BY marks ASC;

select * from student 
ORDER BY marks DESC;

-- Use of Aggregate Function (helpFull in Calculations)
-- MAX, MIN, SUM, AVG, COUNT

select MAX(marks) from student;
select MIN(marks) from student;
select COUNT(name) from student;
select AVG(marks) from student;
select SUM(marks) FROM student

-- GROUP BY clause 
SELECT city, COUNT(rollNo) AS student_count
FROM student
GROUP BY city ORDER BY city 

SELECT city, AVG(marks)
from student 
GROUP BY city 
ORDER BY AVG(marks) DESC;


CREATE TABLE customers (
    customer_id INT,
    customer VARCHAR(50),
    mode VARCHAR(20),
    city VARCHAR(50)
);

INSERT INTO customers (customer_id, customer, mode, city)
VALUES
    (101, 'Olivia Barrett', 'Netbanking', 'Portland'),
    (102, 'Ethan Sinclair', 'credit Card', 'Miami'),
    (103, 'Maya Hernandez', 'Credit Card', 'Seattle'),
    (104, 'Liam Donovan', 'Credit Card', 'Denver'),
    (105, 'Sophia Nguyen', 'Credit Card', 'New Orleans'),
    (106, 'Caleb Foster', 'Debit Card', 'Minneapolis'),
    (107, 'Ava Patel', 'Debit Card', 'Phoenix'),
    (108, 'Lucas Carter', 'Netbanking', 'Boston'),
    (109, 'Isabella Martinez', 'Netbanking', 'Nashville'),
    (110, 'Jackson Brooks', 'Credit Card', 'Boston');


SELECT * FROM customers

SELECT COUNT(customer), mode
FROM customers
GROUP BY mode 
ORDER BY COUNT(customer) DESC;

select * from student

SELECT COUNT(rollNo), grade
FROM student
GROUP BY grade;

SELECT city, name, MAX(marks) as max_marks
FROM student
GROUP BY city, name
HAVING max_marks > 90;

SELECT city, name, marks, grade
from student
ORDER BY name, grade, city, marks

UPDATE student
SET grade = "A"
WHERE name = "Arjun"  



-- !Final CRUD

-- Create a DB 
CREATE DATABASE Marvel;

-- Use database
USE Marvel;

-- read Database
show tables

-- DB Name cannot be updated 

-- To delete the DB 
DROP DATABASE Marvel; 

-- Create a Table
CREATE Table avengers(
    id INT PRIMARY KEY,
    name VARCHAR(50),
    weapon VARCHAR(50)
)

-- create the data / add the data 
INSERT INTO avengers 
    (id,name,weapon)
VALUES
    (123,"TONY","SUITE"),
     (124, "STEVE", "SHIELD"),
    (125, "THOR", "MJOLNIR"),
    (126, "BRUCE", "HULK SMASH"),
    (127, "NATASHA", "GUNS"),
    (128, "CLINT", "BOW AND ARROW"),
    (129, "WANDA", "MAGIC"),
    (130, "VISION", "MIND STONE"),
    (131, "PETER", "WEB-SHOOTERS"),
    (132, "SAM", "WINGS"),
    (133, "BUCKY", "VIBRANIUM ARM");

-- Adding Particular Data 
INSERT INTO avengers 
    (id,name,weapon)
VALUES
     (127, "NATASHA", "GUNS")


-- read the table 
SELECT * from avengers 

-- Update the Table 
UPDATE avengers
SET weapon = "SUITE"
WHERE name = "TONY"; 

-- Delete the Table 
DROP TABLE avengers;

-- To Delete a Specific Row
DELETE FROM avengers
WHERE id = 127;

-- To Delete the Specific Column
ALTER TABLE avengers
DROP COLUMN weapon;

-- to delete specific element 
UPDATE avengers
SET weapon = NULL
WHERE id = 123;

-- WAQTD student id and student names for all the students.
SELECT SID,SNAME
FROM STUDENT

-- WAQTD name and branch of all the students .
SELECT name,branch
FROM student;

-- WAQTD NAME , BRANCH AND PERCENTAGE FOR ALL THE STUDENTS
SELECT name,branch,percentage
from student

-- WAQTD details of all the students from students table 
SELECT *
FROM student;

-- WAQTD sname , sid , per , branch of all the students 
SELECT sname, sid,  per, BRANCH
FROM student;
