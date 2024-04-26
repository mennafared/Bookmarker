var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var warningBox = document.querySelector(".box-info");
var closeBtn = document.getElementById("closeBtn");


var bookmarksList = [];

if (localStorage.getItem("bookmark") != null) {
  bookmarksList = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmark();
}


function addBookmark() {
  if (isValidBookmark(nameRegex, bookmarkNameInput) && isValidBookmark(urlRegex, bookmarkURLInput)) {
    var bookmarks = {
      bookmarkName: capitalizeFirstLetter(bookmarkNameInput.value),
      bookmarkURL: bookmarkURLInput.value
    }

    bookmarksList.push(bookmarks);
    localStorage.setItem("bookmark", JSON.stringify(bookmarksList));
    console.log(bookmarksList);
    resetBookmark();
    displayBookmark();
  }
  else {
    warningBox.classList.remove("d-none")
  }

}

function displayBookmark() {
  tableContentElement = ``;
  for (var i = 0; i < bookmarksList.length; i++) {
    tableContentElement += `
    <tr>
    <td>${i + 1}</td>
    <td>${bookmarksList[i].bookmarkName}</td>              
    <td>
      <a href="http://${bookmarksList[i].bookmarkURL}" class="btn btn-visit text-decoration-none" target="_blank">
          <i class="fa-solid fa-eye pe-2"></i>Visit
      </a>
    </td>
    <td>
      <button onclick="deleteBookmark(${i})" class="btn btn-delete pe-2" >
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
    </td>
</tr>`

  }
  tableContent.innerHTML = tableContentElement;
}

function resetBookmark() {
  bookmarkNameInput.value = null;
  bookmarkURLInput.value = null;
}

function deleteBookmark(deletedIndex) {
  bookmarksList.splice(deletedIndex, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookmarksList));
  displayBookmark();
}

// e3mleha tany
function visitWebsite(visitIndex) {
  open(`http://${bookmarksList[visitIndex].bookmarkURL}`);
}

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
function isValidBookmark(regex, bookmarksElement) {
  if (regex.test(bookmarksElement.value)) {
    bookmarksElement.classList.add("is-valid");
    bookmarksElement.classList.remove("is-invalid");
    return true;
  }
  else {
    bookmarksElement.classList.add("is-invalid");
    bookmarksElement.classList.remove("is-valid");
    return false;
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function closeBox() {
  warningBox.classList.add("d-none");
}

closeBtn.addEventListener("click", closeBox);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeBox();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeBox();
  }
});
