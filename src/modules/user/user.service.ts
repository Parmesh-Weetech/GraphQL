import pool from "../../config/db.ts";

export const addUser = async (name: string, email: string) => {
    const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
    );

    if (existingUser.rows.length > 0) {
        throw new Error("Email already exists");
    }

    const { rows } = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
    );
    return rows[0];
}

export const findAllUsers = async () => {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
}

export const findUserById = async (id: string) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
}

