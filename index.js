const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const articles = [];

app.get('/', (req, res) => {
  res.json('Welcome to my climate change news api');
});

app.get('/scrape', (req, res) => {
 // axios.get('https://www.theguardian.com/environment/climate-crisis').then((response) => {
    axios.get('https://www.coingecko.com/en/coins/bitcoin/historical_data/usd#panel').then((response) => {
    console.log(response.data)
    const html = response.data;
    const $ = cheerio.load(html);

    $('a:contains("climate")', html).each(function() {
      const title = $(this).text();
      const url = $(this).attr('href');
      articles.push({
        html
      })

    })

    $('tr', html).each(function() {
      const currency = $( '.no-wrap').text()
      articles.push({
        currency
      })
    })


  res.json(articles)
  }).catch((err) => console.log(err))

})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));