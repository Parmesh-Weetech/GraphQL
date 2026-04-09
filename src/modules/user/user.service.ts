import pool from "../../config/db.ts";

export const addUser = async (name: string, email: string) => {
    const { rows } = await pool.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]
    );
    return rows[0];
}