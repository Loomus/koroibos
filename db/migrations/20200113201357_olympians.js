
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('olympians', function(table) {
      table.increments('id').primary();
      table.string('Name');
      table.string('Sex');
      table.string('Age');
      table.string('Height');
      table.string('Weight');
      table.string('Team');
      table.string('Games');
      table.string('Sport');
      table.string('Event');
      table.string('Medal');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('olympians')
  ]);
}
