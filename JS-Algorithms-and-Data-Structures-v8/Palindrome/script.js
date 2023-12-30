const btn = document.getElementById("check-btn");
const result = document.getElementById("result");
const check = () => {
	const text = document.getElementById("text-input").value;
	if (text == "") {
		alert("Please input a value");
	} else {
		const cText = text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
		var firstHalf = cText.slice(0, cText.length / 2);
		if (firstHalf.length == 0) {
			firstHalf = cText;
		}
		var secondHalf = cText.slice(-cText.length / 2);
		secondHalf = secondHalf.split("").reverse().join("");
		console.log(firstHalf);
		console.log(secondHalf);
		if (firstHalf == secondHalf) {
			result.innerHTML = text + " is a palindrome";
		} else {
			result.innerHTML = text + " is not a palindrome";
		}
	}
};
btn.addEventListener("click", () => {
	check();
});
