const mysql = require("mysql");
const inquirer = require("inquirer");
const consTable = require("console.table");
// const connection = require("/db/connection.js");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add an employee",
                "Add a role",
                "Add a department",
                "View all employees",
                "View all roles",
                "View all departments",
                "Update an employee role",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add an employee":
                    addEmployee();
                    break;

                case "Add a role":
                    addRole();
                    break;

                case "Add a department":
                    addDepartment();
                    break;

                case "View all employees":
                    viewEmployee();
                    break;

                case "View all roles":
                    viewRole();
                    break;

                case "View all departments":
                    viewDepartment();
                    break;

                case "Update an employee role":
                    updateRole();
                    break;

                case "EXIT":
                    connection.end();
            }
        });
};

function addEmployee() {
    inquirer
        .prompt({
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "role",
                type: "list",
                message: "What is the employee's role?",
                choices: chooseRole()
            },
            {
                name: "manager",
                type: "list",
                message: "Who is the employee's manager?",
                choices: chooseManager()
            },
        )
        .then(function (answer) {
            let roleId = chooseRole().indexOf(answer.role) + 1;
            let managerId = chooseManager().indexOf(answer.manager) + 1;
            connection.query("INSERT INTO employee_table SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    manager_id: managerId,
                    role_id: roleId
                },
                function (err) {
                    if (err) throw err;
                    start();
                })
            })};
 



function viewEmployee() {
    let query = `SELECT employee_table.id, first_name, last_name, title, salary FROM employee_table
        INNER JOIN role_table ON employee_table.id = role_table.id ORDER BY id`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function viewRole() {
    let query = `SELECT id, title, salary FROM role_table`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function viewDepartment() {
    let query = `SELECT * FROM department_table`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function addRole() {
    inquirer
        .prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "What is the name of role you want to add?"
            },
            {
                name: "roleSalary",
                type: "input",
                message: "What is the salary?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO role_table SET ?",
                {
                    title: answer.roleTitle,
                    salary: answer.roleSalary
                },
                function(err){
                    if (err) throw err;
                    start();
                }
            )
    
        });
        
};

function addDepartment() {
    inquirer
    .prompt([
        {
            name: "departmentTitle",
            type: "input",
            message: "What department do you want to add?"
        }
    ])
    .then(function (answer) {
        connection.query(
            "INSERT INTO department_table SET ?",
            {
                department_name: answer.departmentTitle
            },
            function(err){
                if (err) throw err;
                start();
            }
        )

    });
};


//   function multiSearch() {
//     var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//     connection.query(query, function(err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].artist);
//       }
//       runSearch();
//     });
//   }

//   function rangeSearch() {
//     inquirer
//       .prompt([
//         {
//           name: "start",
//           type: "input",
//           message: "Enter starting position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         },
//         {
//           name: "end",
//           type: "input",
//           message: "Enter ending position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         }
//       ])
//       .then(function(answer) {
//         var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//         connection.query(query, [answer.start, answer.end], function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               "Position: " +
//                 res[i].position +
//                 " || Song: " +
//                 res[i].song +
//                 " || Artist: " +
//                 res[i].artist +
//                 " || Year: " +
//                 res[i].year
//             );
//           }
//           runSearch();
//         });
//       });
//   }

//   function songSearch() {
//     inquirer
//       .prompt({
//         name: "song",
//         type: "input",
//         message: "What song would you like to look for?"
//       })
//       .then(function(answer) {
//         console.log(answer.song);
//         connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//           console.log(
//             "Position: " +
//               res[0].position +
//               " || Song: " +
//               res[0].song +
//               " || Artist: " +
//               res[0].artist +
//               " || Year: " +
//               res[0].year
//           );
//           runSearch();
//         });
//       });
//   }

//   function songAndAlbumSearch() {
//     inquirer
//       .prompt({
//         name: "artist",
//         type: "input",
//         message: "What artist would you like to search for?"
//       })
//       .then(function(answer) {
//         var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//         query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//         query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

//         connection.query(query, [answer.artist, answer.artist], function(err, res) {
//           console.log(res.length + " matches found!");
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               i+1 + ".) " +
//                 "Year: " +
//                 res[i].year +
//                 " Album Position: " +
//                 res[i].position +
//                 " || Artist: " +
//                 res[i].artist +
//                 " || Song: " +
//                 res[i].song +
//                 " || Album: " +
//                 res[i].album
//             );
//           }

//           runSearch();
//         });
//       });
//   }
