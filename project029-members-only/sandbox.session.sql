    UPDATE users 
    SET is_admin = TRUE
    WHERE id = 5
    RETURNING *;