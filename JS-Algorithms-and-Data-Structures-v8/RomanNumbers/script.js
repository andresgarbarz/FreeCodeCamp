const btn = document.getElementById("convert-btn");
const result = document.getElementById("output");
var res = "";
var f;
const convert = (num) => {
	if (num == "" && f) {
		result.style.backgroundColor = "rgba(255, 0, 0, 0.75)";
		return "Please enter a valid number";
	} else if (num <= 0 && f) {
		result.style.backgroundColor = "rgba(255, 0, 0, 0.75)";
		return "Please enter a number greater than or equal to 1";
	} else if (num >= 4000) {
		result.style.backgroundColor = "rgba(255, 0, 0, 0.75)";
		return "Please enter a number less than or equal to 3999";
	} else {
		f = false;
		if (num >= 1000) {
			return "M" + convert(num - 1000);
		}
		if (num >= 900) {
			return "CM" + convert(num - 900);
		}
		if (num >= 500) {
			return "D" + convert(num - 500);
		}
		if (num >= 400) {
			return "CD" + convert(num - 400);
		}
		if (num >= 100) {
			return "C" + convert(num - 100);
		}
		if (num >= 90) {
			return "XC" + convert(num - 90);
		}
		if (num >= 50) {
			return "L" + convert(num - 50);
		}
		if (num >= 40) {
			return "XL" + convert(num - 40);
		}
		if (num >= 10) {
			return "X" + convert(num - 10);
		}
		if (num >= 9) {
			return "IX" + convert(num - 9);
		}
		if (num >= 5) {
			return "V" + convert(num - 5);
		}
		if (num >= 4) {
			return "IV" + convert(num - 4);
		}
		if (num >= 1) {
			return "I" + convert(num - 1);
		}
		result.style.backgroundColor = "unset";
		return "";
	}
};
btn.addEventListener("click", () => {
	const number = document.getElementById("number").value;
	f = true;
	result.innerHTML = convert(number);
});
