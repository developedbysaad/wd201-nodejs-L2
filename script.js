// Validate input Date

let todayDate = new Date(); //2022-07-18
let month = todayDate.getMonth() + 1;
let minYear = todayDate.getUTCFullYear() - 55;
let maxYear = todayDate.getUTCFullYear() - 18;
let tdate = todayDate.getDate();
if(month < 10){
  month = "0" + month
}
if(tdate < 10){
  tdate = "0" + tdate;
}
let minDate = minYear + "-" + month + "-" + tdate;
let maxDate = maxYear + "-" + month + "-" + tdate;
document.getElementById("dob").setAttribute("min", minDate);
document.getElementById("dob").setAttribute("max", maxDate);
console.log(minDate);
console.log(maxDate);
// validate email


const email = document.getElementById("email");

email.addEventListener("input", function(event) {
  if (email.validity.typeMismatch) {
    email.setcustomValidity("This is not a valid email address!");
    email.reportValidity();
  }
  else {
    email.setCustomValidity("");
  }
});



// Function to display with entries

const displayEntries = () => {
  const savedUserEntries = localStorage.getItem("user-entries");
  let entries = "";
  if (savedUserEntries) {
    const parsedUserEntries = JSON.parse(savedUserEntries);
    entries = parsedUserEntries
      .map((entry) => {
        const name = `<td>${entry.name}</td>`;
        const email = `<td>${entry.email}</td>`;
        const password = `<td>${entry.password}</td>`;
        const dob = `<td>${entry.dob}</td>`;
        const acceptTerms = `<td>${entry.acceptTermsAndConditions}</td>`;
        const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
        return row;
      })
      .join("\n");
  }
  var table = `<table border='1' width='100%'><tr>
      <th>Name</th>
      <th>Email</th>
      <th>Password</th>
      <th>dob</th>
      <th>accepted terms?</th>
    </tr>${entries} </table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};



// Save Data and display it in table


const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions =
    document.getElementById("acceptTerms").checked;
  const userDetails = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };
  userEntries.push(userDetails);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  const inputs = document.querySelectorAll('#name, #email, #password, #dob, #acceptTerms');
  inputs.forEach(input => {
    input.value = '';
  });
  displayEntries();
};

let form = document.getElementById("user_form");
form.addEventListener("submit", saveUserForm, true);
displayEntries();

// Retrieve data from local Storage

let userEntries = localStorage.getItem("user-entries");
if (userEntries) {
  userEntries = JSON.parse(userEntries);
} else {
  userEntries = [];
}
