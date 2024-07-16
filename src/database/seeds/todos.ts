import { Knex } from "knex";

const TABLE_NAME = "todos";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME).then(() => {
    return knex(TABLE_NAME).insert([
      {
        id: 1,
        title: "wash car",
        completed: "false",
        created_by: 1,
      },
      {
        id: 2,
        title: "make coffee",
        completed: "false",
        created_by: 2,
      },
    ]);
  });
}
