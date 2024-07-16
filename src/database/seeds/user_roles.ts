import { Knex } from "knex";

const TABLE_NAME = "user_role";

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
        id: 2,
        user_role: "superUser",
        user_id: 2,
      },
    ]);
  });
}
