const express = require('express');
const request = require('request');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 6001;

const portInfo = 3001;
const portReviews = 8080;
const portMenu = 3000;
const portResy = 3002;

app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/reservations/timesBookedToday/:restaurant_id', (req, res) => {
  request(`http://localhost:${portResy}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.get('/reservations/inventory', (req, res) => {
  request(`http://localhost:${portResy}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.get('/restaurant/profile/:restaurant_id', (req, res) => {
  request(`http://localhost:${portInfo}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.get('/restaurants/:restaurant_id/menu', (req, res) => {
  request(`http://localhost:${portMenu}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.get('/restaurant/:restaurant_id/reviews', (req, res) => {
  console.log(req.originalUrl);
  request(`http://localhost:${portReviews}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    console.log(body);
    res.send(body);
  });
});

app.get('/reviews/:review_id', (req, res) => {
  request(`http://localhost:${portReviews}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.get('/user/:user_id/reviews', (req, res) => {
  request(`http://localhost:${portReviews}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.post('/reviews', (req, res) => {
  request({
    uri: `http://localhost:${portReviews}${req.originalUrl}`,
    method: 'POST',
    body: req.body,
  }, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.delete('/reviews/:review_id', (req, res) => {
  request({
    uri: `http://localhost:${portReviews}${req.originalUrl}`,
    method: 'DELETE',
  }, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.patch('/reviews/:review_id', (req, res) => {
  request({
    uri: `http://localhost:${portReviews}${req.originalUrl}`,
    method: 'PATCH',
    body: req.body,
  }, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
