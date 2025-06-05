import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

export const handler: Handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api/', '');
    const method = event.httpMethod;

    switch (path) {
      case 'market/overview':
        if (method === 'GET') {
          const { data, error } = await supabase
            .from('market_overview')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(1);

          if (error) throw error;

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data[0])
          };
        }
        break;

      case 'market/gainers':
        if (method === 'GET') {
          const { data, error } = await supabase
            .from('stocks')
            .select('*')
            .gt('change_percent', 0)
            .order('change_percent', { ascending: false })
            .limit(10);

          if (error) throw error;

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
          };
        }
        break;

      case 'market/losers':
        if (method === 'GET') {
          const { data, error } = await supabase
            .from('stocks')
            .select('*')
            .lt('change_percent', 0)
            .order('change_percent', { ascending: true })
            .limit(10);

          if (error) throw error;

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
          };
        }
        break;

      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: 'Not Found' })
        };
    }

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: 'Method Not Allowed' })
  };
}; 