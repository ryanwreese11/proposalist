insert into customer (
  cust_first_name,
  cust_last_name,
  cust_email,
  cust_address,
  utility_id,
  cust_notes,
  user_appt_date,
  user_appt_time,
  user_id,
  cust_progress
  
)
select $1, $2, $3, $4, u.utility_id, $6, $7, $8, $9, $10
  from utility u
where u.utility_name = $5;

select * from customer;