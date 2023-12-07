"use strict"
const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(logout => {
    if (logout.success) { 
      location.reload();
    }
  });
}

ApiConnector.current(response => {
  if (response.success) { 
    ProfileWidget.showProfile(response.data);
  }
});

const ratesBoard = new RatesBoard();

setInterval(ApiConnector.getStocks(response => {
  if(response.success){
    ratesBoard.clearTable();
    ratesBoard.fillTable(response.data);
  };
}), 60000);








