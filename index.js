const express = require("express");
const axios = require("axios");
const app = express();
const cors=require('cors');
const request = require('request');
const port = process.env.PORT || 3000;
app.use(cors({
  origin:'https://stockinsights.netlify.app'
}))
app.set("trust proxy",1);
app.get("/", (req, res) => res.type('html').send(html));
app.get('/api/etsharetoday', function (req, res) {

  let eqsymbol = req.query.eqsymbol

  var url6 = 'https://ettechcharts.indiatimes.com/ETLiveFeedChartRead/livefeeddata?scripcode=BELEQ&exchangeid=50&datatype=intraday&filtertype=1MIN&tagId=10648&firstreceivedataid=&lastreceivedataid=&directions=all&scripcodetype=company'
  request(url6, function (error, response, html) {
    if (!error) {
      res.json(JSON.parse(response.body))
    }
  })
})
app.post('/api/trendlynepostdvm', async function (req, res) {
  const start = Date.now();
  const obj=[];
  let tlid = req.body
  const axiosApiInstance = axios.create({
    baseURL: 'https://data.mongodb-api.com/app/data-cibaq/endpoint/data/v1/action',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'hhsIfhonChu0fJ000k04e1k7nb5bX1CvkIWLw17FRjrzLg7kWihbY7Sy4UUKwoUy ',
      Accept: 'application/ejson'
    }
  });
 
  const promises = tlid.map(async symbol => {
 

   const response= await fetch(
      `https://trendlyne.com/mapp/v1/stock/chart-data/${symbol.tlid}/SMA/?format=json`,
      {
        headers: { Accept: 'application/json' }
      }
    );

    const data1 = await response.json();
  
    try{
            obj.push({
      Date: symbol.Date,
      Time: symbol.time,
      Name: symbol.name,
      DurabilityScore: data1.body['stockData'][6],
      DurabilityColor: data1.body['stockData'][9],
      VolatilityScore: data1.body['stockData'][7],
      VolatilityColor: data1.body['stockData'][10],
      MomentumScore: data1.body['stockData'][8],
      MomentumColor: data1.body['stockData'][11]
    })
    
 
  await axiosApiInstance.post('/updateMany', {
    collection: 'DVM',
    database: 'DVM',
    dataSource: 'Cluster0',
    filter: {},
    update: {
      $set: {
        output: obj,
        time: start
      }
    },
    upsert: true
  });
}catch (error){
  console.log('error')
}
  const timeTaken = Date.now() - start;
  console.log(`Total time taken: ${timeTaken} milliseconds`);

  console.log(obj)
  try {
    await Promise.all(promises)
  } catch (e) {
    console.log(e)
  }
})

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));


const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`
