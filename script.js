let allModules = [];

fetch('modules.json')
  .then(res => res.json())
  .then(data => {
    allModules = data;
    document.getElementById('moduleCount').textContent = `${data.length} Modules Available`;
    populateCategoryDropdown(data);
    renderModules(data);
  });

function populateCategoryDropdown(data) {
  const select = document.getElementById('categorySelect');
  const uniqueCategories = [...new Set(data.map(m => m.category))];
  uniqueCategories.sort();
  uniqueCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    select.appendChild(option);
  });
}

function renderModules(modules) {
  const container = document.getElementById('moduleContainer');
  container.innerHTML = '';
  modules.forEach(module => {
    const card = document.createElement('div');
    card.className = `module-card tier-${module.tier}`;
    const tags = module.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
    card.innerHTML = `
      <img src="${module.thumbnail}" alt="${module.name}" class="thumb" onerror="this.style.display='none'" />
      <h3>${module.icon} ${module.name}</h3>
      <p>${module.description}</p>
      <strong>Category:</strong> ${module.category}<br>
      <div>${tags}</div>
      <button onclick="alert('Installing ${module.name}')">Install</button>
    `;
    container.appendChild(card);
  });
}

document.getElementById('searchInput').addEventListener('input', filterModules);
document.getElementById('categorySelect').addEventListener('change', filterModules);

function filterModules() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categorySelect').value;
  const filtered = allModules.filter(m =>
    (term === '' || m.name.toLowerCase().includes(term) || m.description.toLowerCase().includes(term)) &&
    (category === 'all' || m.category === category)
  );
  renderModules(filtered);
}
let stack = [];

function addToStack(module) {
  if (!stack.includes(module)) {
    stack.push(module);
    alert(`${module.name} added to your stack!`);
    updateStackDisplay();
  }
}

function updateStackDisplay() {
  const stackBtn = document.getElementById("viewStackBtn");
  if (stack.length > 0) {
    stackBtn.innerText = `🧰 View Stack (${stack.length})`;
    stackBtn.style.display = "inline-block";
  } else {
    stackBtn.style.display = "none";
  }
}

function showStack() {
  alert("Your Stack:\n\n" + stack.map(m => `- ${m.name}`).join("\n"));
}
