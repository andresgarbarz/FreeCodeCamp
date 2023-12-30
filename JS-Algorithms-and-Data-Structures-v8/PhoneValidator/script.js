const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

const regex = /^1?\s?(\([0-9]{3}\)|[0-9]{3})[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/;
const result = document.getElementById("results-div");

const validate = (number) => {
	if (number == "") {
		alert("Please provide a phone number");
		return "";
	}
	var valid = regex.test(number);
	if (valid) {
		result.innerHTML = "Valid US number: " + number;
	} else {
		result.innerHTML = "Invalid US number: " + number;
	}
};

checkBtn.addEventListener("click", () => {
	const number = document.getElementById("user-input").value;
	validate(number);
});
clearBtn.addEventListener("click", () => {
	result.innerHTML = "";
	document.getElementById("user-input").value = "";
});
