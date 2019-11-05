exports.up = function(knex) {
    return knex.schema.createTable('cars', function(table){
        table.increments();

        table.string('vin').notNullable();
        table.string('make').notNullable();
        table.string('model').notNullable();
        table.integer('mileage').notNullable();
        table.string('transmission type');
        table.string('status of title');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
