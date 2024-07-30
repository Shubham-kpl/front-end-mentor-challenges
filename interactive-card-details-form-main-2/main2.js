"use strict";
const cust_name = document.querySelector("input[name=NAME]");
const number = document.querySelector("input[name=CARDno]");
const month = document.querySelector("input[name=MM]");
const year = document.querySelector("input[name=YY]");
const cv = document.querySelector("input[name=CVC]");
const btn = document.querySelector("button");
const inputs = document.querySelectorAll("input");
const form = document.querySelector("form");
const modal = document.querySelector(".modal");
const close = document.querySelector("button.close");
const mnth_empty = document.querySelector(".mnth_empty");
const mnth_invalid = document.querySelector(".mnth_invalid");
const mnth_wrong = document.querySelector(".mnth_wrong");

let c = 0;
const checkName = function (inp) {
  if (inp.value === "") {
    inp.classList.add("red");
    inp.nextElementSibling.classList.add("empty");
    inp.nextElementSibling.nextElementSibling.classList.remove("invalid");
  } else if (inp.value !== "" && inp.value.match(/^[0-9]+$/) !== null) {
    inp.classList.add("red");
    inp.nextElementSibling.classList.remove("empty");
    inp.nextElementSibling.nextElementSibling.classList.add("invalid");
  } else {
    inp.classList.remove("red");
    inp.nextElementSibling.classList.remove("empty");
    inp.nextElementSibling.nextElementSibling.classList.remove("invalid");
  }
};
const checkNumber = function (inp) {
  if (inp.value === "") {
    inp.classList.add("red");
    inp.nextElementSibling.classList.add("empty");
    inp.nextElementSibling.nextElementSibling.classList.remove("invalid");
  } else if (inp.value !== "" && inp.value.match(/^[0-9]+$/) === null) {
    inp.classList.add("red");
    inp.nextElementSibling.classList.remove("empty");
    inp.nextElementSibling.nextElementSibling.classList.add("invalid");
  } else {
    inp.classList.remove("red");
    inp.nextElementSibling.classList.remove("empty");
    inp.nextElementSibling.nextElementSibling.classList.remove("invalid");
  }
};
const checkYear = function (inp) {
  if (inp.value === "") {
    inp.classList.add("red");
    if (!mnth_empty.classList.contains("empty")) {
      btn.previousElementSibling.previousElementSibling.classList.add("empty");
      btn.previousElementSibling.classList.remove("invalid");
    }
  } else if (inp.value !== "" && inp.value.match(/^[0-9]+$/) === null) {
    inp.classList.add("red");
    if (!mnth_invalid.classList.contains("invalid")) {
      btn.previousElementSibling.previousElementSibling.classList.remove(
        "empty"
      );
      btn.previousElementSibling.classList.add("invalid");
    }
  } else {
    inp.classList.remove("red");
    btn.previousElementSibling.previousElementSibling.classList.remove("empty");
    btn.previousElementSibling.classList.remove("invalid");
  }
};
const checkMonth = function (inp) {
  if (inp.value === "") {
    inp.classList.add("red");
    mnth_empty.classList.add("empty");
    mnth_invalid.classList.remove("invalid");
    mnth_wrong.classList.remove("wrong");
  } else if (inp.value != "" && inp.value.match(/^[0-9]+$/) === null) {
    inp.classList.add("red");
    mnth_empty.classList.remove("empty");
    mnth_invalid.classList.add("invalid");
    mnth_wrong.classList.remove("wrong");
  } else if (inp.value <= 0 || inp.value > 12) {
    inp.classList.add("red");
    mnth_empty.classList.remove("empty");
    mnth_invalid.classList.remove("invalid");
    mnth_wrong.classList.add("wrong");
  } else {
    inp.classList.remove("red");
    mnth_empty.classList.remove("empty");
    mnth_invalid.classList.remove("invalid");
    mnth_wrong.classList.remove("wrong");
  }
};
const clear = function (inputs) {
  inputs.forEach((inp) => {
    inp.value = "";
  });
  document.querySelector(".name").textContent = "Jane Appleseed";
  document.querySelector(".card_no").textContent = "0000 0000 0000 0000";
  document.querySelector(".mm").textContent = "00 ";
  document.querySelector(".yy").textContent = "/ 00";
  document.querySelector(".cv").textContent = "000";
};
cust_name.addEventListener("input", function (e) {
  document.querySelector(".name").textContent = e.target.value;
});
number.addEventListener("input", function (e) {
  let formattedNumber = e.target.value.toString().replace(/\d{4}(?=.)/g, "$& ");
  document.querySelector(".card_no").textContent = formattedNumber;
});
month.addEventListener("input", function (e) {
  let formattedMonth = ("0" + e.target.value).slice(-2);
  document.querySelector(".mm").textContent = formattedMonth;
});
year.addEventListener("input", function (e) {
  let formattedYear = ("0" + e.target.value).slice(-2);
  document.querySelector(".yy").textContent = "/ " + formattedYear;
});
cv.addEventListener("input", function (e) {
  document.querySelector(".cv").textContent = e.target.value;
});

form.addEventListener("submit", function (e) {
  c = 0;
  e.preventDefault();
  inputs.forEach((input) => {
    if (input === cust_name) checkName(input);
    else if (input === number || input === cv) checkNumber(input);
    else if (input === year) checkYear(input);
    else if (input === month) checkMonth(input);
    if (
      !input.nextElementSibling.classList.contains("empty") &&
      !input.nextElementSibling.nextElementSibling.classList.contains(
        "invalid"
      ) &&
      !btn.previousElementSibling.previousElementSibling.classList.contains(
        "empty"
      ) &&
      !btn.previousElementSibling.classList.contains("invalid") &&
      !mnth_empty.classList.contains("empty") &&
      !mnth_invalid.classList.contains("invalid") &&
      !mnth_wrong.classList.contains("wrong")
    ) {
      c += 1;
    }
  });
  if (c == 5) {
    modal.style.display = "block";
    form.style.display = "none";
  }
});
close.addEventListener("click", function () {
  modal.style.display = "none";
  form.style.display = "block";
  clear(inputs);
});
