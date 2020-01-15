const express = require('express')
const router = express.Router()
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../../knexfile')[environment]
const database = require('knex')(configuration)
const totalCompeting = () => database('olympians')
	.pluck('name')
	.distinct()
	.then(result => result.length)
	.catch(error => error)

const totalOlympiansBySex = async (sex) => database('olympians')
  .select()
  .where({sex: sex})
  .then(result => result)
  .catch(error => error)

const averageWeight = async olympians => {
  let total = 0;
  for (let i = 0; i < olympians.length; i++) {
    total += parseInt(await olympians[i].weight);
  }
  return total / olympians.length;
}

const averageAge = async olympians => {
	let total = 0;
  for (let i = 0; i < olympians.length; i++) {
    total += parseInt(await olympians[i].age)
  }
  return total / olympians.length;
}

const olympianStats = router.get('/', async (request, response) => {
  const maleOlympians = await totalOlympiansBySex('M');
  const femaleOlympians = await totalOlympiansBySex('F');
  const avgWeightM = averageWeight(maleOlympians)
  const avgWeightF = averageWeight(femaleOlympians)
  const avgAge = await averageAge([...maleOlympians,...femaleOlympians])
  let stats = {
    olympian_stats: {
      total_competing_olympians: await totalCompeting().then(result => result),
      average_weight: {
        unit: "kg",
        male_olympians: await avgWeightM,
        female_olympians: await avgWeightF
      },
      average_age: avgAge
    }
  }
  if (stats) {
    response.status(200).json(stats)
  } else {
    response.status(400).json({ error: 'Bad request'})
  }
})

module.exports = olympianStats
