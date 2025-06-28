// lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Crear tabla en Supabase SQL Editor:
/*
CREATE TABLE song_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  song_name TEXT NOT NULL,
  artist_name TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  approved BOOLEAN DEFAULT false
);

-- Habilitar Row Level Security
ALTER TABLE song_requests ENABLE ROW LEVEL SECURITY;

-- Policy para que todos puedan leer canciones aprobadas
CREATE POLICY "Anyone can view approved songs" ON song_requests
  FOR SELECT USING (approved = true);

-- Policy para que todos puedan insertar canciones
CREATE POLICY "Anyone can insert songs" ON song_requests
  FOR INSERT WITH CHECK (true);
*/
