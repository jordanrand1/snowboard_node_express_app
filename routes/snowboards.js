var express = require('express')
var router = express.Router()
var Snowboard = require('../models').Snowboards

/*router.get('/', function(req, res) {
  Snowboard.all()
    .then( function(snowboards){
      res.render('snowboards', {snowboards: snowboards})
    })
})*/

// var snowboards = [
//   { id: 1, title: 'Oceans 11' },
//   { id: 2, title: 'The Hobbit' },
//   { id: 3, title: 'Who framed Roger Rabbit' }
// ]

router.get('/', function(req, res) {
  Snowboard.all({
    order: [
      ['createdAt', 'ASC']
    ]
  })
    .then( function(snowboards) {
      res.render('snowboards', { snowboards: snowboards })
    })
});

router.post('/', function(req, res) {
  var brand = req.body.brand;
  var name = req.body.name;
  var price = req.body.price;
  var description = req.body.description;
  Snowboard.create(
    {
      brand: brand,
      name: name,
      price: price,
      description: description
    }
    // { brand: brand },
    // { name: name },
    // { price: price },
    // { description: description }
  )
    .then( function() {
      res.redirect('/snowboards');
  });
});

router.delete('/:id', function(req, res){
  Snowboard.findById(req.params.id)
    .then( function(snowboard) {
      snowboard.destroy()
    })
    .then( function(){
      return res.redirect('/snowboards')
    })
})

router.get('/:id/edit', function(req, res) {
  Snowboard.findById(req.params.id)
    .then( function (snowboard) {
      return res.render('edit', {snowboard: snowboard})
    })
})

router.put('/:id', function(req, res) {
  Snowboard.update(
    { 
      brand: req.body.brand,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    },
    { where: { id: req.params.id } }
  )
  .then( function() {
    return res.redirect('/snowboards');
  })
});

module.exports = router