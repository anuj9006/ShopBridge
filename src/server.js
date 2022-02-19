console.log("server1");const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())
app.use(express.json());

app.get('/getItems', (req, res) => {
  res.send(itemList)
})
app.post('/addItem', (req, res) => {
  itemList.push(req.body);
  res.send(itemList);
})
app.delete('/items/:itemName', (req, res) => {
  itemList = itemList.filter((element) => element.name !== req.params.itemName);
  res.send(itemList); 
 })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

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