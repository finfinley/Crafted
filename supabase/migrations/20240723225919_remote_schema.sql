alter table "public"."profiles" drop column "full_name";

alter table "public"."profiles" add column "bio" text;

alter table "public"."profiles" add column "display_name" text;

alter table "public"."profiles" add column "location" text;

alter table "public"."profiles" alter column "banner_url" set default 'https://cqctvtihvuyepaxnjstw.supabase.co/storage/v1/object/sign/banners/defaults/default-banner.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5uZXJzL2RlZmF1bHRzL2RlZmF1bHQtYmFubmVyLmpwZWciLCJpYXQiOjE3MjE1ODAzNTQsImV4cCI6MjE5NDYyMDM1NH0.7BGzsnTLEgAWDASFeP68fdR9L304OmjiBsMx9XHlvtc&t=2024-07-21T16%3A45%3A54.583Z'::text;

alter table "public"."profiles" add constraint "profiles_bio_check" CHECK ((length(bio) < 101)) not valid;

alter table "public"."profiles" validate constraint "profiles_bio_check";

alter table "public"."profiles" add constraint "profiles_location_check" CHECK ((length(location) < 19)) not valid;

alter table "public"."profiles" validate constraint "profiles_location_check";


