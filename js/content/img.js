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

    // Remove 'width' and 'height' attr which will keep the image to be specify size
    imageElement.removeAttribute("width");
    imageElement.removeAttribute("height");

    // Suppress 'Resized to xx% of original (view original)'
    const resizeNotice = document.querySelector(
        'div[id="image-resize-notice"]'
    );

    // If not found, stop execution without log cuz it's not important (lol)
    if (!resizeNotice) {
        return;
    }

    // Remove 'Resized to xx% of original (view original)' element
    resizeNotice.remove();
}

// Call function to execute
main();
