insert into proposal (
  cust_id,
  utility_id,
  user_id,
  mod_id,
  inv_id,
  loan_id,
  prop_production,
  prop_system_cost,
  prop_signed,
  prop_size,
  mod_count,
  prop_ratio
)
select $1, u.utility_id, $3, m.mod_id, i.inv_id, l.loan_id, $7, $8, $9, $10, $11, $12
from utility u, module m, inverter i, loan_product l
where u.utility_name = $2 and m.mod_name = $4 and i.inv_name = $5 and l.loan_name = $6;

select * from proposal;