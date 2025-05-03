let applicants = JSON.parse(localStorage.getItem("applicants") || "[]");

function saveApplicants() {
  localStorage.setItem("applicants", JSON.stringify(applicants));
}

function renderApplicants(list = applicants) {
  const tbody = document.querySelector("#queueTable tbody");
  tbody.innerHTML = "";
  list.forEach((app, index) => {
    const row = document.createElement("tr");
    row.innerHTML = \`
      <td>\${app.name}</td>
      <td>\${app.email}</td>
      <td>\${app.role}</td>
      <td>\${app.status}</td>
      <td>
        <button onclick="deleteApplicant(\${index})">🗑 Delete</button>
      </td>
    \`;
    tbody.appendChild(row);
  });
}

function addApplicant() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value;
  const status = document.getElementById("status").value;

  if (!name || !email || !role || !status) return alert("Fill all fields");

  applicants.push({ name, email, role, status });
  saveApplicants();
  renderApplicants();
}

function deleteApplicant(index) {
  applicants.splice(index, 1);
  saveApplicants();
  renderApplicants();
}

function filterApplicants() {
  const role = document.getElementById("filterRole").value;
  const status = document.getElementById("filterStatus").value;
  const filtered = applicants.filter(a =>
    (role === "" || a.role === role) &&
    (status === "" || a.status === status)
  );
  renderApplicants(filtered);
}

function exportCSV() {
  const rows = [["Name", "Email", "Role", "Status"]];
  applicants.forEach(a => rows.push([a.name, a.email, a.role, a.status]));
  let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "applicants.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

renderApplicants();
