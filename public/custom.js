window.addEventListener("DOMContentLoaded", () => {
  const login = document.querySelector(
    "#app > section > section > form > div.adminjs_Text"
  );

  if (login) {
    const div = document.createElement("div");
    div.innerHTML = `
          <span> don't have an Account? </span> <a style="font-weight: bold;"href="/register">Register Now</a>
      `;
    login.append(div);
  }
});
