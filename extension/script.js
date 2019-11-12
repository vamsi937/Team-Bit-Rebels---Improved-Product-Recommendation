  // Once the DOM is ready...
  window.addEventListener('DOMContentLoaded', () => {
    // ...query for the active tab...
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
          tabs[0].id,
          {from: 'popup', subject: 'DOMInfo'},
          // ...also specifying a callback to be called 
          //    from the receiving end (content script).
          setLaptops);
    });
  });

  // Update the relevant fields with the new data.
const setLaptops = info => {
    var length=info.laptopList.length;
    var cat=info.cat;
    // console.log(info);
    // for(var i=0;i<length;i++){
    //   document.getElementsByClassName('rec_laptops')[0].innerHTML+=info[i].model;
    // }
    document.getElementById('user_category').innerText=`It seems that you are a `+cat+'. ';
    var x=[];
    for(var i=0;i<length;i++){
      x.push(info.laptopList[i].category);
    }
    
    for(var i=0;i<length;i++){
      // rec_laptops
      var x=`<div class="col-lg-2 col-md-2 col-sm-2"><div class="card">
  <img class="card-img-top" src="`+info.laptopList[i].image+`" alt="Card image" style="width:100px;height:auto;">
  <div class="card-body">
    <h4 class="card-title">`+info.laptopList[i].model+`</h4>
    <p class="card-text">`+info.laptopList[i].category+`</p>
    <a href="`+info.laptopList[i].url+`" class="btn btn-primary">View More</a>
  </div>
</div>
</div>`;
        document.getElementsByClassName('rec_laptops')[0].innerHTML+=x;
  }  
  if(x.includes(cat)){
    document.getElementById('user_category').innerText+=`Laptop of your category exists.`;
    var a=[];
    var b=[];
    for(var i=0;i<length;i++){
      if(info.laptopList[i].category==cat){
        a.push(i);
      }else{
        b.push(i);
      }  
    }
    document.getElementsByClassName('rec_laptops')[0].innerHTML='';
    document.getElementById('user_category').innerText+=`These are the laptops of your c`;
    a.forEach((a)=>{
      var x=`<div class="col-lg-2 col-md-2 col-sm-2"><div class="card">
      <img class="card-img-top" src="`+info.laptopList[a].image+`" alt="Card image" style="width:100px;height:auto;">
      <div class="card-body">
        <h4 class="card-title">`+info.laptopList[a].model+`</h4>
        <p class="card-text">`+info.laptopList[a].category+`</p>
        <a href="`+info.laptopList[a].url+`" class="btn btn-primary">View More</a>
      </div>
    </div>
    </div>`;
            document.getElementsByClassName('rec_laptops')[0].innerHTML+=x;
    })
    document.getElementsByClassName('rec_laptops')[0].innerHTML+='<br><p>You may also look at some similar laptops.</p>';
    b.forEach((b)=>{
      var x=`<div class="col-lg-2 col-md-2 col-sm-2"><div class="card">
      <img class="card-img-top" src="`+info.laptopList[b].image+`" alt="Card image" style="width:100px;height:auto;">
      <div class="card-body">
        <h4 class="card-title">`+info.laptopList[b].model+`</h4>
        <p class="card-text">`+info.laptopList[b].category+`</p>
        <a href="`+info.laptopList[b].url+`" class="btn btn-primary">View More</a>
      </div>
    </div>
    </div>`;
            document.getElementsByClassName('rec_laptops')[0].innerHTML+=x;
    })
  }else{
    document.getElementById('user_category').innerText+=`Laptop of your category doesn't exist.But you may have a look at the other recommendations.`;      
  }
};
  

