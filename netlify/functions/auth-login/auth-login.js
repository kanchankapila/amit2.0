const fs = require('fs');
const path = require('path');

const usersFile = 'j:/Stock Website/amit2.0/users.json';

function getUsers() {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
}

// exports.handler = async function(event, context) {
//   if (event.httpMethod !== 'POST') {
//     return {
//       statusCode: 405,
//       body: JSON.stringify({ message: 'Method Not Allowed' }),
//     };
//   }

//   const { email, password } = JSON.parse(event.body);
//   const users = getUsers();
//   const user = users.find(u => u.email === email && u.password === password);

//   if (user) {
//     // Simulate a JWT token
//     const token = 'mock-jwt-token';
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         user: { id: user.id, email: user.email, name: user.name },
//         token,
//       }),
//     };
//   } else {
//     return {
//       statusCode: 401,
//       body: JSON.stringify({ message: 'Invalid credentials' }),
//     };
//   }
// }; 
exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  let email, password;
  try {
    ({ email, password } = JSON.parse(event.body));
  } catch (err) {
    console.log('Failed to parse body:', event.body);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request body', error: err.message }),
    };
  }
  console.log('Received login attempt:', { email, password });
  const users = getUsers();
  console.log('Loaded users:', users);
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    // Simulate a JWT token
    const token = 'mock-jwt-token';
    console.log('Login successful for:', email);
    return {
      statusCode: 200,
      body: JSON.stringify({
        user: { id: user.id, email: user.email, name: user.name },
        token,
      }),
    };
  } else {
    console.log('Login failed for:', email);
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Invalid credentials' }),
    };
  }
}