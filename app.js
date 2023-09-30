
let buttonRegister = document.getElementById('form-register').addEventListener('submit', (e) => {
    e.preventDefault()

    let name = document.getElementById('inputName').value
    let email = document.getElementById('inputEmail').value
    let password = document.getElementById('inputPassword').value
    let confirmPassword = document.getElementById('inputConfirmPassword').value

    regexEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
    
    if (name.length < 2) alert('O campo nome é obrigatório, e deve conter pelo menos duas letras!');
    else if (!regexEmail.test(email)) alert('O campo email é obrigatório, preencha com um email válido!');
    else if (password.length < 8) alert('A senha deve conter no mínimo 8 caracteres!');
    else if (password !== confirmPassword) alert('A confirmação de senha deve ser igual a senha informada!');
    else {
        alert('Usuário cadastrado!');
        document.getElementById('inputName').value = ''
        document.getElementById('inputEmail').value = ''
        document.getElementById('inputPassword').value = ''
        document.getElementById('inputConfirmPassword').value = ''
    }
})