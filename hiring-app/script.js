const supabase = supabase.createClient(
  'https://ellpsaghjktgjblpesqs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbHBzYWdoamt0Z2pibHBlc3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MjMzNjksImV4cCI6MjA2MTE5OTM2OX0.0elJUnT0fNrhhEiyDyBKd6C2rwUAaL111ejo-LgExVk'
);

// Load recruiters from Supabase
async function loadRecruiters() {
  const { data, error } = await supabase.from('recruiters').select('*');
  if (data) {
    const dropdown = document.getElementById('referredBy');
    data.forEach(rec => {
      const option = document.createElement('option');
      option.value = rec.name;
      option.textContent = rec.name;
      dropdown.appendChild(option);
    });
  }
}

// Toggle manual recruiter input if "Other" is selected
function toggleManualEntry() {
  const dropdown = document.getElementById('referredBy');
  const manualInput = document.getElementById('manualRecruiter');
  if (dropdown.value === 'Other') {
    manualInput.style.display = 'block';
  } else {
    manualInput.style.display = 'none';
  }
}

document.getElementById('jobAppForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const position = document.getElementById('position').value;
  const referredBy = document.getElementById('referredBy').value === 'Other'
    ? document.getElementById('manualRecruiter').value
    : document.getElementById('referredBy').value;
  const address = document.getElementById('address').value;
  const resumeFile = document.getElementById('resume').files[0];
  const idFile = document.getElementById('idUpload').files[0];

  const timestamp = new Date().toISOString();
  const resumePath = `resumes/${email}_${timestamp}_${resumeFile.name}`;
  const idPath = `ids/${email}_${timestamp}_${idFile.name}`;

  // Upload files to Supabase Storage
  const { error: resumeError } = await supabase.storage.from('uploads').upload(resumePath, resumeFile);
  const { error: idError } = await supabase.storage.from('uploads').upload(idPath, idFile);

  if (resumeError || idError) {
    alert('Error uploading files.');
    return;
  }

  // Submit application data
  const { error } = await supabase.from('job_applications').insert([{
    full_name: fullName,
    email,
    phone,
    position,
    referred_by: referredBy,
    address,
    resume_url: resumePath,
    id_url: idPath,
    submitted_at: timestamp
  }]);

  if (error) {
    alert('Error submitting application.');
  } else {
    alert('Application submitted successfully! 🎉');
    document.getElementById('jobAppForm').reset();
    document.getElementById('manualRecruiter').style.display = 'none';
  }
});

loadRecruiters();
