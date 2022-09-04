BEGIN;

DROP TABLE IF EXISTS users, posts, votes,comments CASCADE;

CREATE TABLE
    users (
        id serial primary key,
        username varchar(100) not null unique,
        email text not null unique,
        password text not null,
        img_url text
    );

CREATE TABLE
    posts (
        id serial primary key,
        title text not null,
        content text not null,
        user_id INTEGER not null,
        posted_at timestamptz not null default current_timestamp,
        foreign key (user_id) references users(id) on DELETE CASCADE
    );

CREATE TABLE
    comments(
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        comment TEXT NOT NULL,
        posted_at timestamptz not null default current_timestamp,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    );

CREATE TABLE
    votes(
        id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        vote int not null check (vote in (-1, 1)),
        FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

--!fake Data

INSERT INTO
    users(
        username,
        email,
        password,
        img_url
    )
VALUES (
        'mohammed_agha',
        'mm@gmail.com',
        '123456',
        'https://avatars.githubusercontent.com/u/87938745?v=4'
    );

INSERT INTO
    users(
        username,
        email,
        password,
        img_url
    )
VALUES (
        'ahmed',
        'aa@gmail.com',
        '123456',
        'https://avatars.githubusercontent.com/u/87938745?v=4'
    );

INSERT INTO
    posts(title, content, user_id)
VALUES ('new post', 'idk', 1);

INSERT INTO
    posts(title, content, user_id)
VALUES ('new post2', 'idk2', 2);

INSERT INTO
    comments(user_id, post_id, comment)
VALUES (1, 1, 'new comment');

INSERT INTO
    comments(user_id, post_id, comment)
VALUES (2, 1, 'new comment2');

INSERT INTO votes(post_id, user_id, vote) VALUES (1, 1, 1);

INSERT INTO votes(post_id, user_id, vote) VALUES (1, 2, -1);

COMMIT;