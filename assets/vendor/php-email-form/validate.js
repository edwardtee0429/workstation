const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.style.display = "block";
  result.style.backgroundColor = "#f44336"; // default to red
  result.innerHTML = "Please wait...";

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    let json = await response.json();
    if (response.status == 200) {
      result.style.backgroundColor = "#4CAF50"; // change to green
      result.innerHTML = "Email sent successfully!";
    } else {
      result.innerHTML = json.message || "Something went wrong!";
    }
  })
  .catch(error => {
    console.error('Fetch Error:', error);
    result.innerHTML = "Failed to submit form. Please try again later.";
  })
  .finally(() => {
    form.reset();
    setTimeout(() => {
      result.style.display = "none";
    }, 3000);
  });
});
