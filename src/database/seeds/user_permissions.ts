import { Knex } from "knex";

const TABLE_NAME = "user_permissions";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          id: 1,
          permission_type: "get",
          user_id: 1,
          created_by: 2,
        },
        {
          id: 2,
          permission_type: "read",
          user_id: 1,
          created_by: 2,
        },
        {
          id: 3,
          permission_type: "update",
          user_id: 1,
          created_by: 2,
        },
        {
          id: 4,
          permission_type: "delete",
          user_id: 1,
          created_by: 2,
        },

        {
          id: 5,
          permission_type: "get",
          user_id: 1,
          created_by: 2,
        },
        {
          id: 6,
          permission_type: "read",
          user_id: 2,
          created_by: 2,
        },
        {
          id: 7,
          permission_type: "update",
          user_id: 2,
          created_by: 2,
        },
        {
          id: 8,
          permission_type: "delete",
          user_id: 2,
          created_by: 2,
        },
      ]);
    });
}
