insert into users (user_first_name, user_last_name, user_email, user_hash, is_admin, is_rep, dark)
values ($1, $2, $3, $4, $5, $6, $7)
returning *;