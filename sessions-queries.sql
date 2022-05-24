// create sessions hypertable
SELECT create_hypertable('sessions', 'createdAt', migrate_data => true);

// website sessions daily
CREATE MATERIALIZED VIEW sessions_by_website_daily
WITH (timescaledb.continuous)
AS
SELECT
   time_bucket('1 day', "createdAt") as day,
   "websiteId",
   count(*) as "sessionCount"
FROM
 sessions
GROUP BY day, "websiteId"
WITH NO DATA;

//  website unique sessions daily
CREATE MATERIALIZED VIEW unique_sessions_by_website_daily
WITH (timescaledb.continuous)
AS
SELECT
   time_bucket('1 day', "createdAt") as day,
   "websiteId",
   count(distinct "visitorId") as "sessionCount"
FROM
 sessions
GROUP BY day, "websiteId"
WITH NO DATA;

// avg visits per session
SELECT
   time_bucket('1 day', "createdAt") as day,
   "websiteId",
   to_char(
        AVG (visits),
        '99999999999999999D99'
    ) AS average_visits
FROM
 sessions
GROUP BY day, "websiteId"

// avg website session duration
SELECT
   time_bucket('1 day', "createdAt") as day,
   "websiteId",
   to_char(
        AVG (EXTRACT(EPOCH FROM ("updatedAt" - "createdAt"))),
        '99999999999999999D99'
    ) AS average_duration
FROM
 sessions
WHERE "updatedAt" IS NOT NULL 
GROUP BY day, "websiteId"

// avg website session duration
SELECT
   time_bucket_gapfill('1 day', "createdAt") as bucket,
   "websiteId",
   to_char(
        AVG (EXTRACT(EPOCH FROM ("updatedAt" - "createdAt"))),
        '99999999999999999D99'
    ) AS average_duration
FROM
 sessions
WHERE "updatedAt" IS NOT NULL 
AND "createdAt" > now() - INTERVAL '7 days' AND "createdAt" < now()
GROUP BY bucket, "websiteId"