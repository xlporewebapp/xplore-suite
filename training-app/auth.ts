
import { supabase } from './db';

export async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({ email, password });
  return { user, error };
}

export async function signIn(email, password) {
  const { user, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user, error };
}

export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
}
