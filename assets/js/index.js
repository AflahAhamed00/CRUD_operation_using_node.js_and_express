$("#add_user").submit(function(event){
    alert("Data inserted successfully");
    })
    
    $('#update_user').submit(function(event) {
        event.preventDefault();
    
        const formData = $(this).serialize();
        const userId = $('#userId').val();
    
        $.ajax({
        
          url: `/api/users/${userId}`,
          type: 'PUT',
          data: formData,
          success: function(response) {
           alert("Data Updated Successfully!")
           window.location.href = 'http://localhost:3000'
          },
          error: function(error) {
            console.log(error)
          }
        });
    });
    

    if(window.location.pathname == `/`){
      $ondelete = $(`.table tbody td a.delete`);
      $ondelete.click(function(){
        let id = $(this).attr(`data-id`)

        let request ={
          "url":`http://localhost:3000/api/users/${id}`,
          "method":"DELETE"
        }

        if(confirm(`Do you want to delete this record`)){
          $.ajax(request).done(function(response){
            alert("Data Deleted Successfully")
            location.reload()
          })
        }

      })

    }