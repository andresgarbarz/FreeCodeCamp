const alphabet = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];
function rot13(str) {
	let res = "";
	for (let i = 0; i < str.length; i++) {
		if (str[i] == " ") {
			res += " ";
		} else {
			let index = alphabet.indexOf(str[i]);
			if (index < 13) {
				res += alphabet[index + 13];
			} else {
				res += alphabet[index - 13];
			}
		}
	}
	return res;
}

rot13("SERR PBQR PNZC");
