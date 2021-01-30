class Http { 

	// Make an HTTP GET Request 
	async get(url) { 

		// Awaiting for fetch response 
		const response = await fetch(url,{
            headers:{
                "Content-Type": "application/json"
            }
        }); 

		// Awaiting for response.json() 
		const resData = await response.json(); 

		// Returning result data 
		return resData; 
	} 

	// Make an HTTP POST Request 
	async post(url, data) { 

		// Awaiting for fetch response and 
        // defining method, headers and body 
		const response = await fetch(url, { 
			method: 'POST', 
			headers: { 
				'Content-type': 'application/json'
			}, 
			body: JSON.stringify(data) 
		}); 

		// Awaiting response.json() 
		const resData = await response.json(); 

		// Returning result data 
		return resData; 
    } 
    
    async ajaxPost(url,data){
        console.log(url);
        const response=await $.ajax({
            type : "POST",
            cache:false,
            contentType : "application/json",
            url : url,
            data : JSON.stringify(data),
            dataType : 'json',
            // success : async function(result) {
                
           
            // // if(res.status==="Please sign-in to use"){
            // //   console.log("Sigin to use the fearure")
            // // }
            // // else if(res.status==="Successfully inserted"){
            // //   console.log("Form is inserted, Add more")
            // // }
            // }
            // error : async function(e) {
            //     const resData=await e
            //     return resData;
            // //   alert("Error!")
            // //   console.log("ERROR: ", e);
            // }
          });  
          const resData=await response;      
          return resData;
    }
} 
