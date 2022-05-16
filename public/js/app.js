const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const value = weatherForm.querySelector('input').value
    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';
    fetch(`/weather?address=${value}`).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                messageOne.textContent =data.error;
            }else{
                
                messageOne.textContent =data.forecast;
                messageTwo.textContent =data.location;
            }
        });
    });
})