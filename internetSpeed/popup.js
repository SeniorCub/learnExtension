document.addEventListener('DOMContentLoaded', () => {
     const connectionSpan = document.getElementById('connection');
     const downloadSpan = document.getElementById('download');
     const uploadSpan = document.getElementById('upload');
     const testButton = document.getElementById('test-speed');
     const uploadSpeed = document.getElementById('upload-speed');
   
     // Check connectivity
     connectionSpan.textContent = navigator.onLine ? "Online" : "Offline";
   
     // Add speed test logic
     testButton.addEventListener('click', async () => {
       connectionSpan.textContent = "Testing...";
       const speeds = await testInternetSpeed();
       connectionSpan.textContent = navigator.onLine ? "Online" : "Offline";
   
       // Display individual download and upload speeds
       downloadSpan.textContent = speeds.download.toFixed(2);
       uploadSpan.textContent = speeds.upload.toFixed(2);
   
       // Calculate the average speed
       const averageSpeed = (speeds.download * 2 + speeds.upload) / 2;
       uploadSpeed.textContent = averageSpeed.toFixed(2);
   
       // Optional: Display a message for slow upload speed
       if (speeds.upload < 20) {
         connectionSpan.textContent += " (Upload speed is too slow)";
       } else {
         connectionSpan.textContent += " (Upload speed is good)";
       }
     });
   
     async function testInternetSpeed() {
       const startTime = new Date().getTime();
       const downloadUrl = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png"; // A lightweight file for testing download
       const uploadData = new Blob([new ArrayBuffer(2 * 1024 * 1024)]); // 2MB data for upload test
   
       // Download Speed
       await fetch(downloadUrl);
       const downloadTime = new Date().getTime() - startTime;
   
       // Upload Speed
       const uploadStart = new Date().getTime();
       await fetch("https://httpbin.org/post", { method: "POST", body: uploadData });
       const uploadTime = new Date().getTime() - uploadStart;
   
       return {
         download: 10 / (downloadTime / 1000), // Mbps
         upload: 2 / (uploadTime / 1000), // Mbps
       };
     }
   });
   // Selecting all required elements
const wrapper = document.querySelector(".wrapper"),
toast = wrapper.querySelector(".toast"),
title = toast.querySelector("span"),
subTitle = toast.querySelector("p"),
wifiIcon = toast.querySelector(".icon"),
closeIcon = toast.querySelector(".close-icon");

window.onload = ()=>{
    function ajax(){
        let xhr = new XMLHttpRequest(); //creating new XML object
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true); //sending get request on this URL
        xhr.onload = ()=>{ //once ajax loaded
            //if ajax status is equal to 200 or less than 300 that mean user is getting data from that provided url
            //or his/her response status is 200 that means he/she is online
            if(xhr.status == 200 && xhr.status < 300){
                toast.classList.remove("offline");
                title.innerText = "You're online now";
                subTitle.innerText = "Hurray! Internet is connected.";
                wifiIcon.innerHTML = '<i class="fa fa-wifi"></i>';
                closeIcon.onclick = ()=>{ //hide toast notification on close icon click
                    wrapper.classList.add("hide");
                }
                setTimeout(()=>{ //hide the toast notification automatically after 5 seconds
                    wrapper.classList.add("hide");
                }, 5000);
            }else{
                offline(); //calling offline function if ajax status is not equal to 200 or not less that 300
            }
        }
        xhr.onerror = ()=>{
            offline(); ////calling offline function if the passed url is not correct or returning 404 or other error
        }
        xhr.send(); //sending get request to the passed url
    }

    function offline(){ //function for offline
        wrapper.classList.remove("hide");
        toast.classList.add("offline");
        title.innerText = "You're offline now";
        subTitle.innerText = "Opps! Internet is disconnected.";
        wifiIcon.innerHTML = '<i class="fa fa-wifi-slash"></i>';
    }

    setInterval(()=>{ //this setInterval function call ajax frequently after 100ms
        ajax();
    }, 100);
}