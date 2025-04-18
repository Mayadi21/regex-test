const form = document.getElementById("formRegex");
const fields = ["email", "username", "nim", "nama", "telepon", "password"];

const regexRules = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  username: /^[a-z0-9_-]{8,}$/,
  nim: /^[0-9]{9}$/,
  nama: /^[a-zA-Z., ]+$/,
  telepon: /^[0-9]{10,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/
};

const errorMessages = {
  email: "Format email tidak valid.",
  username: "Username harus huruf kecil semua dan minimal 8 karakter.",
  nim: "NIM harus terdiri dari 9 angka.",
  nama: "Nama hanya boleh huruf dan spasi.",
  telepon: "Nomor telepon harus minimal 10 angka.",
  password: "Password minimal 8 karakter, mengandung huruf besar, huruf kecil, dan simbol."
};

// Realtime validation
fields.forEach(field => {
  const input = document.getElementById(field);
  const error = document.getElementById(field + "Error");

  input.addEventListener("input", () => {
    if (!regexRules[field].test(input.value)) {
      error.textContent = errorMessages[field];
      error.classList.remove("hidden");
    } else {
      error.classList.add("hidden");
    }
  });
});

// Submit handler
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const values = {};
  let allValid = true;

  fields.forEach(field => {
    const input = document.getElementById(field);
    const error = document.getElementById(field + "Error");
    values[field] = input.value;

    if (!regexRules[field].test(input.value)) {
      error.textContent = errorMessages[field];
      error.classList.remove("hidden");
      allValid = false;
    } else {
      error.classList.add("hidden");
    }
  });

  if (!allValid) return;

  Swal.fire({
    title: "Data Tervalidasi!",
    html: `
      <p><strong>Email:</strong> ${values.email}</p>
      <p><strong>Username:</strong> ${values.username}</p>
      <p><strong>NIM:</strong> ${values.nim}</p>
      <p><strong>Nama:</strong> ${values.nama}</p>
      <p><strong>Nomor Telepon:</strong> ${values.telepon}</p>
      <p><strong>Password:</strong> ${values.password}</p>
    `,
    icon: "success"
  });
});

// Toggle password visibility
document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  this.textContent = isPassword ? "🙈" : "👁️";
});
