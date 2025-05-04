const SUPABASE_URL = 'https://ellpsaghjktgjblpesqs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbHBzYWdoamt0Z2pibHBlc3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MjMzNjksImV4cCI6MjA2MTE5OTM2OX0.0elJUnT0fNrhhEiyDyBKd6C2rwUAaL111ejo-LgExVk';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

window.addEventListener('DOMContentLoaded', async () => {
  const { data: recruiters, error } = await supabase.from('recruiters').select('*');
  const dropdown = document.getElementById('referredBy');
  if (!error && recruiters) {
    recruiters.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.name;
      opt.textContent = r.name;
      dropdown.appendChild(opt);
    });
  }
});

document.getElementById('jobAppForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  alert('Application submitted! (Functionality placeholder)');
  // You could collect form data and store it using Supabase insert logic here.
});
