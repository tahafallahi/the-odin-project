const pool = require("./pool.js");

async function createUser({
  email,
  fullname,
  hash,
  is_admin = false,
  is_member = false,
}) {
  const SQL = `
        INSERT INTO users (email, fullname, hash, is_admin, is_member)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

  return await pool.query(SQL, [email, fullname, hash, is_admin, is_member]);
}

async function getUserById(id) {
  const SQL = `
        SELECT * FROM users
        WHERE id = $1;
    `;
  const { rows } = await pool.query(SQL, [id]);
  return rows[0];
}

async function getUserByEmail(email) {
  const SQL = `
        SELECT * FROM users
        WHERE email = $1;
    `;

  const { rows } = await pool.query(SQL, [email]);
  return rows[0];
}

async function updateUser(user) {
  const SQL = `
    UPDATE users 
    SET (email, fullname, is_member, is_admin) = ($2, $3, $4, $5)
    WHERE id = $1
    RETURNING *;
  `;
  const { rows } = pool.query(SQL, [
    user.id,
    user.email,
    user.fullname,
    user.is_member,
    user.is_admin,
  ]);
}

async function createMessage({ title, text, authorId }) {
  const SQL = `
        INSERT INTO messages (title, text, author_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

  return await pool.query(SQL, [title, text, authorId]);
}

async function getMessages() {
  const SQL = `
    SELECT m.id, m.title, m.text, m.author_id, m.created_at, u.fullname AS author
    FROM messages AS m
    LEFT JOIN users AS u
    ON m.author_id = u.id;
  `;
  const { rows } = await pool.query(SQL);
  return rows;
}

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  createMessage,
  getMessages,
};
