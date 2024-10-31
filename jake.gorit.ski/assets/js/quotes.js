const quotes = [
  "From serf to surfer.",
  "I thought what I'd do was, I'd pretend I was one of those deaf-mutes.",
  "Peace comes from within, do not seek it without.",
  "Truth suffers from too much analysis.",
  "All of which makes me anxious. At times, unbearably so.",
];
document.addEventListener("DOMContentLoaded", (event) => {
  let el = document.getElementById("subtitle");
  let i = Math.floor(Math.random() * quotes.length);
  el.innerHTML = quotes[i];
});
