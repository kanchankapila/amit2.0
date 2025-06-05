const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, 'users.json');

function getUsers() {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
}

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { email, password } = JSON.parse(event.body);
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Simulate a JWT token
    const token = 'mock-jwt-token';
    return {
      statusCode: 200,
      body: JSON.stringify({
        user: { id: user.id, email: user.email, name: user.name },
        token,
      }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Invalid credentials' }),
    };
  }
}; 