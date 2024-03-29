const form = document.querySelector('form')
const searchedAddr = document.querySelector('input')
const message = document.querySelector('#form-div')

let loading = `<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>`

form.addEventListener('submit',(e)=>{
    e.preventDefault() //No refreshing after submit form
    message.innerHTML = `<center><strong><br><br><i class="fa fa-spinner" style="font-size:50px"></i></strong></center>`

    fetch(`/weather/?search=${searchedAddr.value}`).then((res)=>{
        res.json().then((data)=>{
            if(data.error) return message.innerHTML=`<div id="error" class="alert alert-warning" role="alert">ERROR :: ${data.error} :: </div>`
            // console.log(data)
            message.innerHTML=`<div id="forecast"><p><label>Location</label> :: ${data.Place} </p><p><label>Temparature</label> :: ${data.temperature}</p><p><label>Latitude</label> :: ${data.latitude}</p><p><label>Longitude</label> :: ${data.longitude}</p><p><label>Precipitation Probablity</label> :: ${data.precipProbability}%</p></div>`
            searchedAddr.value='';
        }).catch((err)=>{
            message.innerHTML=`<br><br><h4 style="text-align:center">ERROR :: ${err} :: </h4>`
        })
    })
})
