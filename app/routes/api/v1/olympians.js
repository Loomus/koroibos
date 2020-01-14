const express = require('express')
const router = express.Router()
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../../knexfile')[environment]
const database = require('knex')(configuration)

router.get('/', async (request, response) => {
  const olympians = await database('olympians').then(result => result)
  if (olympians) {
    response.status(200).json(olympians)
  } else {
    response.status(404).json('No olympians in database')
  }
})

module.exports = router
