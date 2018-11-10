const express = require('express');
const request = require('request');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 6001;

// const portInfo = 3001;
// const portReviews = 8080;
// const portMenu = 3000;
// const portResy = 3002;

// const hostInfo = `http://localhost:${portInfo}`;
// const hostReviews = `http://localhost:${portReviews}`;
// const hostMenu = `http://localhost:${portMenu}`;
// const hostResy = `http://localhost:${portResy}`;

const hostInfo = 'http://ec2-52-53-177-126.us-west-1.compute.amazonaws.com';
const hostReviews = 'http://ec2-18-219-151-31.us-east-2.compute.amazonaws.com';
const hostMenu = 'http://ec2-18-212-129-29.compute-1.amazonaws.com';
const hostResy = 'http://ec2-54-153-45-179.us-west-1.compute.amazonaws.com';

app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/reservations/timesBookedToday/:restaurant_id', (req, res) => {
  request(`${hostResy}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.get('/reservations/inventory', (req, res) => {
  request(`${hostResy}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.get('/restaurant/profile/:restaurant_id', (req, res) => {
  request(`${hostInfo}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.get('/restaurants/:restaurant_id/menu', (req, res) => {
  request(`${hostMenu}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.get('/restaurant/:restaurant_id/reviews', (req, res) => {
  request(`${hostReviews}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.get('/reviews/:review_id', (req, res) => {
  request(`${hostReviews}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.get('/user/:user_id/reviews', (req, res) => {
  request(`${hostReviews}${req.originalUrl}`, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.post('/reviews', (req, res) => {
  request({
    uri: `${hostReviews}${req.originalUrl}`,
    method: 'POST',
    body: req.body,
  }, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.delete('/reviews/:review_id', (req, res) => {
  request({
    uri: `${hostReviews}${req.originalUrl}`,
    method: 'DELETE',
  }, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.patch('/reviews/:review_id', (req, res) => {
  request({
    uri: `${hostReviews}${req.originalUrl}`,
    method: 'PATCH',
    body: req.body,
  }, (err, response, body) => {
    if (err) throw err;
    res.send(body);
  });
});

app.listen(port, () => {
  console.log(`server running at port:${port}`);
});
