var bookMarkInput = document.getElementById("bookMark");
var websiteUrlInput = document.getElementById("websiteUrl");
var searchInput = document.getElementById("search");

var storeBookMark ;
//handle display Date when refresh or close browser
if(localStorage.getItem("Info") == null){
    storeBookMark = [];
}
else{
    storeBookMark = JSON.parse(localStorage.getItem("Info"));
    displayBookMark();
}
// store BookMark object in array
function addBookMark(){

    if(bookMarkInput.value == "" && websiteUrlInput.value == "" ){
        showAlert();
        showAlert1();
    }
    else if (bookMarkInput.value == "") {
        showAlert();
    } 
    else if (websiteUrlInput.value == "") {
        showAlert1();
    } 
    else{
        hiddenAlert();
        var bookMarkInfo = {
            bookMark : bookMarkInput.value,
            websiteUrl : websiteUrlInput.value,
        }
        // console.log(bookMarkInfo);
        storeBookMark.push(bookMarkInfo);
        // console.log(storeBookMark);
        localStorage.setItem("Info",JSON.stringify(storeBookMark))
        displayBookMark();
        clearInputs();
    }
   
}
//Display BookMark
function displayBookMark(){
   var display = '';
   for(var i = 0 ; i < storeBookMark.length ;i++){
       display+=`
       <div class="row item">
       <div class="col-4"><h3>${storeBookMark[i].bookMark}</h3></div>
       <div class="col-8">
       <a class="btn btn-primary" href="${storeBookMark[i].websiteUrl}" target="_blank">Visit</a>
       <button class="btn btn-warning text-white" onclick="retriveBookMark(${i})">Update</button>
       <button class="btn btn-danger" onclick="deleteBookMark(${i})">Delete</button>
       </div>
       </div>
       `
   }
   document.getElementById("results").innerHTML = display;

}
//Clear Inputs after Display
function clearInputs(){
    bookMarkInput.value = "";
    websiteUrlInput.value = "";
}
//Delete BookMark
function deleteBookMark(index){
    storeBookMark.splice(index,1);
    localStorage.setItem("Info" , JSON.stringify(storeBookMark));
    displayBookMark();
}
//retrive BookMark
function retriveBookMark(index){
    bookMarkInput.value =storeBookMark[index].bookMark;
    websiteUrlInput.value =storeBookMark[index].websiteUrl;

    document.getElementById("btn").innerHTML = `<button class="btn btn-warning text-white mt-4" onclick="updateBookMark(${index})">Update BookMark</button>`

}
// ShowAlert for validation
function showAlert(){
    document.getElementById("message").innerHTML =`
    <div class="alert alert-danger" role="alert">
       The Field is required
  </div>`;
}
function showAlert1(){
    document.getElementById("message1").innerHTML =`
    <div class="alert alert-danger" role="alert">
       The Field is required
  </div>`;
}
//Hidden Alert
function hiddenAlert(){
    document.getElementById("message").innerHTML ="";
    document.getElementById("message1").innerHTML ="";
}
//update BookMark
function updateBookMark(index){
    storeBookMark[index].bookMark = bookMarkInput.value;
    storeBookMark[index].websiteUrl = websiteUrlInput.value;
    localStorage.setItem("Info" , JSON.stringify(storeBookMark));
    displayBookMark();
    document.getElementById("btn").innerHTML = `<button class="btn btn-primary mt-4" onclick="addBookMark()">Submit</button>`;
    clearInputs();
}


// Search about BookMark
function searchBookMark(userword){
   var display = '';
   for(var i = 0 ; i < storeBookMark.length; i++){
    if(storeBookMark[i].bookMark.toLowerCase().includes(userword.toLowerCase())){
        
        display+=`
       <div class="row item">
       <div class="col-4"><h3>${storeBookMark[i].bookMark}</h3></div>
       <div class="col-8">
       <a class="btn btn-primary" href="${storeBookMark[i].websiteUrl}" target="_blank">Visit</a>
       <button class="btn btn-warning text-white" onclick="retriveBookMark(${i})">Update</button>
       <button class="btn btn-danger" onclick="deleteBookMark(${i})">Delete</button>
       </div>
       </div>
       `

    }
   }
   document.getElementById("results").innerHTML = display;
}