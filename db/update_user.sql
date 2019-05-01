update users
set user_first_name = $2,
user_last_name = $3,
user_email = $4,
dark = $5
where user_id = $1
returning *;