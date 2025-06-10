const body = document.body
const themeSwitch = document.getElementById('theme-switch')
const input = document.getElementById('new-task-input')
const addBtn = document.getElementById('add-task-btn')
const list = document.getElementById('task-list')

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark')
  themeSwitch.checked = true
}

themeSwitch.addEventListener('change', () => {
  body.classList.toggle('dark')
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light')
})

addBtn.addEventListener('click', addTask)
input.addEventListener('keyup', e => e.key === 'Enter' && addTask())

function addTask() {
  const t = input.value.trim()
  if (!t) return
  const li = document.createElement('li'); li.className = 'task-item'
  const span = document.createElement('span'); span.className = 'task-text'; span.textContent = t
  const actions = document.createElement('div'); actions.className = 'task-actions'
  const c = document.createElement('button'); c.textContent = '✓'; c.className = 'complete-btn'
  c.addEventListener('click', () => li.classList.toggle('completed'))
  const d = document.createElement('button'); d.textContent = '×'; d.className = 'delete-btn'
  d.addEventListener('click', () => list.removeChild(li))
  actions.append(c, d); li.append(span, actions); list.appendChild(li)
  input.value = ''; input.focus()
}
