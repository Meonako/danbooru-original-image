function main() {
    // Select img#image / img[id="image"]
    const imageElement = document.querySelector('img[id="image"]');

    // Stop if not found
    if (!imageElement) {
        console.warn("img#image not found");
        return;
    }

    // Change to original size
    imageElement.src = imageElement.src
        .replace("sample", "original")
        .replace("sample-", "");
    imageElement.removeAttribute("width");
    imageElement.removeAttribute("height");

    // Suppress 'Resized to xx% of original (view original)'
    const resizeNotice = document.querySelector('div[id="image-resize-notice"]');

    if (!resizeNotice) {
        return;
    }

    resizeNotice.remove();
}

main();
