const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
const createHttpError = require("http-errors");
const _app_folder = 'dist/shop-bridge';
app.use(cors())
app.use(express.json());

app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

app.all('/', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

app.get('/getItems', (req, res) => {
  res.send(itemList)
})
app.post('/addItem', (req, res) => {
  console.log("***********************Started add*******************");
  let item = itemList.find(element => element.name === req.body.name);
  if(!item) {
    itemList.push(req.body);
  } else {
    const error = new createHttpError.BadRequest("Already exist");
    res.status(400).send(error);
  }
  console.log("***********************Finished add*******************");
  res.send(itemList);
})

app.delete('/items/:itemName', (req, res) => {
  console.log("***********************Started delete*******************");
  itemList = itemList.filter((element) => element.name !== req.params.itemName);
  console.log("***********************Finished delete*******************");
  res.send(itemList);  
 })

 app.put('/items', (req, res) => {
  console.log("***********************Started update*******************");
  for (let i in itemList) {
    if (itemList[i].name == req.body.name) {
      itemList[i].name = req.body.name;
      itemList[i].description = req.body.description;
      itemList[i].price = req.body.price;
      itemList[i].currency = req.body.currency;
       break;
    }
  }
  console.log("***********************Finished update*******************");
  res.send(itemList);  
 })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Static data
let itemList = [
    {
      name: "Item 1",
      description: "Very good item",
      price: 10,
      currency: 'INR'
    },
    {
      name: "Item 2",
      description: "Very bad item",
      price: 5,
      currency: 'EUR'
    }
  ]