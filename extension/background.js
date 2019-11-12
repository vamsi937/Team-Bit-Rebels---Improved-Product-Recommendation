chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.type == "getLaptops"){
        getLaptops(request, sender, sendResponse)
        return true;
    }
  });
  
  function getLaptops(request, sender, sendResponse){
    const data=request.data;

    const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    };
    var resp = sendResponse;
    fetch('http://localhost:3000/name',options)
    .then(response=>{
        if (response.ok) {
            response.json().then(json => {
            console.log(json);
             resp({laptopList:json.list,cat:json.category})   
        });
        } 
    })
}