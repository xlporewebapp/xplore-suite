
const modulesContainer = document.getElementById('modulesContainer');
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const stackList = document.getElementById('stackList');

const sampleModules = [
  { id: 1, title: 'Ecommerce Module 1', category: 'ecommerce', tags: ['checkout', 'cart'] },
  { id: 2, title: 'Marketing Module 3', category: 'marketing', tags: ['leads', 'outreach'] },
  { id: 3, title: 'Tools Module 8', category: 'tools', tags: ['utility'] }
];

const stack = JSON.parse(localStorage.getItem('myStack') || '[]');
function saveStack() {
  localStorage.setItem('myStack', JSON.stringify(stack));
  renderStack();
}
function renderStack() {
  stackList.innerHTML = stack.map(item => `<li>${item.title}</li>`).join('');
}
function renderModules(modules) {
  modulesContainer.innerHTML = '';
  modules.forEach(mod => {
    const card = document.createElement('div');
    card.className = 'module-card';
    card.innerHTML = `<h3>${mod.title}</h3><p>Category: ${mod.category}</p>
    <p>Tags: ${mod.tags.join(', ')}</p>
    <button onclick='addToStack(${JSON.stringify(mod)})'>Install</button>`;
    modulesContainer.appendChild(card);
  });
}
function addToStack(module) {
  if (!stack.find(m => m.id === module.id)) {
    stack.push(module);
    saveStack();
  }
}
searchInput.addEventListener('input', () => {
  const val = searchInput.value.toLowerCase();
  renderModules(sampleModules.filter(m => m.title.toLowerCase().includes(val)));
});
renderModules(sampleModules);
renderStack();
