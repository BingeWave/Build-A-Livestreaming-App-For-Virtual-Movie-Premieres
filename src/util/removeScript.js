export const removeScript = (scriptToremove) => {
    
    let matches = document.getElementsByTagName("script");

    for (let i = matches.length; i >= 0; i--) {
        if (matches[i] && matches[i].getAttribute("src") !== null
            && matches[i].getAttribute("src").indexOf(`${scriptToremove}`) !== -1) {
            matches[i].parentNode.removeChild(matches[i])
        }
    }
}