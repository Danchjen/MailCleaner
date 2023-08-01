"use strict";

const unsortedBox = document.getElementById("unsorted-box");
const invalidBox = document.getElementById("invalid-box");
const validBox = document.getElementById("valid-box");
const sortedBox = document.getElementById("sorted-box");
const filterBtn = document.querySelector(".filter");
const copyBtn = document.querySelector(".copy");

function sortBase() {
  const invalidValArr = invalidBox.value.split("\n");
  const validMailArr = validBox.value.split("\n");
  const invalArr = unsortedBox.value.split("\n");
  const sortedArr = invalArr
    .filter((e) => !invalidValArr.some((x) => e.includes(x)))
    .filter((e) => validMailArr.some((x) => e.includes(x)));
  console.log(sortedArr);
  sortedArr.forEach((e) => {
    console.log(e);
    e.replace(" ", "\n");
    console.log(e);
  });
  sortedBox.textContent = sortedArr.join("\n======\n");
}

function copy() {
  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = sortedBox.value;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextarea);
}

function setLocalStorage() {
  localStorage.setItem("invalVal", invalidBox.value);
  localStorage.setItem("valMails", validBox.value);
}

function getLocalStorage() {
  const invalVal = localStorage.getItem("invalVal");
  if (invalVal) {
    invalidBox.textContent = invalVal;
  } else {
    invalidBox.textContent = "Тут ничего нет:(";
  }
  const validMails = localStorage.getItem("valMails");
  if (validMails) {
    validBox.textContent = validMails;
  } else {
    validBox.textContent = "Тут ничего нет:(";
  }
}

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);
filterBtn.addEventListener("click", sortBase);
copyBtn.addEventListener("click", copy);
