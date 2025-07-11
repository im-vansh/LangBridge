const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#Translator");
const fromText = document.querySelector("#fromText");
const toText = document.querySelector("#toText");
const icons = document.querySelectorAll("img");

selectTag.forEach((tag, id)=>{
    for (const cc in countries){
        let selected;
        if(id==0 && cc=="en-GB"){
            selected="selected";
        }
        else if(id==1 && cc=="hi-IN"){
            selected="selected";
        }
        let option = ` <option value="${cc}">${countries[cc]}</option>` ;
        tag.insertAdjacentHTML("beforeend",option);

    }
});

translateBtn.addEventListener(("click"), ()=>{
    let Text = fromText.value;
    translateFrom =  selectTag[0].value;
    translateTo = selectTag[1].value;
    let  URL = `https://api.mymemory.translated.net/get?q=${Text}!&langpair=${translateFrom}|${translateTo}`;
    fetch(URL).then(res=> res.json()).then(data=>{
        toText.value = data.responseData.translatedText;
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        const type = target.classList.contains("copy") ? "copy" : "speaker";
        const side = target.dataset.id; // "from" or "to"

        if (type === "copy") {
            if (side === "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (side === "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});
