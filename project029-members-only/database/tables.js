const createUsersSQL = `
    CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        email varchar(100) NOT NULL UNIQUE,
        fullname varchar(100) NOT NULL,
        hash char(100) NOT NULL,
        is_admin boolean DEFAULT FALSE,
        is_member boolean DEFAULT FALSE
    );
`;

const createMessagesSQL = `
    CREATE TABLE IF NOT EXISTS messages (
        id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title varchar(100) NOT NULL,
        text text NOT NULL,
        created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
        author_id integer references users(id)
    );
`;

module.exports = { createUsersSQL, createMessagesSQL };
