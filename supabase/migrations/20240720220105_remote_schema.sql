alter table "public"."profiles" drop column "website";

alter table "public"."profiles" add column "banner_url" text default 'https://cqctvtihvuyepaxnjstw.supabase.co/storage/v1/object/sign/banners/defaults/banner.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5uZXJzL2RlZmF1bHRzL2Jhbm5lci5wbmciLCJpYXQiOjE3MjE1MTI2NjAsImV4cCI6MjUwOTkxMjY2MH0.2_diTCkA4nyAL8KmdPw6ZUsbjhbgpKDOtoHbEJRYY-Q&t=2024-07-20T21%3A57%3A40.101Z'::text;


