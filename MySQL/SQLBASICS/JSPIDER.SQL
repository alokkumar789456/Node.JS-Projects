
-- emp table 


CREATE TABLE emp (
    EMPNO INT PRIMARY KEY,
    ENAME VARCHAR(50),
    JOB VARCHAR(50),
    HIREDATE DATE,
    MGR INT,
    SAL DECIMAL(10, 2),
    COMM DECIMAL(10, 2),
    DEPTNO INT
);

INSERT INTO emp (EMPNO, ENAME, JOB, HIREDATE, MGR, SAL, COMM, DEPTNO) VALUES
(7369, 'SMITH', 'CLERK', '1980-12-17', 7902, 800, NULL, 20),
(7499, 'ALLEN', 'SALESMAN', '1981-02-20', 7698, 1600, 300, 30),
(7521, 'WARD', 'SALESMAN', '1981-02-22', 7698, 1250, 500, 30),
(7566, 'JONES', 'MANAGER', '1981-04-02', 7839, 2975, NULL, 20),
(7654, 'MARTIN', 'SALESMAN', '1981-09-28', 7698, 1250, 1400, 30),
(7698, 'BLAKE', 'MANAGER', '1981-05-01', 7839, 2850, NULL, 30),
(7782, 'CLARK', 'MANAGER', '1981-06-09', 7839, 2450, NULL, 10),
(7788, 'SCOTT', 'ANALYST', '1987-04-19', 7566, 3000, NULL, 20),
(7839, 'KING', 'PRESIDENT', '1981-11-17', NULL, 5000, NULL, 10),
(7844, 'TURNER', 'SALESMAN', '1981-09-08', 7698, 1500, NULL, 30),
(7876, 'ADAMS', 'CLERK', '1987-05-23', 7788, 1100, NULL, 20),
(7900, 'JAMES', 'CLERK', '1981-12-03', 7698, 950, NULL, 30),
(7902, 'FORD', 'ANALYST', '1981-12-03', 7566, 3000, NULL, 20),
(7934, 'MILLER', 'CLERK', '1982-01-23', 7782, 1300, NULL, 10);


SELECT * from employees

-- dept table
CREATE TABLE dept (
    DEPTNO INT PRIMARY KEY,
    DNAME VARCHAR(50),
    LOC VARCHAR(50)
);

INSERT INTO dept (DEPTNO, DNAME, LOC) VALUES
(10, 'ACCOUNTING', 'NEW YORK'),
(20, 'RESEARCH', 'DALLAS'),
(30, 'SALES', 'CHICAGO'),
(40, 'OPERATIONS', 'BOSTON');

select * from emp;

select * from dept;

-- WAQTD name salary and commission given to all the employees .
SELECT ENAME,SAL,COMM
FROM EMP;

-- WAQTD name of the employee along with their date of joining .
SELECT ENAME,HIREDATE
FROM EMP;

-- .WRITE A QUERY TO DISPLAY ALL THE DETAILS FROM THE EMPLOYEE TABLE.
    SELECT * FROM EMP;

-- .WAQTD NAMES OF ALL THE EMPLOYEES
    SELECT ENAME FROM EMP;

-- WAQTD NAME AND SALARY GIVEN TO ALL THE EMPLOYEES.
    SELECT ENAME, SAL FROM EMP;

-- 4.WAQTD NAME AND COMMISSION GIVEN TO ALL THE EMPLOYEES
    SELECT ENAME, COMM FROM EMP;

-- 5.WAQTD EMPLOYEE ID AND DEPARTMENT NUMBER OF ALL 
-- THE EMPLOYEES IN EMP TABLE.
    SELECT EMPNO, DEPTNO
    FROM EMP;

-- 6.WAQTD ENAME AND HIREDATE OF ALL THE EMPLOYEES .
    SELECT ENAME, HIREDATE FROM EMP;

-- 7.WAQTD NAME AND DESIGNATION OF ALL THE EMPLOYEES 
    SELECT ENAME, JOB FROM emp

-- 8.WAQTD NAME , JOB AND SALARY GIVEN ALL THE EMPLOYEES. 
    SELECT ENAME, JOB, SAL FROM EMP

