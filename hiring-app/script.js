let applicants = [];

function addApplicant() {
  const name = document.getElementById('applicantName').value;
  const email = document.getElementById('applicantEmail').value;
  if (name && email) {
    applicants.push({ name, email });
    renderApplicants();
    document.getElementById('applicantName').value = '';
    document.getElementById('applicantEmail').value = '';
  }
}

function renderApplicants() {
  const list = document.getElementById('applicantList');
  list.innerHTML = '';
  applicants.forEach((app, index) => {
    const li = document.createElement('li');
    li.textContent = `${app.name} – ${app.email}`;
    list.appendChild(li);
  });
}
