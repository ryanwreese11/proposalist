update customer
set cust_usage = $2,
cust_progress = $3
where cust_id = $1
returning *;