select c.cust_id, c.user_id, c.cust_first_name, c.cust_last_name, c.cust_email, c.cust_address, c.cust_usage, c.cust_notes, c.cust_progress, c.user_appt_date, c.user_appt_time, u.utility_name, u.utility_rate, utility_ppw, us.user_first_name, us.user_last_name
from customer c 
join utility u on c.utility_id = u.utility_id
join users us on c.user_id = us.user_id
where c.user_id = $1
order by user_appt_date, user_appt_time;