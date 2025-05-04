
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ellpsaghjktgjblpesqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbHBzYWdoamt0Z2pibHBlc3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MjMzNjksImV4cCI6MjA2MTE5OTM2OX0.0elJUnT0fNrhhEiyDyBKd6C2rwUAaL111ejo-LgExVk';

export const supabase = createClient(supabaseUrl, supabaseKey);
