// Copy text demo
function copyMockText() {
  const text = document.getElementById('token-to-copy').innerText;
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}