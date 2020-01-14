var shell = require('shelljs')
var request = require('supertest')
var app = require('../app')

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

describe('Test Olympian Endpoints', () => {
  beforeEach(async () => {
    await database.raw('truncate table olympians cascade')
  })
  afterEach(() => {
    database.raw('truncate table olympians cascade')
  })

    describe('Get Olympians', () => {
      it('Gets all olympians in database', async () => {
        const olympians = [
  			{
        name: 'Olympian 1',
        sex: 'F',
  			age: '34',
  			height: '170',
  			weight: '125',
  			team: 'United States of America',
  			games: '2020 Summer',
  			sport: 'Weightlifting',
  			medal: 'Bronze',
  		},
  		{
        name: 'Olympian 2',
        sex: 'M',
  			age: '23',
  			height: '156',
  			weight: '100',
  			team: 'Korea',
  			games: '2020 Summer',
  			sport: 'Shooting',
  			medal: "Silver",
  		},
  		{
        name: 'Olympian 3',
        sex: 'F',
  			age: '45',
  			height: '64',
  			weight: '190',
  			team: 'Brazil',
  			games: '2020 Summer',
  			sport: 'Swimming',
  			medal: "Gold",
  		},
  	];
    await database('olympians').insert(olympians, 'id').then(result => result)
    const res = await request(app)
      .get('/api/v1/olympians')

    expect(res.body[0].sex).toBe('F')
    expect(res.body[0].team).toBe('United States of America')
    expect(res.body[0].sport).toBe('Weightlifting')
    })

  })
})