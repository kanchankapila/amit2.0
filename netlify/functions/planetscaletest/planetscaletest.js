// require('dotenv').config('/.env')
// const mysql = require('mysql2')
// const connection = mysql.createConnection(process.env.PLANETSCALE_DATABASE_URL);

// const handler = async function () {
//     try{
//     connection.connect();
//     console.log("connected Successfully to PlanetScale DB")
//     connection.query('CREATE TABLE mcinsight (id serial NOT NULL PRIMARY KEY,info jsonb NOT NULL)', function (err, rows, fields) {
//         if (err) throw err
    
//         res.send(rows)
//       })
//     connection.end()
//     return {
//         statusCode: 200,
//         body: JSON.stringify({}),
//       }
//     } catch (error) {
//       console.error(error)
//       return {
//         statusCode: 500,
//         headers: {
//           "Access-Control-Allow-Origin": "*", // Allow from anywhere 
//       },
//         body: JSON.stringify({ msg: error.message }),
//       }
// }}
// module.exports = { handler };