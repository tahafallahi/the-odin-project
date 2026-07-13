 UPDATE items 
        SET (name, stock) = ('test', 000)
        WHERE id = 1
        RETURNING *;

SELECT * FROM items;

