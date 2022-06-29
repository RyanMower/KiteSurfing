CREATE TABLE Lessons(
id INT NOT NULL AUTO_INCREMENT,
contact_info VARCHAR(200),
pricing VARCHAR(200),
location VARCHAR(100) NOT NULL,
instructor_id INT,
FOREIGN KEY (instructor_id) REFERENCES Users(user_id),
PRIMARY KEY (id)
);
