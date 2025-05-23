const quotes = [
  "From serf to surfer.",
  "I thought what I'd do was, I'd pretend I was one of those deaf-mutes.",
  "Peace comes from within, do not seek it without.",
  "Truth suffers from too much analysis.",
  "All of which makes me anxious. At times, unbearably so.",
  "I was a victim of a series of accidents, as are we all.",
  "I'll kick you apart.",
  "How strange it is to be anything at all.",
  "All you've got are your actions, man.",
  "Did they get you to trade your heroes for ghosts?",
  "Your belief system ain't louder than my sound system.",
];

function updateQuote(i) {
  let el = document.getElementById("subtitle");
  el.innerHTML = quotes[i];
};

document.addEventListener("DOMContentLoaded", (event) => {
  let el = document.getElementById("subtitle");
  let params = new URLSearchParams(window.location.search);
  let i;
  if (params.get("q") !== null) {
    // Use quote index from query.
    i = Math.min(Math.max(Number(params.get("q")), 0), quotes.length - 1);
  } else {
    i = Math.floor(Math.random() * quotes.length);
  }
  window.currQuoteIdx = i;
  updateQuote(i);
  el.addEventListener("click", (event) => {
    // let i = Math.floor(Math.random() * quotes.length);
    window.currQuoteIdx = (window.currQuoteIdx + 1) % quotes.length;
    updateQuote(window.currQuoteIdx);
  });
});

