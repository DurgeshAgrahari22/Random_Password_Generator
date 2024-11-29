const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-length-number]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercasecheck=document.querySelector("#uppercase");
const lowercasecheck=document.querySelector("#lowercase");
const numbercheck=document.querySelector("#Numbers");
const symbolcheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input [type = checkbox]");
const symbols='~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password="";
let passwordLength=10;
let checkCount=1;
handleSlider();
setIndicator("#ccc");
// set passwordLength
function handleSlider(){
   inputSlider.value=passwordLength;
   lengthDisplay.innerText=passwordLength;
   const min=inputSlider.min;
   const max=inputSlider.max;
   inputSlider.style.backgroundSize=((passwordLength)*100/(max))+"% 100%"; 
}
function setIndicator(color){
  indicator.style.backgroundColor=color;
  indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
  // shadow
}
function getRndInteger(min,max){
  return Math.floor( Math.random()*(max-min))+min;
}
function generateRandomNumber(){
   return getRndInteger(0,9);
}
function generateLowerCase(){
   return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
   return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
   const randNum=getRndInteger(0,symbols.length);
   return symbols.charAt(randNum);
}
function calcStrenght(){
   let hasUpper=false;
   let hasLower=false;
   let hasNum=false;
   let hasSys=false;
   if(uppercasecheck.checked) hasUpper=true;
   if(lowercasecheck.checked) hasLower=true;
   if(numbercheck.checked) hasNum=true;
   if(symbolcheck.checked) hasSys=true;
   if(hasUpper && hasLower && (hasNum || hasSys) && passwordLength>=8){
      setIndicator("#0f0");
   }
   else if(
      (hasLower || hasUpper) && 
      (hasNum || hasSys) &&
      passwordLength>=6
   ){
      setIndicator("#ff0");
   }
   else{
      setIndicator("#f00");
   }
}
 async function copyContent(){
   try{
      await navigator.clipboard.writeText(passwordDisplay.value); 
      copyMsg.innerText="copied";
   }
   catch(e){
    copyMsg.innerText="failed";
   }
   // to mKE COPY WALA SPAN VISIBLE
copyMsg.classList.add("active");
setTimeout(
   ()=>{
      copyMsg.classList.remove("active");
   },2000);
 }
  function shufflepassword(array){
   // fisher yates Method
    for(let i=array.length-1; i>0; i--){
      const j=Math.floor(Math.random()*(i+1));
      const temp=array[i];
      array[i]=array[j];
      array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el))
   return str;
  }
 function handleCheckBoxChange(){
     checkCount=0;
     allCheckBox.forEach((checkbox)=>{
      if(checkbox.checked){
         checkCount++;
      }
     });
    
     if(passwordLength < checkCount){
      passwordLength=checkCount;
      handleSlider();
     }
 }
 allCheckBox.forEach((checkbox) => {
   checkbox.addEventListener('change',handleCheckBoxChange());
 })
 inputSlider.addEventListener('input',(e)=>{
   passwordLength=e.target.value;
   handleSlider();
 });
 
 copyBtn.addEventListener('click',()=>{
   if(passwordDisplay.value)
      copyContent();
 });
 generateBtn.addEventListener('click',()=>{
    // none of the checkbox are selected
   if(checkCount<=0) return;
    if(passwordLength < checkCount){
      passwordLength=checkCount;
      handleSlider();
    }
  // let start the journey to find new password

  // remove old password
  password="";
  // lets put the stuff mentioned by checboxes
  
  //   if(uppercasecheck.checked){
  //    password+=generateUpperCase;
  //   }
  //   if(lowercasecheck.checked){
  //    password+=generateLowerCase;
  //   }
  //   if(numbercheck.checked){
  //    password+=generateRandomNumber;
  //   }
  //   if(symbolcheck.checked){
  //    password+=generateSymbol;
  //   }
    let funcArr = [];
    if(uppercasecheck.checked)
      funcArr.push(generateUpperCase);
    if(lowercasecheck.checked)
      funcArr.push(generateLowerCase);
    if(numbercheck.checked)
      funcArr.push(generateRandomNumber);
    if(symbolcheck.checked)
      funcArr.push(generateSymbol);
   //  console.log(" kaise hai aap log");
    //compulsory addition
    for(let i=0; i<funcArr.length; i++){
      password+=funcArr[i]();
      console.log(funcArr[i]); 
      }

    //remaining addition
    for(let i=0; i<(passwordLength-funcArr.length); i++){
      let len=funcArr.length;
      let randIndex = getRndInteger(0 , len);
      password+=funcArr[randIndex]();
    }
   

    // shuffle the password
    password=shufflepassword(Array.from(password));
    
    // show
    passwordDisplay.value=password;

    // claculate strenght
    calcStrenght();
 });