$( document ).ready(function() {
    // SUBMIT FORM
      $("#dataform").submit(function(event) {
      // Prevent the form from submitting via the browser.
      event.preventDefault();
      ajaxPost();
    });
      
      
      function ajaxPost(){
        
        // PREPARE FORM DATA
        let formData = {
          Link : $("#Link").val(),
          LinkType:$("input[name='LinkType']:checked").val(),
          Department:$("#Department").val(),
          SubjectName:$("#SubjectName").val(),
          Topic:$("#Topic").val(),
          Description:$("#Description").val()
        }
        const api_url="http://localhost:3000/uploadLink";
        // DO POST
        $.ajax({
        type : "POST",
        contentType : "application/json",
        url : api_url,
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(res) {
        //   $("#postResultDiv").html("<p>" + 
        //     "Post Successfully! <br>" +
        //     "--> " + user.firstname + " " + user.lastname + "</p>");
        if(res.status==="Please sign-in to use"){
          console.log("Sigin to use the fearure")
        }
        else if(res.status==="Successfully inserted"){
          console.log("Form is inserted, Add more")
        
        }
        },
        error : function(e) {
          alert("Error!")
          console.log("ERROR: ", e);
        }
      });
        
        // Reset FormData after 
        if($("input[type='checkbox']:checked")){
          resetData(formData);
        // console.log("toggled")
        }
      }
      
      function resetData(data){
        let formdata=data;
        $("#Link").val("");
        $("input[name='LinkType']").val(formdata.LinkType);
        $("#Department").val(formdata.Department);
        $("#SubjectName").val(formdata.SubjectName);
        $("#Topic").val(formdata.Topic);
        $("#Description").val(formdata.Description);
      }
  })
