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
	if (response.success) {
		ratesBoard.clearTable();
		ratesBoard.fillTable(response.data);
	};
}), 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Пополнение прошло успешно');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
}

moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Конвертация прошла успешно');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
}

moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Успешно');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});

favoritesWidget.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Успешно');
		} else {
			favoritesWidget.setMessage(false, response.error);
		}
	})
}

favoritesWidget.removeUserCallback = (data) => {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Успешно');
		} else {
			favoritesWidget.setMessage(false, response.error);
		}
	})
}