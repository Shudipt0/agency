import mysql from 'mysql2';

// export const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "my_agency"
// })

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "my_agency"
})