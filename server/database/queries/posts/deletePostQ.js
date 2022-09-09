const connection = require("../../config/connection");

const deletePostQ = (id) => {
  return connection.query(
    `
    delete from
      posts
    where id = $1
    `,
    [id]
  );
};

module.exports = deletePostQ;
