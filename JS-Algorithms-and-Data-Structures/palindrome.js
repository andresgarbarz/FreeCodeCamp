function palindrome(str) {
    str = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
          var firstHalf = str.slice(0, str.length / 2);
          if (firstHalf.length == 0) {
              firstHalf = cText;
          }
          var secondHalf = str.slice(-str.length / 2);
          secondHalf = secondHalf.split("").reverse().join("");
          console.log(firstHalf);
          console.log(secondHalf);
          if (firstHalf == secondHalf) {
              return true
          } else {
              return false
          }
  }
  
  palindrome("eye");