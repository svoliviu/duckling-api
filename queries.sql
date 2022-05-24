// add timescaledb extension
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

// create visits hypertable
SELECT create_hypertable('visits', 'createdAt', migrate_data => true);

// visits by page daily

CREATE MATERIALIZED VIEW visits_by_website_and_page_hourly
WITH (timescaledb.continuous)
AS
SELECT
   time_bucket('1 hour', "createdAt") as hour,
   "websiteId",
   "path",
   count(*) as "visitCount"
FROM
 visits
GROUP BY "hour", "websiteId", "path"
WITH NO DATA;

SELECT
   time_bucket_gapfill('1 hour', hour) as bucket,
   "websiteId",
   path,
   count(*) as "visitCount"
FROM
 visits_by_website_and_page_hourly
WHERE hour > now() - INTERVAL '5 hours' AND hour < now()
GROUP BY bucket, "websiteId", path;


// visits by page daily

CREATE MATERIALIZED VIEW visits_by_website_and_page_daily
WITH (timescaledb.continuous)
AS
SELECT
   time_bucket('1 day', "createdAt") as day,
   "websiteId",
   path,
   count(*) as "visitCount"
FROM
 visits
GROUP BY day, "websiteId", path
WITH NO DATA;

SELECT
   time_bucket_gapfill('1 day', hour) as bucket,
   "websiteId",
   path,
   count(*) as "visitCount"
FROM
 visits_by_website_and_page_hourly
WHERE hour > now() - INTERVAL '7 days' AND hour < now()
GROUP BY bucket, "websiteId", path;