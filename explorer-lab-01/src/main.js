import "./css/index.css";
import IMask from "imask";

const ccBgColor01 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path"
);
const ccBgColor02 = document.querySelector(
  ".cc-bg svg > g g:nth-child(2) path"
);
const ccLogo = document.querySelector(".cc-log span:nth-child(2) img");

function setCardType(type) {
  const colors = {
    visa: ["#0ea5e9", "#2563eb"],
    mastercard: ["#f59e0b", "#dc2626"],
    c6: ["#78716c", "#fafafa"],
    default: ["black", "gray"],
  };

  ccBgColor01.setAttribute("fill", colors[type][0]);
  ccBgColor02.setAttribute("fill", colors[type][1]);
  ccLogo.setAttribute("src", `cc-${type}.svg`);
}

globalThis.setCardType = setCardType;

const securityCode =document.querySelector("#security-code")
const securityCodePattern = {
    mask: "000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to:12,
        },
        YY: {
            mask: IMask.MaskedRange,
            from:String(new Date().getFullYear()).slice(2),
            to:String(new Date().getFullYear() + 10).slice(2)
        }
    },
}
const expirationDateMasked = IMask (expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
    mask: [
        {
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardtype: "visa"
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardtype: "mastercard",
        },
        {
            mask: "0000 0000 0000 0000",
            cardtype: "c6",
        },
        {
            mask: "0000 0000 0000 0000",
            cardtype: "default",
        }
    ],
    dispatch: function (append, dynamicMasked)  {
        const number = (dynamicMasked.value + append).replace(/\D/g, "")
        const foundMask = dynamicMasked.compiledMasks.find(function(item){
            return number.match(item.regex)
        })    

        console.log(foundMask)
        return foundMask
    }, 
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)