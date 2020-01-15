var shell = require('shelljs')
var request = require('supertest')
var app = require('../app')

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

describe('Test Olympian Endpoints', () => {
  beforeEach(async () => {
    await database.raw('truncate table olympians cascade')
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
        event: 'Clean and Jerk',
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
        event: 'Solo Archery',
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
        event: '400m Free Form',
        medal: "Gold",
      },
    ];
    await database('olympians').insert(olympians, 'id').then(result => result)
  })

    describe('Get Olympians', () => {
      it('Gets all olympians in database', async () => {
      const res = await request(app)
        .get('/api/v1/olympians')


      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body[0].sex).toBe('F')
      expect(res.body[0].team).toBe('United States of America')
      expect(res.body[0].sport).toBe('Weightlifting')
      })

    describe('Oldest Olympian', () => {
      it('oldest success', async () => {
        const res = await request(app)
          .get("/api/v1/olympians?age=oldest");

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].age).toBe("45");
        })
      })
    describe('Youngest Olympian', () => {
      it('youngest success', async () => {
        const res = await request(app)
          .get("/api/v1/olympians?age=youngest");

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].age).toBe("23");
        })
      })
    describe('Gets Olympian Stats', () => {
      it('Successful Stats', async () => {
        const res = await request(app)
          .get("/api/v1/olympian_stats");

        expect(res.body['olympian_stats']['total_competing_olympians']).toBe(3)
        expect(res.body['olympian_stats']['average_weight']['male_olympians']).toBe(100)
        expect(res.body['olympian_stats']['average_weight']['female_olympians']).toBe(157.5)
        expect(res.body['olympian_stats']['average_age']).toBe(34)
        expect(res.statusCode).toBe(200);
      })
    })
  })
})
