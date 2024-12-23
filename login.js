const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', ()=>{
    container.classList.add("active");
});
loginBtn.addEventListener('click', ()=>{
    container.classList.remove("active");
});
function hello(title){
    const alertbox=document.createElement('div');
    alertbox.className='custom-alert';
    alertbox.innerHTML=`<h2>${title}</h2> <button onclick="document.removeChild(this.parentElement)">OK</button>`;
    document.body.appendChild(alertbox);
}
