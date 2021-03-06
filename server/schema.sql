
CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username varchar(255) not null,
	email varchar(255) not null UNIQUE,
	password varchar(255) not null,
	profile varchar(255),
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE follow (
  id INT AUTO_INCREMENT,
  user_id INT not null,
  follower_id INT not null,
  PRIMARY KEY (id)
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT,
	content varchar(255) not null,
  user_id INT not null,
  likes INT default 0,
	book_id INT not null,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE books (
  id INT AUTO_INCREMENT,
  title varchar(255) not null,
	thumbnail varchar(255),
	contents varchar(255),
	isbn varchar(255) not null UNIQUE,
	publisher varchar(255) not null,
	url varchar(255) not null,
  PRIMARY KEY (id)
);

CREATE TABLE authors (
  id INT AUTO_INCREMENT,
  name varchar(255) not null,
  PRIMARY KEY (id)
);

CREATE TABLE book_author (
  id INT auto_increment, 
  book_id INT not null, 
  author_id INT not null, 
  PRIMARY KEY(id), 
  FOREIGN KEY (book_id) REFERENCES books(id), 
  FOREIGN KEY (author_id) REFERENCES authors(id),
  CONSTRAINT AUTHOR_BOOK UNIQUE (book_id, author_id)
);

CREATE TABLE hashtags (
  id INT auto_increment,
  hashtag_name varchar(255) not null UNIQUE, 
  hashcount INT default 0,
  PRIMARY KEY (id)
);

CREATE TABLE post_hashtag (
  id INT AUTO_INCREMENT,
  post_id INT not null,
	hashtag_id INT not null,
  PRIMARY KEY (id),
  CONSTRAINT HASH_POST UNIQUE (post_id, hashtag_id)
);

ALTER TABLE follow ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE follow ADD FOREIGN KEY (follower_id) REFERENCES users (id);

ALTER TABLE posts ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE posts ADD FOREIGN KEY (book_id) REFERENCES books (id);

ALTER TABLE post_hashtag ADD FOREIGN KEY (post_id) REFERENCES posts (id);

ALTER TABLE post_hashtag ADD FOREIGN KEY (hashtag_id) REFERENCES hashtags (id);