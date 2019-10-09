const form = document.querySelector('form')
const searchedAddr = document.querySelector('input')
const message = document.querySelector('#form-div')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    message.innerHTML = `<center><strong><br><br><i class="fa fa-spinner" style="font-size:50px"></i></strong></center>`
    fetch(`http://localhost:3000/weather/?search=${searchedAddr.value}`).then((res)=>{
        res.json().then((data)=>{
            if(data.error) return message.innerHTML=`<br><br><h4 style="text-align:center">ERROR :: ${data.error} :: </h4>`
            // console.log(data)
            message.innerHTML=`<br><br><center><h4> Location :: ${data.Place} </h4><h5>Temparature :: ${data.temperature}</h5><h5>Latitude :: ${data.latitude}</h5><h5>Longitude :: ${data.longitude}</h5><h5>Precipitation Probablity :: ${data.precipProbability}%</h5></center>`
            searchedAddr.value='';
        })
    })
})