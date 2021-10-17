const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const articles = [];
const solana = [];
const total = [];

app.get('/', (req, res) => {
  res.json('Welcome to my climate change news api');
});

app.get('/scrape', (req, res) => {
  axios.get('https://www.coingecko.com/en/').then((response) => {
    console.log(response.data)
    const html = response.data;
    const $ = cheerio.load(html);

    $('a:contains("climate")', html).each(function () {
      const title = $(this).text();
      const url = $(this).attr('href');
      articles.push({
        html
      })

    })

    $('td:nth-of-type(3) a:first-of-type', 'tr', html).each(function () {
      const currencyName = $(this).text();
      articles.push({
        currencyName
      });
    })

    $('td:nth-of-type(4) span', 'tr', html).each(function (e, i) {
      const currencyValue = $(this).text();
      total.push({
        ...articles[e],
        currencyValue
      });
    })

    res.json(total)
  }).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
