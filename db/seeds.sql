INSERT INTO beer_depo_table
  (department_name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance'),
  ('Legal');

INSERT INTO beer_role_table
  (title, salary, department_id)
VALUES
  ('Software Engineer', 85000, 1),
  ('Salesperson', 75000, 2),
  ('Accountant', 125000, 3),
  ('Lawyer', 200000, 4);

INSERT INTO beer_employee_table
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Jerry', 'Garcia', 1, 4),
  ('Tom', 'Jones', 2, 3),
  ('Rick', 'James', 3, 1),
  ('Frank', 'Sinatra', 4, 5);