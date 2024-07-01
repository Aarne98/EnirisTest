const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

app.use(cors(),express.json());

//Get accestoken from valid login credentials
app.post('/login', (req, res) => {
    axios.post(`${process.env.URL_AUTH}/auth/login?origin=authentication&termsAndConditionsAccepted=false`, {
        username:process.env.NAME,
        password: process.env.PASSWORD
      })
      .then(response => {
        res.status(200).send(response.data)
      })
      .catch(error => {
        res.sendStatus(500)
      });
});

//Get accesstoken to access API with valid accestoken from login
app.get('/accesstoken', (req, res) => {
    axios.get(`${process.env.URL_AUTH}/auth/accesstoken`,{
        headers: {
          'Authorization': req.headers.authorization
        }
      })
      .then(response => {
        res.status(200).send(response.data)
      })
      .catch(error => {
        res.sendStatus(500)
      });
});

//Get filtered devices with valid accesstoken
app.get('/devices', (req, res) => {
    axios.get(`${process.env.URL_API}/v1/device?fields=id&fields=name&fields=nodeId&fields=isInstaller`,{
        headers: {
          'Authorization': req.headers.authorization
        }
      })
      .then(response => {
        console.log(response)
        res.status(200).send(response.data)
      })
      .catch(error => {
        res.sendStatus(500)
      });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



  
  