 SELECT * FROM Lessons 
 JOIN Users ON
 Users.user_id = Lessons.instructor_id 
 WEHRE Users.user_email=?;
