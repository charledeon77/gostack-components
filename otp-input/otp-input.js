window.setupOTP = function(el) {
    var inputs = el.querySelectorAll('.gs-otp-digit');
    inputs.forEach(function(input, idx) {
        input.addEventListener('input', function() {
            if (input.value && idx < inputs.length - 1) {
                inputs[idx + 1].focus();
            }
        });
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !input.value && idx > 0) {
                inputs[idx - 1].focus();
            }
        });
    });
};
window.getOTP = function(container) {
    var val = '';
    container.querySelectorAll('.gs-otp-digit').forEach(function(i) {
        val += i.value;
    });
    return val;
};