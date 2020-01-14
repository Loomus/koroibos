const csvFilePath = './db/data/olympic_data_2016.csv'
const fs = require('fs');
const path = require('path');
var csvjson = require('csvjson');
var data = fs.readFileSync(path.join(csvFilePath), { encoding : 'utf8'});
var options = {
  delimiter : ',',
  quote     : '"'
};

exports.seed = function(knex) {
	return knex('olympians').del()
	  .then(async () => {
		const olympianData = await csvjson.toObject(data, options);
		return Promise.all([
			knex('olympians').insert(olympianData)
		  .then(() => console.log('Nike!'))
			.catch(error => console.log(`Error seeding data: ${error}`))
		])
	  })
	  .catch(error => console.log(`Error seeding data: ${error}`));
	};
