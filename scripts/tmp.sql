ALTER TABLE
  Lessons
ADD
  CONSTRAINT `fk_cascade` FOREIGN KEY (`instructor_id`) REFERENCES Users (`user_id`) ON DELETE CASCADE;
