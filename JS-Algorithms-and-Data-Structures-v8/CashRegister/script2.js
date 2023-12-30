const values = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

function checkCashRegister(price, cash, cid) {
	if (price > cash) {
		return "Customer does not have enough money to purchase the item";
	} else if (price == cash) {
		return "No change due - customer paid with exact cash";
	} else {
		var amount = (cash - price).toFixed(2);
		var res = { status: "", change: [] };
		var copy = amount;
		var change = 0;
		var total = 0;
		cid
			.slice()
			.reverse()
			.forEach((c, index) => {
				if (amount - values[index] >= 0 && c[1] - values[index] >= 0) {
					while (amount - values[index] >= 0 && c[1] - values[index] >= 0) {
						c[1] = c[1] - values[index];
						c[1] = parseFloat(c[1]).toFixed(2);
						amount -= values[index];
						change += values[index];
						amount = amount.toFixed(2);
					}
					change = parseFloat(change).toFixed(2);
					res.change.push([c[0], change]);
					total += parseFloat(change);
					change = 0;
				}
			});
		total = total.toFixed(2);
		if (total != copy) {
			res.status = "INSUFFICIENT_FUNDS";
			console.log(2.1);
			return res;
		}
		var empty = true;
		cid.forEach((c) => {
			if (c[1] != 0) {
				empty = false;
			}
		});
		if (empty) {
			res.status = "CLOSED";
		} else {
			res.status = "OPEN";
		}
		return res;
	}
}

const output = checkCashRegister(19.5, 20, [
	["PENNY", 1.01],
	["NICKEL", 2.05],
	["DIME", 3.1],
	["QUARTER", 4.25],
	["ONE", 90],
	["FIVE", 55],
	["TEN", 20],
	["TWENTY", 60],
	["ONE HUNDRED", 100],
]);
console.log(output);
