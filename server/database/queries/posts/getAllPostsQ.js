const connection = require("../../config/connection");

const getAllPostsQ = () => {
  return connection.query(
    `select
      p.id, p.title, p.content, p.posted_at,
      u.username as user_name, u.img_url as user_img,
      SUM (v.vote) as votes_sum 
    from
      posts p left join votes v
        on p.id = v.post_id
       left join users u
        on u.id =p.user_id
      GROUP BY p.id, u.id ;`
  );
};

module.exports = getAllPostsQ;
