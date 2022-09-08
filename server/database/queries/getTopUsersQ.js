const connection = require("../config/connection");

const getTopUsersQ = () => {
  return connection.query(
    `select
       u.id, u.username, u.img_url, count(p.user_id) as count
     from
       users u
     join
       posts p
     on
       u.id = p.user_id
     group by
       u.id
     order by
       count
     desc
       limit 5;`
  );
};

module.exports = getTopUsersQ;
