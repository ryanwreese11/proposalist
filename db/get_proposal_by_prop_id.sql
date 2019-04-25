select c.cust_id, c.cust_first_name, c.cust_last_name, c.cust_email, c.cust_address, c.cust_usage, m.mod_name, m.mod_size, i.inv_name, u.utility_name, u.utility_rate, u.utility_ppw, l.loan_name, l.loan_term, l.loan_interest, l.pre_pmt_factor, l.post_pmt_factor, p.prop_production, p.prop_system_cost, p.prop_size, p.prop_id, p.mod_count, p.prop_ratio, us.user_first_name, us.user_last_name
from proposal p
join customer c on c.cust_id = p.cust_id
join module m on m.mod_id = p.mod_id
join inverter i on i.inv_id = p.inv_id
join utility u on u.utility_id = p.utility_id
join users us on us.user_id = p.user_id
join loan_product l on l.loan_id = p.loan_id
where p.prop_id = $1
