const connection = require("../../config/connection");

const getAllPostsQ = () => {
  return connection.query(
    `select
      p.*,
      u.username as user_name, u.img_url as user_img,
      SUM (COALESCE(v.vote,0)) as votes_sum 
    from
      posts p left join votes v
        on p.id = v.post_id
       left join users u
        on u.id =p.user_id
      GROUP BY p.id, u.id  order by votes_sum desc;`
  );
};

module.exports = getAllPostsQ;
