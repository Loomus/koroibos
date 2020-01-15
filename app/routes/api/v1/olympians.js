const express = require('express')
const router = express.Router()
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../../knexfile')[environment]
const database = require('knex')(configuration)
const getByAge = (age) => database('olympians')
.select()
.orderBy('age', age)
.limit(1)
.then(result => result)
.catch(error => error)

const getOlympians = router.get('/', async (request, response) => {
  let sortOrder = null
  if (request.query.age === 'youngest') {
    sortOrder = 'ASC'
  } else if (request.query.age === 'oldest') {
    sortOrder = 'DESC'
  }
  const olympians = await database('olympians').then(result => result)
  if (sortOrder) {
    const age = await getByAge(sortOrder)
    response.status(200).json(age)
  } else if (olympians) {
    response.status(200).json(olympians)
  } else {
    response.status(400).json({ error: 'Bad request' })
  }
})

module.exports = getOlympians
