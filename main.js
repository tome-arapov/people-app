$(function () {
  const myTimeout = setTimeout(intro, 1000);

  function intro() {
    $(".loading").addClass("d-none");
  }

  $(".add-people").on("click", function (event) {
    $.ajax({
      method: "GET",
      url: "https://random-data-api.com/api/v2/users",
    })
      .done(function (response) {

        localStorage.setItem('userObj', JSON.stringify(response));
        $("#user-info").append(
          `<div class="col-12 pb-4">
            <div class="row align-items-center">
                <div class="col-2">
                    <img src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" class="img rounded-circle img-thumbnail" width="100px" alt="Avatar">
                </div>
                <div class="col-10">
                    <div class="d-flex justify-content-between align-items-center border-bottom p-3">
                        <div class="text-secondary">
                            <p>${response.first_name} ${response.last_name}</p>
                            <p class="mb-0">${response.email}</p>
                        </div>
                        <a href="user-info.html"><i class="fa fa-eye text-secondary fa-2x"></i></a>
                    </div>
                </div>
                </div>
            </div>`
        );
      })
      .fail(function (err) {
        console.log(err);
      });
  });

  let retrievedUserObj = JSON.parse(localStorage.getItem('userObj'));

  $("#basic-info").append(
    `
        <div class="col-8 offset-2 p-4 text-white">
          <div class="d-flex flex-column justify-content-center align-items-center">
            <img src='${retrievedUserObj.avatar}' class='img img-thumbnail rounded-circle mb-3' width='100px'/>
            <p class='h3'>${retrievedUserObj.first_name} ${retrievedUserObj.last_name}</p>
            <p class='text-black-50'>@${retrievedUserObj.username}</p>
          </div>
        </div>
      `
  );

  $("#extra-info").append(`
          <div class='col-8 offset-2'>
            
             
            <p class='mb-0 py-4 border-bottom d-flex justify-content-between align-items-center '><span class='text-secondary'>Username</span> <span class=' font-weight-bold'>${retrievedUserObj.username}</span></p>

            <p class='mb-0 py-4 border-bottom d-flex justify-content-between align-items-center '><span class='text-secondary'>Email</span> <span class=' font-weight-bold'>${retrievedUserObj.email}</span></p>

            <p class='mb-0 py-4 border-bottom d-flex justify-content-between align-items-center '><span class='text-secondary'>Phone</span> <span class=' font-weight-bold'>${retrievedUserObj.phone_number}</span></p>

            <p class='mb-0 py-4 border-bottom d-flex justify-content-between align-items-center '><span class='text-secondary'>Date of birth</span> <span class=' font-weight-bold'>${retrievedUserObj.date_of_birth}</span></p>

            <p class='mb-0 py-4 border-bottom d-flex justify-content-between align-items-center '><span class='text-secondary'>City</span> <span class=' font-weight-bold'>${retrievedUserObj.address.city}</span></p> 

            <p class='mb-0 py-4 border-bottom d-flex justify-content-between align-items-center '><span class='text-secondary'>Address</span> <span class=' font-weight-bold'>${retrievedUserObj.address.street_address}</span></p>

            <p class='mb-0 py-4 border-bottom d-flex justify-content-between align-items-center '><span class='text-secondary'>Zip code</span> <span class=' font-weight-bold'>${retrievedUserObj.address.zip_code}</span></p>

            <p class='mb-0 py-4 border-bottom d-flex justify-content-between align-items-center '><span class='text-secondary'>State</span> <span class=' font-weight-bold'>${retrievedUserObj.address.state}</span></p>
            
          </div>      
      `);
});
