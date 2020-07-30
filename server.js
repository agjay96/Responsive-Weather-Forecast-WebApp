const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const path = require('path');
const https = require('https');
const environment = {
  production: false,
  googleKey: 'AIzaSyA3bdSJOKqRJdR6YVi8ri6-jlXJyVQ_1Wo',
  forecast: '41524e3034c1b9e8ab1a13e1b689ad86',
  cx: '004328656345069094622:b1w60eztmsb',
  locationAPI: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=LOS&types=(cities)&language=en&key=AIzaSyAC-a6b5_ImWrwMagVt4qifEkMPVoTTWHA'//'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=(cities)&language=pt_BR&key=AIzaSyBgYljUf7Goyzt1iRVSqm7QxNcuvraFnjI',
};


const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParse.json());
app.use(cors())

app.use(express.static(path.join(__dirname, "../public")));


app.get('/', function(req, res){
  res.status(200).send({
    services: 'test'
  })
})

app.get('/geocode', cors(), function (req, res) {
  let address = req.body.address;
  let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + environment.googleKey;
  console.log("geocode URL : ", url);
  https.get(url, function (response) {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
      //console.log(body);
    });

    response.on('end', function () {
      var places = JSON.parse(body);
      //   var locations = places.results;
      //   var randLoc = locations[Math.floor(Math.random() * locations.length)];

      res.json(places);
    });
  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });
})






app.get('/address', cors(), function (req, res) {
  let city = req.body.cities;
  let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?key=' + environment.googleKey + '&language=en&input=' + city + '&types=(cities)'
  console.log("address URL : ", url);
  https.get(url, function (response) {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
      //console.log(body);
    });

    response.on('end', function () {
      var places = JSON.parse(body);
      //   var locations = places.results;
      //   var randLoc = locations[Math.floor(Math.random() * locations.length)];

      res.json(places);
    });
  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });
})

app.get('/getWether', cors(), function (req, res) {
  let lat = req.body.lat;
  let lng = req.body.lng;
  let time = req.body.time;
  // https://api.darksky.net/forecast/[key]/[latitude],[longitude]
  let url = 'https://api.darksky.net/forecast/' + environment.forecast + '/' + lat + ',' + lng;
  console.log("getWether URL : ", url);
  https.get(url, function (response) {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
      //console.log(body);
    });

    response.on('end', function () {
      var places = JSON.parse(body);
      //   var locations = places.results;
      //   var randLoc = locations[Math.floor(Math.random() * locations.length)];

      res.json(places);
    });
  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });
})

/**Google GEOCODE API */
app.get('/locationInfo', cors(), function (req, res) {
  let resp = req.body.info;
  let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + resp.lat + "," + resp.lng + "&sensor=true&key=" + environment.googleKey;
  console.log("locationInfo URL : ", url);
  https.get(url, function (response) {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
      //console.log(body);
    });

    response.on('end', function () {
      var places = JSON.parse(body);
      //   var locations = places.results;
      //   var randLoc = locations[Math.floor(Math.random() * locations.length)];

      res.json(places);
    });
  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });
})

/***Custom search data */
app.get('/getCustomization', cors(), function (req, res) {
  let state = req.body.state;
  let cx = environment.cx;
  // https://api.darksky.net/forecast/[key]/[latitude],[longitude]
  let url = 'https://www.googleapis.com/customsearch/v1?q=' + state + ' State Seal&cx=' + cx + '&imgSize=huge&imgType=news&num=1&searchType=image&key=' + environment.googleKey;
  console.log("getCustomization URL : ", url);
  https.get(url, function (response) {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
      //console.log(body);
    });

    response.on('end', function () {
      var places = JSON.parse(body);
      //   var locations = places.results;
      //   var randLoc = locations[Math.floor(Math.random() * locations.length)];

      res.json(places);
    });
  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });
})

/**Google GEOCODE API */
app.post('/geocode', cors(), function (req, res) {
  let address = req.body.address;
  let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + environment.googleKey;
  console.log("geocode URL : ", url);
  https.get(url, function (response) {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
      //console.log(body);
    });

    response.on('end', function () {
      var places = JSON.parse(body);
      //   var locations = places.results;
      //   var randLoc = locations[Math.floor(Math.random() * locations.length)];

      res.json(places);
    });
  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });
})

app.post('/address', cors(), function (req, res) {
  let city = req.body.cities;
  let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?key=' + environment.googleKey + '&language=en&input=' + city + '&types=(cities)'
  console.log("address URL : ", url);
  https.get(url, function (response) {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
      //console.log(body);
    });

    response.on('end', function () {
      var places = JSON.parse(body);
      //   var locations = places.results;
      //   var randLoc = locations[Math.floor(Math.random() * locations.length)];

      res.json(places);
    });
  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });
})

app.post('/getWether', cors(), function (req, res) {
  let lat = req.body.lat;
  let lng = req.body.lng;
  let time = req.body.time;
  // https://api.darksky.net/forecast/[key]/[latitude],[longitude]
  let url = 'https://api.darksky.net/forecast/' + environment.forecast + '/' + lat + ',' + lng;
  console.log("getWether URL : ", url);
  https.get(url, function (response) {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
      //console.log(body);
    });

    response.on('end', function () {
      var places = JSON.parse(body);
      //   var locations = places.results;
      //   var randLoc = locations[Math.floor(Math.random() * locations.length)];

      res.json(places);
    });
  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });
})

/**Google GEOCODE API */
app.post('/locationInfo', cors(), function (req, res) {
  let resp = req.body.info;
  let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + resp.lat + "," + resp.lng + "&sensor=true&key=" + environment.googleKey;
  console.log("locationInfo URL : ", url);
  https.get(url, function (response) {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
      //console.log(body);
    });

    response.on('end', function () {
      var places = JSON.parse(body);
      //   var locations = places.results;
      //   var randLoc = locations[Math.floor(Math.random() * locations.length)];

      res.json(places);
    });
  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });
})

/***Custom search data */
app.post('/getCustomization', cors(), function (req, res) {
  let state = req.body.state;
  let cx = environment.cx;
  // https://api.darksky.net/forecast/[key]/[latitude],[longitude]
  let url = 'https://www.googleapis.com/customsearch/v1?q=' + state + ' State Seal&cx=' + cx + '&imgSize=huge&imgType=news&num=1&searchType=image&key=' + environment.googleKey;
  console.log("getCustomization URL : ", url);
  https.get(url, function (response) {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
      //console.log(body);
    });

    response.on('end', function () {
      var places = JSON.parse(body);
      //   var locations = places.results;
      //   var randLoc = locations[Math.floor(Math.random() * locations.length)];

      res.json(places);
    });
  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });
})


app.use('/', function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
})

app.listen(PORT, function () {
  console.log("Server running on localhost: " + PORT);
})
