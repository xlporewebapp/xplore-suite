
// auth.js - XPLORE Supabase Auth Integration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ellpsaghjktgjblpesqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbHBzYWdoamt0Z2pibHBlc3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MjMzNjksImV4cCI6MjA2MTE5OTM2OX0.0elJUnT0fNrhhEiyDyBKd6C2rwUAaL111ejo-LgExVk';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Sign up new user
export async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({ email, password });
  return { user, error };
}

// Sign in user
export async function signIn(email, password) {
  const { user, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user, error };
}

// Send password reset
export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
}
