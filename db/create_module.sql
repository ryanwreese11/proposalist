insert into module (mod_name, mod_size)
values($1, $2)
returning *;