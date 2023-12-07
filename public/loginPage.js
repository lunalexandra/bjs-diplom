"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  console.log('data', data);

  ApiConnector.login(data, (response) => {
    console.log(response);
    if (response.success) { 
      location.reload();
    } else {
      alert(response.error);
    }
  });
};