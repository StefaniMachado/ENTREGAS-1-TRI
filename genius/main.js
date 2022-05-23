const divPontuacao = document.querySelector("div.pontuacao")
const divMain = document.querySelector("main")
const divs = Array.from(divMain.querySelectorAll("div"))
const divStart = document.querySelector(".start")

let sequencia = []
let animatingColors = false
let currentColorPosition = 0

divStart.addEventListener("click", ev => {
    if (divStart.classList.contains("derrota")) {
        divStart.classList.add("reset")
    } else {
        inicio()
    }
    divStart.classList.add("contagem")
})

divStart.addEventListener("animationend", () => {
    if (divStart.classList.contains("reset")) {
        divStart.classList.remove("reset")
        divStart.classList.remove("derrota")
        divStart.innerHTML = "JOGAR"
        divPontuacao.innerHTML = "0"
    } else if (divStart.classList.contains("derrota")) {
    } else {
        divStart.classList.add("hide")
    }
    divStart.classList.remove("contagem")
})

divMain.addEventListener("click", ev => {
    if (animatingColors) {
        console.log("espere a animação terminar")
        return
    }
    const idxClickedElement = divs.indexOf(ev.target)
    if (idxClickedElement !== sequencia[currentColorPosition]) {
        divStart.classList.remove("contagem")
        divStart.classList.remove("hide")
        divStart.innerHTML = "Perdeu, tente novamente!"
        divStart.classList.add("derrota")
        return
    }
    currentColorPosition++
    ev.target.classList.add("animate")
    if (currentColorPosition >= sequencia.length) {
        currentColorPosition = 0
        setTimeout(() => turno(), 1500)
    }
})

divs.forEach(div => {
    div.addEventListener("animationend", () => {
        div.classList.remove("animate")
    })
})

function playAnimationColors() {
    sequencia.forEach((current, index) => {
        setTimeout(() => {
            divs[current].classList.add("animate");
            animatingColors = index < sequencia.length - 1
        }, 1000 * index);
    })
}

function inicio() {
    let cnt = 3
    divStart.innerHTML = cnt
    let idx = setInterval(() => {
        divStart.innerHTML = cnt - 1
        console.log(cnt--)
        if (cnt <= 0) {
            turno()
            clearInterval(idx)
        }
    }, 1000)
    sequencia = []
    currentColorPosition = 0
}

function turno() {
    divPontuacao.innerHTML = sequencia.length
    const rnd = Math.round(Math.random() * 3)
    sequencia.push(rnd)
    playAnimationColors()
}