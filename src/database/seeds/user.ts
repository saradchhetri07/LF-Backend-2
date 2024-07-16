import { Knex } from "knex";

const TABLE_NAME = "users";

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
        id: 3,
        name: "shyam chhetri",
        email: "shyamchhetri123@gmail.com",
        password: "pepsodent123",
        created_by: 3,
      },
    ]);
  });
}
