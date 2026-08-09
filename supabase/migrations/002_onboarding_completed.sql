-- Track onboarding completion on profiles

alter table public.profiles
  add column if not exists onboarding_completed_at timestamptz;

comment on column public.profiles.onboarding_completed_at is
  'Timestamp when the user finished the onboarding questionnaire';
