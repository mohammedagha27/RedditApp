const connection = require("../../config/connection");

const getUserPostsQ = (id) => {
  return connection.query(
    `select
      p.*,
      u.username as user_name, u.img_url as user_img
    from
      posts p 
        join users u
        on u.id =p.user_id
         where u.id =$1 order by id desc`,
    [id]
  );
};

module.exports = getUserPostsQ;
