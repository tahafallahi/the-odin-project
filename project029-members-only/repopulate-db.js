const { Client } = require("pg");
const { createMessagesSQL, createUsersSQL } = require("./database/tables");

const SQL = `
  INSERT INTO users (email, fullname, hash, is_admin, is_member) VALUES
    ('alice@example.com',   'Alice Johnson',  '$2b$10$abcdefghijklmnopqrstuvCJ8K9L1M2N3O4P5Q6R7S8T9U0V1W2X3Y', TRUE,  TRUE),
    ('bob@example.com',     'Bob Smith',      '$2b$10$abcdefghijklmnopqrstuvCJ8K9L1M2N3O4P5Q6R7S8T9U0V1W2X3Y', FALSE, TRUE),
    ('carol@example.com',   'Carol Davis',    '$2b$10$abcdefghijklmnopqrstuvCJ8K9L1M2N3O4P5Q6R7S8T9U0V1W2X3Y', FALSE, TRUE),
    ('dave@example.com',    'Dave Wilson',    '$2b$10$abcdefghijklmnopqrstuvCJ8K9L1M2N3O4P5Q6R7S8T9U0V1W2X3Y', FALSE, FALSE);
  INSERT INTO messages (title, text, author_id) VALUES
    ('Welcome to the club',        'Hey everyone, excited to get this forum started. Feel free to introduce yourselves!', 1),
    ('First meetup recap',         'Thanks to everyone who showed up last night, great turnout and great conversation.', 1),
    ('Question about membership',  'How do I upgrade my account to a full member? Is there a form somewhere?',          3),
    ('Bug on the profile page',    'My avatar upload keeps failing with a 500 error, anyone else seeing this?',          2),
    ('Ideas for next event',       'Thinking we could do a game night next month, thoughts on dates?',                   4),
    ('New feature suggestion',     'It would be nice to have dark mode on this site, my eyes are suffering.',            2),
    ('Introduce yourself here',    'Hi all, I am Dave, been lurking for a while and finally made an account.',           4),
    ('Server maintenance notice',  'Heads up, the site will be down for about an hour this weekend for updates.',        1),
    ('Thanks for the help',        'Appreciate everyone helping me debug my signup form earlier, works great now.',      3),
    ('Random thought of the day',  'Is it just me or does time move faster on Fridays? Anyway, happy weekend all.',      2)`;

if (!process.env.NODE_ENV)
  throw new Error("NODE_ENV isn't specified in enviroment variables.");
if (process.env.NODE_ENV == "development") {
  async function main() {
    client = new Client({
      connectionString: "postgresql://localhost:5432/sandbox",
    });
    await client.connect();
    console.log("dropping tables...");
    await client.query("DROP TABLE messages;");
    await client.query("DROP TABLE users;");
    console.log("sedding...");
    await client.query(createUsersSQL);
    await client.query(createMessagesSQL);
    console.log("populating tables with dummy data...");
    await client.query(SQL);
    await client.end();
    console.log("done.");
  }

  main();
} else {
  throw new Error(
    "remvoing and repopulating db is only allowed in development.",
  );
}
