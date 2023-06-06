const { Client } = require('pg');

exports.handler = async (event, context) => {
  const client = new Client({ connectionString: process.env.POSTGRESS_DATABASE_URL1 });

  try {
    const start = Date.now();

    // API endpoint URL
    const apiUrl = 'https://webapi.niftytrader.in/webapi/Resource/nse-break-out-data';
    const tableName = 'NTVOLUME';

    await client.connect();

    // Create the table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        data JSONB,
        time TIMESTAMP
      )
    `;
    await client.query(createTableQuery);

    // Start a transaction
    await client.query('BEGIN');

    // Delete existing data from the table
    const deleteQuery = `DELETE FROM ${tableName}`;
    await client.query(deleteQuery);

    // Create an index on the "symbol_name" field
    const createIndexQuery = `
      CREATE INDEX IF NOT EXISTS symbol_name_idx ON ${tableName} (((data->>'symbol_name')))
    `;
    await client.query(createIndexQuery);

    // Fetch data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();
   

    if (data.result === 1) {
      const resultData = data.resultData;

      // Prepare the INSERT query and values
      const insertQuery = `
        INSERT INTO ${tableName} (data, time) VALUES ${resultData
          .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
          .join(', ')}
      `;

      const insertValues = [];
      resultData.forEach((item, index) => {
        insertValues.push(JSON.stringify(item), new Date(start + index * 1000));
      });

      // Execute the INSERT query within the transaction
      await client.query(insertQuery, insertValues);

      // Commit the transaction
      await client.query('COMMIT');

      console.log('Data updated successfully');
      return {
        statusCode: 200,
        body: 'Data stored successfully in PostgreSQL',
      };
    } else {
      return {
        statusCode: 500,
        body: 'API response does not match expected format',
      };
    }
  } catch (error) {
    console.log('Error while fetching data:', error);

    // Rollback the transaction in case of an error
    await client.query('ROLLBACK');

    return {
      statusCode: 500,
      body: 'Error occurred while storing data in PostgreSQL',
    };
  } finally {
    await client.end();
  }
};
