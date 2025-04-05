
const generateTweetBtn = document.getElementById("generate-tweet");
const postTweetBtn = document.getElementById("post-tweet");
const generateTweetWithImageBtn = document.getElementById("generate-tweet-with-image");
const tweetTopicInput = document.getElementById("tweet-topic-id");
const textContentArea = document.getElementById("text-content");
const loader = document.getElementById("loading");
const disableAllBtn = (...buttons) => {
    buttons.forEach(button => button.disabled = true);
}

const enableAllBtn = (...buttons) => {
    buttons.forEach(button => button.disabled = false);
}

const setVisibility = (visibility, ...HTMLDomElements) => {
    HTMLDomElements.forEach(HTMLDomElement => HTMLDomElement.style.visibility = visibility);
}

function displayLoading() {
    loader.classList.add("display");
}

function hideLoading() {
    loader.classList.remove("display");
}

const generateTweetBtnClickEventHandler = (e) => {
    document.getElementById('tweet-image')?.remove();
    disableAllBtn(generateTweetBtn, generateTweetWithImageBtn, postTweetBtn);
    setVisibility('hidden', postTweetBtn);
    displayLoading();
    const tweetTopic = tweetTopicInput.value;
    fetch(`${window.location.href}generate-tweet?topic=${tweetTopic}`)
        .then((response) => {
            if (response.status != 200) {
                response.json().then((data) => {
                    hideLoading();
                    textContentArea.innerHTML = `${data.error}`;
                    textContentArea.style.color = 'red';
                });
            } else {
                response.json().then((data) => {
                    hideLoading();
                    textContentArea.innerHTML = `${data.tweet}`;
                    textContentArea.style.color = 'black';
                    textContentArea.style.width = '80%';
                    textContentArea.style.display = 'block';
                    textContentArea.style.float = 'none';
                    textContentArea.style.marginLeft = 'auto';
                    textContentArea.style.marginRight = 'auto';
                });
                setVisibility('visible', postTweetBtn);
            }
            enableAllBtn(generateTweetBtn, generateTweetWithImageBtn, postTweetBtn);
        })
        .catch((err) => console.log(err));
};

const generateTweetWithImageBtnClickEventHandler = (e) => {
    document.getElementById('tweet-image')?.remove();
    disableAllBtn(generateTweetBtn, generateTweetWithImageBtn, postTweetBtn);
    setVisibility('hidden', postTweetBtn);
    displayLoading();
    const tweetTopic = tweetTopicInput.value;
    fetch(`${window.location.href}generate-tweet-with-image?topic=${tweetTopic}`)
        .then((response) => {
            if (response.status != 200) {
                response.json().then((data) => {
                    hideLoading();
                    textContentArea.innerHTML = `${data.error}`;
                    textContentArea.style.color = 'red';
                });
            } else {
                response.json().then((data) => {
                    hideLoading();
                    textContentArea.innerHTML = `${data.tweet}`;
                    textContentArea.style.color = 'black';
                    textContentArea.style.width = '48%';
                    textContentArea.style.display = 'flex';
                    textContentArea.style.float = 'left';
                    textContentArea.style.marginLeft = '10px';
                    textContentArea.style.marginRight = '5px';
                    const img = document.createElement("img");
                    img.src = data.imageURL;
                    img.id = 'tweet-image';
                    img.style.width = '48%';
                    img.style.height = '250px';
                    img.style.marginLeft = '15px';
                    img.style.marginRight = '5px';
                    document.getElementById("response").appendChild(img);
                });
                setVisibility('visible', postTweetBtn);
            }
            enableAllBtn(generateTweetBtn, generateTweetWithImageBtn, postTweetBtn);
        })
        .catch((err) => console.log(err));
};


const postTweetBtnClickEventHandler = () => {
    disableAllBtn(generateTweetBtn, generateTweetWithImageBtn, postTweetBtn);
    const summarizedText = textContentArea.value;
    displayLoading();
    const tweetImageURL = document.getElementById('tweet-image')?.src;
    fetch(`${window.location.href}post-tweet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'tweet': summarizedText, 'imageURL': tweetImageURL })
    }).then((response) => {
        if (response.status != 200) {
            response.json().then((data) => {
                hideLoading();
                textContentArea.innerHTML = `${data.error}`;
                textContentArea.style.color = 'red';
            });
        } else {
            response.json().then((data) => {
                hideLoading();
                textContentArea.innerHTML = `${data.message}`;
                textContentArea.style.color = 'black';
            });
            setVisibility('hidden', postTweetBtn);
        }
        enableAllBtn(generateTweetBtn, generateTweetWithImageBtn, postTweetBtn);
    }).catch((err) => console.log(err));
}

generateTweetBtn.addEventListener("click", generateTweetBtnClickEventHandler);
postTweetBtn.addEventListener("click", postTweetBtnClickEventHandler);
generateTweetWithImageBtn.addEventListener("click", generateTweetWithImageBtnClickEventHandler);