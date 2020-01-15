const express = require('express')
const router = express.Router()
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../../knexfile')[environment]
const database = require('knex')(configuration)
const Olympian = require('../../../models/olympian.js')


const getOlympians = router.get('/', async (request, response) => {
  if (request.query.age === 'oldest') {
    newQuery = 'ORDER BY olympian.age DESC LIMIT 1'
  } else if (request.query.age === 'youngest') {
    newQuery = 'ORDER BY olympian.age ASC LIMIT 1'
  } else {
    newQuery = ' '
  }
  const olympians = await database('olympians').then(result => result)
  if (request.query.age === 'youngest' || request.query.age === 'oldest') {
    response.status(200).json(olympians.getByAge, newQuery);
  } else if () {
    response.status(200).json(olympians)
    // response.status(200).send({'olympians': olympians['rows']})
    // response.status(404).json('No olympians in database')
  } else {

  }

})

module.exports = getOlympians
