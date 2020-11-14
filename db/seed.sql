INSERT INTO department_table (department_name)
VALUES ("Sales"), ("Engineering"), ("Accounting"), ("Legal");

INSERT INTO role_table (title, salary, department_id)
VALUES ("Sales Lead", 80000, 1), ("Sales Person", 55000, 1), ("Lead Engineer", 120000, 2), ("Software Engineer", 90000, 2),
    ("Account Manager", 100000, 3), ("Accountant", 75000, 3), ("Legal Team Lead", 160000, 4), ("Lawyer", 120000, 4);

INSERT INTO employee_table (first_name, last_name, role_id)
VALUES ("Bjorn", "Moore", 3), ("Margo", "Largo", 4), ("Raina", "Quest", 5),
    ("Claudine", "Renee", 1), ("Robin", "Lee", 7);