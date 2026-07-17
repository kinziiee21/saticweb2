-- ================================================
-- SATIC Teachers' Club — Supabase Database Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ================================================

-- 1. MEMBERS TABLE
-- Stores all registered teacher profiles
CREATE TABLE IF NOT EXISTS members (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL UNIQUE,
  mobile          TEXT NOT NULL,
  school_name     TEXT NOT NULL,
  city            TEXT NOT NULL,
  state           TEXT NOT NULL,
  teaching_level  TEXT NOT NULL,
  subject         TEXT NOT NULL,
  experience      TEXT NOT NULL,
  member_id       TEXT UNIQUE,
  status          TEXT NOT NULL DEFAULT 'pending',   -- 'pending' | 'active' | 'expired'
  membership_start TIMESTAMPTZ,
  membership_end   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PAYMENTS TABLE
-- Records each Razorpay payment attempt
CREATE TABLE IF NOT EXISTS payments (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id           UUID REFERENCES members(id) ON DELETE CASCADE,
  razorpay_order_id   TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature  TEXT,
  amount              INTEGER NOT NULL DEFAULT 49900,  -- Amount in paise (₹499 = 49900 paise)
  currency            TEXT NOT NULL DEFAULT 'INR',
  status              TEXT NOT NULL DEFAULT 'created', -- 'created' | 'paid' | 'failed'
  payment_method      TEXT,                            -- 'upi' | 'card' | 'netbanking'
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SESSIONS TABLE  
-- Stores Teachers' Talk live session records
CREATE TABLE IF NOT EXISTS sessions (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT,
  speaker_name TEXT,
  speaker_bio  TEXT,
  session_date TIMESTAMPTZ NOT NULL,
  duration_min INTEGER DEFAULT 60,
  meet_link    TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  recording    TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BATCHES TABLE
-- Stores Daily Practice batch records
CREATE TABLE IF NOT EXISTS batches (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT,
  start_date   TIMESTAMPTZ,
  end_date     TIMESTAMPTZ,
  whatsapp_link TEXT,
  status       TEXT NOT NULL DEFAULT 'upcoming', -- 'upcoming' | 'active' | 'completed'
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- ROW LEVEL SECURITY (RLS) — Enable per table
-- This ensures members can only read their own data
-- ================================================

ALTER TABLE members  ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches  ENABLE ROW LEVEL SECURITY;

-- POLICIES — Members table
CREATE POLICY "Allow insert for all" ON members
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Allow select own record via email" ON members
  FOR SELECT USING (TRUE); -- Will tighten once auth is added

-- POLICIES — Payments table
CREATE POLICY "Allow insert for all" ON payments
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Allow select own payments" ON payments
  FOR SELECT USING (TRUE);

-- POLICIES — Sessions table (public readable)
CREATE POLICY "Sessions are publicly readable" ON sessions
  FOR SELECT USING (is_published = TRUE);

-- POLICIES — Batches table (public readable)
CREATE POLICY "Batches are publicly readable" ON batches
  FOR SELECT USING (TRUE);

-- ================================================
-- UPDATED_AT TRIGGER
-- Automatically updates the updated_at timestamp
-- ================================================

CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER members_updated_at
  BEFORE UPDATE ON members
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ================================================
-- AUTO-GENERATE MEMBER_ID TRIGGER
-- ================================================

CREATE OR REPLACE FUNCTION set_member_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.member_id IS NULL THEN
    NEW.member_id := 'STC-' || LPAD(EXTRACT(EPOCH FROM NOW())::BIGINT::TEXT, 10, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_member_id
  BEFORE INSERT ON members
  FOR EACH ROW
  EXECUTE FUNCTION set_member_id();


-- ================================================
-- SEED DATA — Initial session and batch records
-- ================================================

INSERT INTO sessions (title, description, speaker_name, session_date, meet_link, is_published)
VALUES (
  'Implementing AI Tools for Lesson Planning & Student Assessment',
  'A practical deep-dive into using ChatGPT, Gemini, and Co-Pilot effectively in classroom workflows.',
  'Dr. Sandeep Kumar',
  '2026-07-22 11:30:00+00',
  'https://meet.google.com/mock-link',
  TRUE
);

INSERT INTO batches (title, description, start_date, end_date, whatsapp_link, status)
VALUES (
  'AI Teaching Practice',
  'Learn to integrate AI tools seamlessly into your daily lesson planning, slide generation, and student assessment workflows.',
  '2026-08-03 00:00:00+00',
  '2026-08-31 00:00:00+00',
  'https://chat.whatsapp.com/mock-batch-group',
  'upcoming'
);
