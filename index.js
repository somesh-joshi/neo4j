// npm install --save neo4j-driver
// node example.js
// Run the code by putting the following in the terminal: npm run start.
const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://44.203.41.195:7687',// Please go to your neo4j server and get the connection details. https://sandbox.neo4j.com/
                  neo4j.auth.basic('neo4j', 'umbrella-majority-fatigue'),// Please go to your neo4j server and get the connection details.
                  {/* encrypted: 'ENCRYPTION_OFF' */});

const query =
  `
  MATCH (movie:Movie {title:$favorite})<-[:ACTED_IN]-(actor)-[:ACTED_IN]->(rec:Movie)
   RETURN distinct rec.title as title LIMIT 20
  `;// Change your query here.

const params = {"favorite": "The Matrix"};

const session = driver.session({database:"neo4j"});

session.run(query, params)
  .then((result) => {
    result.records.forEach((record) => {
        console.log(record);
    });
    session.close();
    driver.close();
  })
  .catch((error) => {
    console.error(error);
  });
