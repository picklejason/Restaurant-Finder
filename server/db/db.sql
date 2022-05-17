CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY, 
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >= 1 and price_range <=4)
);

CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY, 
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL, 
  body TEXT NOT NULL, 
  rating INT NOT NULL check(rating >= 1 and rating <=5)
);