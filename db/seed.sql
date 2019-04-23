CREATE TABLE "users" (
	"user_id" serial NOT NULL,
	"user_first_name" varchar(180) NOT NULL,
	"user_last_name" varchar(180) NOT NULL,
	"user_email" varchar(180) NOT NULL,
	"user_hash" TEXT NOT NULL,
	"is_admin" BOOLEAN NOT NULL,
	"is_rep" BOOLEAN NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "customer" (
	"cust_id" serial NOT NULL,
	"user_id" int NOT NULL,
	"utility_id" int NOT NULL,
	"cust_first_name" varchar(180) NOT NULL,
	"cust_last_name" varchar(180) NOT NULL,
	"cust_email" varchar(180) NOT NULL,
	"cust_address" varchar(180) NOT NULL,
	"cust_usage" varchar(180) NOT NULL,
	"cust_notes" varchar(300) NOT NULL,
	"cust_progress" varchar(180) NOT NULL,
	"user_appt_date" DATE NOT NULL,
	"user_appt_time" TIME NOT NULL,
	CONSTRAINT customer_pk PRIMARY KEY ("cust_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "utility" (
	"utility_id" serial NOT NULL,
	"utility_name" varchar(180) NOT NULL,
	"utility_rate" varchar(180) NOT NULL,
	CONSTRAINT utility_pk PRIMARY KEY ("utility_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "proposal" (
	"prop_id" serial NOT NULL,
	"cust_id" int NOT NULL,
	"utility_id" int NOT NULL,
	"user_id" int NOT NULL,
	"mod_id" int NOT NULL,
	"inv_id" int NOT NULL,
	"loan_id" int NOT NULL,
	"prop_size" int NOT NULL,
	"prop_production" int NOT NULL,
	"prop_ppw" int NOT NULL,
	"prop_system_cost" int NOT NULL,
	"prop_signed" BOOLEAN NOT NULL,
	CONSTRAINT proposal_pk PRIMARY KEY ("prop_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "module" (
	"mod_id" serial NOT NULL,
	"mod_name" varchar(180) NOT NULL,
	"mod_size" int NOT NULL,
	CONSTRAINT module_pk PRIMARY KEY ("mod_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "inverter" (
	"inv_id" serial NOT NULL,
	"inv_name" varchar(180) NOT NULL,
	"inv_type" varchar(180) NOT NULL,
	CONSTRAINT inverter_pk PRIMARY KEY ("inv_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "loan_product" (
	"loan_id" serial NOT NULL,
	"loan_name" varchar(180) NOT NULL,
	"loan_term" int NOT NULL,
	"loan_interest" int NOT NULL,
	CONSTRAINT loan_product_pk PRIMARY KEY ("loan_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "customer" ADD CONSTRAINT "customer_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
ALTER TABLE "customer" ADD CONSTRAINT "customer_fk1" FOREIGN KEY ("utility_id") REFERENCES "utility"("utility_id");


ALTER TABLE "proposal" ADD CONSTRAINT "proposal_fk0" FOREIGN KEY ("cust_id") REFERENCES "customer"("cust_id");
ALTER TABLE "proposal" ADD CONSTRAINT "proposal_fk1" FOREIGN KEY ("utility_id") REFERENCES "utility"("utility_id");
ALTER TABLE "proposal" ADD CONSTRAINT "proposal_fk2" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
ALTER TABLE "proposal" ADD CONSTRAINT "proposal_fk3" FOREIGN KEY ("mod_id") REFERENCES "module"("mod_id");
ALTER TABLE "proposal" ADD CONSTRAINT "proposal_fk4" FOREIGN KEY ("inv_id") REFERENCES "inverter"("inv_id");
ALTER TABLE "proposal" ADD CONSTRAINT "proposal_fk5" FOREIGN KEY ("loan_id") REFERENCES "loan_product"("loan_id");



-------getting customer list sorted by appt--------
select * from customer
order by user_appt_date, user_appt_time



--------UPDATED GET CUSTOMER TO GET UTILITY INFO ---------
select c.cust_id, c.user_id, c.cust_first_name, c.cust_last_name, c.cust_email, c.cust_address, c.cust_usage, c.cust_notes, c.cust_progress, c.user_appt_date, c.user_appt_time, u.utility_name, u.utility_rate 
from customer c 
join utility u on c.utility_id = u.utility_id
order by user_appt_date, user_appt_time;



insert into users (user_first_name, user_last_name, user_email, user_hash, is_admin, is_rep)
values ($1, $2, $3, $4, $5, $6)
returning *;

insert into module (mod_name, mod_size)
values($1, $2)
returning *;

insert into inverter (inv_name, inv_type)
values($1, $2);
select * from inverter;

insert into loan_product (loan_name, loan_term, loan_interest, pre_pmt_factor, post_pmt_factor)
values($1,$2,$3,$4,$5)

insert into utility (utility_name, utility_rate, utility_location, utility_ppw)
values($1,$2,$3,$4)

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
where u.utility_name = $5

returning *;


select * from utility
order by utility_name

select * from loan_product
order by loan_name, loan_term

select * from module
order by mod_name

select * from inverter
order by inv_name

select * from users
order by user_last_name

select * 
from customer 
where cust_email = $1

insert into utility (utility_name, utility_rate, utility_location, utility_ppw)
values($1,$2,$3,$4)

insert into loan_product (loan_name, loan_term, loan_interest, pre_pmt_factor, post_pmt_factor)
values ($1,$2,$3,$4,$5)

----- UPDATED GET CUSTOMERS FOR WHEN THE SALES REP IS LOGGED IN TO ONLY SEE THEIR/ALSO ADDED SALES REPS NAME ----

select c.cust_id, c.user_id, c.cust_first_name, c.cust_last_name, c.cust_email, c.cust_address, c.cust_usage, c.cust_notes, c.cust_progress, c.user_appt_date, c.user_appt_time, u.utility_name, u.utility_rate, us.user_first_name, us.user_last_name
from customer c 
join utility u on c.utility_id = u.utility_id
join users us on c.user_id = us.user_id
where c.user_id = $1
order by user_appt_date, user_appt_time;

select c.cust_id, c.user_id, c.cust_first_name, c.cust_last_name, c.cust_email, c.cust_address, c.cust_usage, c.cust_notes, c.cust_progress, c.user_appt_date, c.user_appt_time, u.utility_name, u.utility_rate, us.user_first_name, us.user_last_name
from customer c 
join utility u on c.utility_id = u.utility_id
join users us on c.user_id = us.user_id
order by user_appt_date, user_appt_time;