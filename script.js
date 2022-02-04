const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function tellMe(finalQuote) {
  console.log(finalQuote);
  VoiceRSS.speech({
    key: "86ce1671efa14e68bf501cbe23d92d27",
    src: `${finalQuote}`,
    hl: "en-us",
    v: "John",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}
function toggleBtn() {
  button.disabled = !button.disabled;
}
async function getJokes() {
  let foreword = " once said: ";
  const apiUrl = "https://goquotes-api.herokuapp.com/api/v1/random?count=1";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const quote = data.quotes[0].text;
    const author = data.quotes[0].author;
    const finalQuote = author + foreword + quote;
    tellMe(finalQuote);
    toggleBtn();
  } catch (error) {
    console.log("error occured:", error);
  }
}
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleBtn);
