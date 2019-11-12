console.log("Hello from integration 1");
window.onload = function () {
    if(window.location.href.includes('www.amazon.in')){
      var x=document.getElementsByClassName('section techD')[0];
      var a=x.querySelectorAll('tr').length;
      for(var i=0;i<a;i++){
        // console.log(x.querySelectorAll('tr')[i].innerText);
        if(x.querySelectorAll('tr')[i].innerText.includes('Item Weight')){
          var c=document.querySelectorAll('tr')[i].innerText.length;
          console.log(x.querySelectorAll('tr')[i].innerText.substring(12,16));
        }
      }
    }else if(window.location.href.includes('flipkart')){
          var x = document.getElementsByClassName('LM6RPg')[0];
          var length = document.getElementsByClassName('_3YhLQA').length;
          var price = document.getElementsByClassName('_1vC4OE _3qQ9m1')[0].innerHTML;
          var obj = {};
          var x=document.getElementsByClassName('_3_6Uyw row').length
          for(var i=0;i<x;i++){
              if(document.getElementsByClassName('_3_6Uyw row')[i].innerText.includes('RAM') && !document.getElementsByClassName('_3_6Uyw row')[i].innerText.includes('DDR')){
                  if(document.getElementsByClassName('_3YhLQA')[i].innerHTML.substring(0, 1)==1){
                      obj.ram= document.getElementsByClassName('_3YhLQA')[i].innerHTML.substring(0, 2);
                  }else{
                      obj.ram= document.getElementsByClassName('_3YhLQA')[i].innerHTML.substring(0, 1);
                  }
              }
              if(document.getElementsByClassName('_3_6Uyw row')[i].innerText.includes('Operating System')){
                  obj.os = document.getElementsByClassName('_3YhLQA')[i].innerHTML.substring(0, 2).toUpperCase();
              }
              if(document.getElementsByClassName('_3_6Uyw row')[i].innerText.includes('Screen Size')){
                  obj.screen = document.getElementsByClassName('_3YhLQA')[i].innerHTML.substring(10, 14);
              }
              if(document.getElementsByClassName('_3_6Uyw row')[i].innerText.includes('Weight')){
                  obj.weight = document.getElementsByClassName('_3YhLQA')[i].innerHTML.substring(0, 3);            
              }
              if(document.getElementsByClassName('_3_6Uyw row')[i].innerText.includes('International Warranty') || document.getElementsByClassName('_3_6Uyw row')[i].innerText.includes('Domestic Warranty')){
                  obj.war = document.getElementsByClassName('_3YhLQA')[i].innerHTML.substring(0, 1);            
              }
          }
          obj.price = price.substring(1, price.length).replace(',','');
          if(obj.price.includes(',')){
              obj.price = price.substring(1, price.length).replace(/,/g, '');
          }
          console.log(obj);
          var cpus = ['A', 'B', 'C', 'D'];
          var cindex = Math.floor(Math.random() * 4);
          obj.cpu = cpus[cindex];
          var data = {
              text: x.value,
              ram: obj.ram,
              os: obj.os,
              screen: obj.screen,
              price: obj.price,   
              war: obj.war,
              cpu: obj.cpu,
              weight: obj.weight,
              gpu:'P',
              category:'Programmer'
          }
          var x={}
          chrome.runtime.sendMessage({type:"getLaptops",data},function(response){
              console.log(response);
              x=response;
              // console.log(x[i]);
          });
            // Listen for messages from the popup.
        chrome.runtime.onMessage.addListener((msg, sender, response) => {
          // First, validate the message's structure.
          if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
            // Collect the necessary data. 
            // (For your specific requirements `document.querySelectorAll(...)`
            //  should be equivalent to jquery's `$(...)`.)
            // Directly respond to the sender (popup), 
            // through the specified callback.
            response(x);
            // console.log(x[0].model);
            // console.log(x[1].model);
            // console.log("Updated");
          }
        });
    }
  };

