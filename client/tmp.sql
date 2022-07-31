ALTER TABLE Lessons 
  ADD CONSTRAINT fk
  FOREIGN KEY (instructor_id) 
  REFERENCES Users(id) 
  ON DELETE CASCADE;

  url = https://stackoverflow.com/questions/1571581/how-to-add-on-delete-cascade-in-alter-table-statement