-- 9.WAQTD DNAMES PRESENT IN DEPARTMENT TABLE.
    SELECT DNAME FROM DEPT;

-- 10.WAQTD DNAME AND LOCATION PRESENT IN DEPT TABLE
    SELECT DNAME, LOC FROM DEPT;

-- 2. WAQTD name and annual salary of the employees .
    SELECT ENAME, SAL*12 AS ANNUAL_SAL 
    FROM EMP;

-- 5. WAQTD name and salary with a hike of 20% 
    SELECT ENAME, SAL, SAL+SAL*20/100 AS HIKE_SAL
    FROM EMP;

-- 6. WAQTD name and salary of an employee with a deduction Of 10% .
    SELECT ENAME, SAL, SAL-SAL*10/100 AS DEC_SAL
    FROM EMP;

-- ASSIGNMENT 
-- 1.WAQTD NAME OF THE EMPLOYEE ALONG WITH THEIR ANNUAL SALARY.
    SELECT ENAME, SAL*12 AS ANNUAL_SAL
    FROM EMP;

-- 2.WAQTD ENAME AND JOB FOR ALL THE EMPLOYEE WITH 
-- THEIR HALF TERM SALARY.
    SELECT ENAME, JOB, SAL*6 AS HAL_TERM_SAL
    FROM EMP;

-- 3.WAQTD ALL THE DETAILS OF THE EMPLOYEES ALONG 
-- WITH AN ANNUALBONUS OF 2000.
    SELECT ENAME, SAL, SAL+2000 AS BONUS_SAL
    FROM EMP;

-- 4.WAQTD NAME SALARY AND SALARY WITH A HIKE OF 
-- 10%.
    SELECT ENAME, SAL, SAL+SAL*10/100 AS HIKE_SAL
    FROM EMP;

-- 5.WAQTD NAME AND SALARY WITH DEDUCTION OF 25%.
    SELECT ENAME, SAL, SAL-SAL*25/100
    FROM EMP;

-- 8.WAQTD TOTAL SALARY GIVEN TO EACH EMPLOYEE 
-- (SAL+COMM).
SELECT EMPNO, SAL, COMM, SAL + IFNULL(COMM, 0) AS TOTAL_SALARY
FROM EMP

-- ASSIGNMENT ON WHERE CLAUSE

-- 1.WAQTD THE ANNUAL SALARY OF THE EMPLOYEE WHOS 
-- NAME IS SMITH
    SELECT ENAME, SAL, SAL*12 AS ANNUAL_SAL
    FROM EMP
    WHERE ENAME = "SMITH"

-- 2.WAQTD NAME OF THE EMPLOYEES WORKING AS CLERK
    SELECT ENAME, JOB 
    FROM EMP
    WHERE JOB = "CLERK"

-- 10.WAQTD DETAILS OF THE EMPLOYEES WORKING AS 
-- MANAGER
    SELECT * FROM EMP 
    WHERE JOB = "MANAGER"

-- 13.WAQTD EMPNO OF EMPLOYEES HIRED BEFORE THE YEAR 87
    SELECT EMPNO, HIREDATE 
    FROM EMP 
    WHERE HIREDATE < '1987-01-01';

-- 14.WAQTD DETAILS OF EMPLOYEES WORKING AS AN ANALYST 
    SELECT ENAME, JOB  
    FROM EMP   
    WHERE JOB = "ANALYST"; 

-- WAQTD all the details of the employees whose salary is 
-- Less than 1000 rupees
    SELECT  * from emp
    where sal < 1000

-- WAQTD THE ANNUAL SALARY OF THE EMPLOYEE WHOS NAME IS SMITH
    SELECT SAL*12 as ANNUAL_SAL
    FROM EMP
    WHERE ENAME = "SMITH"; 

-- WAQTD ALL THE DETAILS ALONG WITH ANNUAL SALARY IF SAL IS BETWEEN 1000 AND 4000 ANNUAL 
-- SALARY MORE THAN 15000
    SELECT *, SAL*12 AS ANU_SAL FROM EMP WHERE SAL BETWEEN 1000 AND 4000;




