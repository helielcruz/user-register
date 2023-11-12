import Auth from "./auth/auth.js";
import currentUser from './user/currentUser.js'

try {
    let user
    document.addEventListener('DOMContentLoaded', async () => {
        if (!await Auth.verify()) window.open('http://localhost/user-register', '_self')
        user = await currentUser()
            
            let initialMessage = document.getElementById('title')
            initialMessage.innerHTML = `Perfil de ${user.name}`

    })

    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem("token");
        window.open('http://localhost/user-register', '_self')
    })
    

    document.getElementById('formCurrencyExchange').addEventListener('submit', async (e)=>{
        e.preventDefault()

        let CoinsJson = await fetch('http://localhost/user-register/frontend//src/coins/coins.json')
        CoinsJson = await CoinsJson.json()

        let coins =  document.getElementById('selectCoins')
        let textHistory =  document.getElementById('text-history')
        if(!coins.value) {
            coins.style.border = 'solid 1px #ad2828'
            setTimeout(() => {
                coins.style.border = 'solid 1px rgb(73, 187, 221)'
            }, 2000);
        } else {
            let sendButton = document.getElementById('sendButton')
            let sendIcon = document.getElementById('sendIcon')
            sendIcon.style.cursor = 'wait'
            sendIcon.className = 'fa-solid fa-spinner fa-spin-pulse'

            const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${coins.value.trim()}`)

            if (response.ok) {
                const data = await response.json()
                const {bid, create_date, code, codein, name} = data[coins.value.replace('-', '')]
                sendIcon.className = 'fa-solid fa-paper-plane'
                sendIcon.style.cursor = 'default'
                let date = new Date(create_date)
                date.toLocaleString('pt-BR')
                const hours = date.getHours().toString().length > 1 ? date.getHours() : '0'+date.getHours()
                const minutes = date.getMinutes().toString().length > 1 ? date.getMinutes() : '0'+date.getMinutes()
                const seconds = date.getSeconds().toString().length > 1 ? date.getSeconds() : '0'+date.getSeconds()
                const coinValue = parseFloat(bid)
                const formatedCoin = coinValue.toLocaleString(CoinsJson[codein][1], { style: 'currency', currency: CoinsJson[codein][0], minimumFractionDigits: 2 })

                console.log(name);
                textHistory.innerHTML = `A última cotação registrada em
                 ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}
                 às ${hours}:${minutes}:${seconds}
                 para ${name} foi de ${formatedCoin}`
            }


        }
    })

} catch (error) {
    console.log(error);
}