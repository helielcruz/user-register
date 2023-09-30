
let buttonRegister = document.getElementById('form-register').addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('inputName').value
    const email = document.getElementById('inputEmail').value
    const password = document.getElementById('inputPassword').value
    const confirmPassword = document.getElementById('inputConfirmPassword').value

    regexEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
    
    if (name.length < 2) alert('O campo nome é obrigatório, e deve conter pelo menos duas letras!');
    else if (!regexEmail.test(email)) alert('O campo email é obrigatório, preencha com um email válido!');
    else if (password.length < 8) alert('A senha deve conter no mínimo 8 caracteres!');
    else if (password !== confirmPassword) alert('A confirmação de senha deve ser igual a senha informada!');
    else {
        document.getElementById('inputName').value = ''
        document.getElementById('inputEmail').value = ''
        document.getElementById('inputPassword').value = ''
        document.getElementById('inputConfirmPassword').value = ''

        const data =  {
            name,
            email,
            password,
            confirmPassword
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        async function registerRequest() {
            const response = await fetch('index.php', options)
            console.log(response);
        }
        registerRequest()

        alert('Usuário cadastrado!');
        
    }
})