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
    return knex(TABLE_NAME)
      .del()
      .insert([
        {
          name: "sarad chhetri",
          email: "saradchhetri20690@gmail.com",
          password: "Lu77pa@7882",
        },
      ]);
  });
}
