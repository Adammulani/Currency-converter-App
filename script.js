const BASE_URL="https://v6.exchangerate-api.com/v6/e543faf55ffb3b3ce1039728/latest/";

const dropdown=document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button");
const fromCurrency=document.querySelector(".from select");
const toCurrency=document.querySelector(".to select");
const msg=document.querySelector(".msg");

window.addEventListener("load",()=>{
    updateExchangeRate();
})

for(let select of dropdown)
{
    for(currcode in countryList){
        let option=document.createElement("option");
        option.innerText=currcode;
        option.value=currcode;
        if(select.name==="from" && currcode==="USD")
        {
                option.selected="selected"
        }
        if(select.name==="to" && currcode==="INR")
        {
                option.selected="selected"
        }
        select.append(option);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currencyCode=element.value;
    let countryCode=countryList[currencyCode];
    let imgSource=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img");   
    img.src=imgSource;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();  // after submitting form by default it's behaviour is to refresh page, here we are preventing it
    updateExchangeRate();
})

const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input")
    let amtValue=amount.value;

    if(amtValue=="" || amtValue<1){
        amtValue=1;
        amount.value=1;
    }

    const URL=`${BASE_URL}${fromCurrency.value}`
   let response=await fetch(URL);
   let data=await response.json();
   let exchangeRate=data.conversion_rates[toCurrency.value];

   let finalAmount=amtValue*exchangeRate;
   msg.innerText=`${amtValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;


}