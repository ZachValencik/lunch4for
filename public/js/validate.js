
function validate(){
    let password = document.getElementById('password').value
    let passwordTwo = document.getElementById('passwordRetype').value
    alert("ITS connected")
    if (password !== passwordTwo){
        alert("passwords must match")
        return false
    }else{
        alert("Its a match")
        return true
    }
    
}