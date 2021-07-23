
CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username varchar(255) not null,
	email varchar(255) not null,
	password varchar(255) not null,
	img varchar(255),
	created_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  likes INT not null,
	book_id INT not null,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE books (
  id INT AUTO_INCREMENT,
  title varchar(255) not null,
	thumbnail varchar(255),
	contents varchar(255),
	isbn int not null,
	publisher varchar(255) not null,
	authors varchar(255) not null,
	url varchar(255) not null,
  PRIMARY KEY (id)
);

CREATE TABLE hashtags (
  id INT AUTO_INCREMENT,
  hashtag_name varchar(255) not null,
	PRIMARY KEY (id)
);

CREATE TABLE post_hashtag (
  id INT AUTO_INCREMENT,
  post_id INT not null,
	hashtag_id INT not null,
  PRIMARY KEY (id)
);

ALTER TABLE follow ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE follow ADD FOREIGN KEY (follower_id) REFERENCES users (id);

ALTER TABLE posts ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE posts ADD FOREIGN KEY (book_id) REFERENCES books (id);

ALTER TABLE post_hashtag ADD FOREIGN KEY (post_id) REFERENCES posts (id);

ALTER TABLE post_hashtag ADD FOREIGN KEY (hashtag_id) REFERENCES hashtags (id);

/* 배포하기 전에 꼭 지울 것 */
/*  Execute this file from the command line by typing:
 * mysql -u admin --host [RDS 주소] -P [포트번호] < server/schema.sql -p -D[데이터베이스 이름]
 * mysql -u admin --host everyreview-database.cpbc9veoxah1.ap-northeast-2.rds.amazonaws.com -P 13306 < server/schema.sql -p -Dtest */
