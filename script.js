let form = document.querySelector(".search__form");
let input = document.querySelector(".search__input");
let userName = document.querySelector(".user");
let login = document.querySelector(".nickname");
let date = document.querySelector(".span__date");
let reposts = document.querySelector(".post__counter");
let followers = document.querySelector(".followers__counter");
let following = document.querySelector(".following__counter");
let avatar = document.querySelector(".avatar__img");
let desktopAvatar = document.querySelector(".desktop.avatar__img");
let blog = document.querySelector(".github__text");
let place = document.querySelector(".location__place");
let noResults = document.querySelector(".error");
let linkPortfolio = document.querySelector(".location__text");
let twitter = document.querySelector(".twitter__text");
let github = document.querySelector(".github__text");
let modeBtn = document.querySelector(".mode__btn");
let output = document.querySelector(".output");
let followersBlock = document.querySelector(".followers__block");
let moon = document.querySelector(".img__moon");
let sun = document.querySelector(".img__sun");
let modeText = document.querySelector(".mode__text");
let searchBtn = document.querySelector(".search__btn");
console.log(sun);

let data = null;
let githubDate;

form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    if (!input.value.toLowerCase()) {
      noResults.classList.remove("none");
      noResults.innerHTML = "No results";
      return;
    }
    searchBtn.setAttribute("disabled", true);
    searchBtn.innerHTML = "Loding...";

    await getData();
    searchBtn.innerHTML = "Search";
    searchBtn.removeAttribute("disabled");
    noResults.innerHTML = "";
    input.value = "";

    githubDate = data.created_at;
    console.log(githubDate);

    userName.innerHTML = data.name;
    login.innerHTML = "@" + data.login;
    followers.innerHTML = data.followers;
    following.innerHTML = data.following;

    console.log(avatar);

    avatar.src = data.avatar_url ? data.avatar_ur : "Not Available";
    desktopAvatar.src = data.avatar_url ? data.avatar_url : "Not Available";
    place.innerHTML = data.location ? data.location : "Not Available";
    reposts.innerHTML = data.public_repos ? data.public_repos : "Not Available";
    linkPortfolio.innerHTML = data.blog ? data.blog : "Not Available";
    twitter.innerHTML = data.twitter_username
      ? data.twitter_username
      : "Not Available";
    github.innerHTML = data.twitter_username
      ? data.twitter_username
      : "Not Available";

    await formatDate();

    date.innerHTML = createDate;
  } catch (error) {
    console.log(error);
    noResults.classList.remove("none");
  }
});

async function getData() {
  let res = await fetch(`https://api.github.com/users/${input.value}`);
  data = await res.json();
  console.log(data);
}

let createDate;
async function formatDate() {
  let githubDate_obj = new Date(githubDate);
  let options = { day: "2-digit", month: "short", year: "numeric" };
  createDate = githubDate_obj.toLocaleDateString("en-GB", options);
}

modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark__mode-bg");
  form.classList.toggle("dark__mode");
  output.classList.toggle("dark__mode");
  followersBlock.classList.toggle("dark__mode-bg");

  let darkModeFontColor = document.querySelectorAll(".text");
  darkModeFontColor.forEach((el) => el.classList.toggle("font__color"));

  modeBtn.style.color = "#90A4D4";
  sun.classList.toggle("none");
  moon.classList.toggle("none");
  if (sun.classList.contains("none")) {
    modeText.textContent = "dark";
    modeText.style.color = "#222731";
  } else if (moon.classList.contains("none")) {
    modeText.textContent = "Ligth";
    modeText.style.color = "#90A4D4";
  }
});
