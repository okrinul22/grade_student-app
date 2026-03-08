-- soal 1
 SELECT 
    s.name,
     ss.subject_name,
     g.grade_value
FROM grade g
JOIN student s 
     ON g.student_uuid = s.uuid
JOIN school_subject ss 
    ON g.school_subject_uuid = ss.uuid;
		
-- soal 2

SELECT 
    s.name,
    ss.subject_name,
    g.grade_value
 FROM grade g
JOIN student s ON g.student_uuid = s.uuid
JOIN school_subject ss ON g.school_subject_uuid = ss.uuid
 WHERE g.grade_value IN ('A','B');
 
-- soal 3

 SELECT *
 FROM student
 WHERE name IN ('Andi', 'Budi', 'Citra');
 
-- soal 4

-- SELECT *

SELECT *
FROM student
WHERE uuid IN (
    SELECT g.student_uuid
    FROM grade g
    JOIN school_subject ss 
        ON g.school_subject_uuid = ss.uuid
    WHERE ss.subject_name = 'Matematika'
);

-- soal 5

SELECT s.name, COUNT(g.school_subject_uuid) AS total_subject
FROM student s
JOIN grade g ON s.uuid = g.student_uuid
GROUP BY s.uuid
HAVING COUNT(g.school_subject_uuid) > (
    SELECT AVG(subject_count)
    FROM (
        SELECT COUNT(*) AS subject_count
        FROM grade
        GROUP BY student_uuid
    ) AS avg_table
);

-- soal 6

SELECT s.*
FROM student s
LEFT JOIN grade g 
    ON s.uuid = g.student_uuid
WHERE g.uuid IS NULL;
