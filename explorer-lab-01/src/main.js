import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-log span:nth-child(2) img")

function setCardType(type){
    const colors = {
        visa:["#0ea5e9", "#2563eb"],
        mastercard:["#f59e0b", "#dc2626"],
        c6: ["#78716c", "#fafafa"],
        default: ["black", "gray"]
    }

    ccBgColor01.setAttribute("fill", colors[type][0])
    ccBgColor02.setAttribute("fill", colors[type][1])
    ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType   