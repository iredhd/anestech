/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TaskSchema extends Schema {
  up() {
    this.create('tasks', (table) => {
      table.increments();
      table.text('description', 'longtext').notNullable();
      table
        .integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.datetime('datetimeStart').notNullable();
      table.datetime('datetimeEnd');
      table.timestamps();
    });
  }

  down() {
    this.drop('tasks');
  }
}

module.exports = TaskSchema;
