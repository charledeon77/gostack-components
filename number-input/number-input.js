// Adjust numeric input value
function adjustNum(amt) {
  const field = document.getElementById('counter-val');
  if (field) field.value = Math.max(0, parseInt(field.value) + amt);
}