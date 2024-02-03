const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMSG]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numbersCaseCheck = document.querySelector("#numbers");
const symbolsCaseCheck = document.querySelector("#symbols");
const indicators = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordLength = 10;
let checkCount=0;

// set circle-color to gray 
setIndicator("#ccc")

handleSlider();
function handleSlider()
{
    inputSlider.value= passwordLength;
    lengthDisplay.innerText= passwordLength;
    
}
inputSlider.addEventListener("input", (evt)=>
{
    passwordLength = evt.target.value;
    handleSlider();
});

function setIndicator(color)
{
    indicators.style.backgroundColor= color;
    // shadow 
}

function getRndInteger(min,max)
{
    return Math.floor(Math.random()*(max-min))+min ; //gives number between main to max
}

function generateRndNumber()
{
    return getRndInteger(0,9);
}

function generateRndLowerCase()
{
    return String.fromCharCode(getRndInteger(97,123));
}

function generateRndUpperCase()
{
    return String.fromCharCode(getRndInteger(65,91));
}
const symbols = ["`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(" ,")" ,"_", "+", "=", "-",";", ":", ".", ">", ",", "<", "[", "]", "{", "}", "|", "?", "/"];
function generateRndSymbol()
{
    const getRndIndx = getRndInteger(0,symbols.length);
    return symbols[getRndIndx];
}

function calcStrength()
{
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;
    
    if(upperCaseCheck.checked) hasUpper=true;
    if(lowerCaseCheck.checked) hasLower=true;
    if(symbolsCaseCheck.checked) hasSymbol=true;
    if(numbersCaseCheck.checked) hasNumber=true;

    if(hasLower && hasUpper && hasNumber && hasSymbol && passwordLength>=10)
    {
        setIndicator('#0f0')
    }
    else if((hasLower || hasUpper) && (hasSymbol || hasNumber) && passwordLength>=6 )
    {
        setIndicator('#ff0')
    }
    else
    {
        setIndicator('#f00')
    }
}

async function copyContent()
{
    try 
    {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied"; 
    }
    catch(e)
    {
        copyMsg.innerText = "failed";
    }
    copyMsg.classList.add("active");

    setTimeout( ()=>
    {
        copyMsg.classList.remove("active");
    },2000);
}
copyBtn.addEventListener("click",()=>
{
    if(passwordDisplay.value)
    {
        copyContent();
    }
});

function handleCheckboxChange()
{
    checkCount=0;
    allCheckbox.forEach((checkbox)=>
    {
        if(checkbox.checked) checkCount++;

    });

    // special-condn 
    if(checkCount>passwordLength)
    {
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckbox.forEach((checkbox) =>
{
    checkbox.addEventListener("change",handleCheckboxChange);
})

// shuffle password fxn 
function shufflePassword(array)
{
    // fisher yates method 
    for(let i = array.length-1; i>0; i--)
    {
        const j = Math.floor(Math.random()* (i+1));
        const temp = array[i];
        array[i]= array[j];
        array[j]= temp;
    }

    let str = "";
    array.forEach((el)=> (str += el));
    return str;
}
generateBtn.addEventListener("click",()=>
{
    if(checkCount==0) return;

    // lets start journey of making password 

    // pehle agr koi purana password hai to usey htado 
    password="";

    // jo-jo checked hai vo vo daal de pehle 

    // if(upperCaseCheck.checked)
    // {
    //     password += generateRndUpperCase();
    // }
    // if(lowerCaseCheckCaseCheck.checked)
    // {
    //     password += generateRndLowerCaseCase();
    // }
    // if(numbersCaseCheckCaseCheck.checked)
    // {
    //     password += generateRndNumber();
    // }
    // if(symbolsCaseCheck.checked)
    // {
    //     password += generateRndSymbol();
    // }


    let fxnArr=[];

    if(upperCaseCheck.checked) fxnArr.push(generateRndUpperCase);
    
    if(lowerCaseCheck.checked) fxnArr.push(generateRndLowerCase);

    if(numbersCaseCheck.checked) fxnArr.push(generateRndNumber);

    if(symbolsCaseCheck.checked) fxnArr.push(generateRndSymbol);

    // compulsary adn 
    for(let i=0;i<fxnArr.length;i++)
    {
        password += fxnArr[i]();
    }

    // addn of remaining 
    for(let i=0;i<passwordLength-fxnArr.length;i++)
    {
        let rndIndx = getRndInteger(0,fxnArr.length);
        password += fxnArr[rndIndx]();
    }

    // password shuffle 
    password = shufflePassword(Array.from(password));

    // display password 

    passwordDisplay.value = password;

    // calculating strength 
    calcStrength();
    

})