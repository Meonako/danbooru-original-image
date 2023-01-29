function main() {
    // 'Resized to xx% of original (view original)' Notice
    const resizeNotice = document.querySelector(
        'div[id="image-resize-notice"]'
    );

    if (resizeNotice) {
        // Set 'Resized to xx% of original (view original)' to `display: none`
        // Why? Because it is easier to fix if user found it not working
        resizeNotice.style = "display: none;";
    }

    // Select img#image / img[id="image"]
    const imageElement = document.querySelector('img[id="image"]');

    // Stop if not found
    if (!imageElement) {
        console.warn("img#image not found");
        return;
    }

    let imageUrl;

    // If `resizeNotice` is found, grab original img url
    // If not, try changing manually
    if (!resizeNotice) {
        // Change to original size
        imageUrl = Fallback(imageElement);
    } else {
        const anchor = resizeNotice.lastElementChild;

        // If not found anchor, fallback to manual
        if (!anchor) {
            imageUrl = Fallback(imageElement);
        } else {
            imageUrl = anchor.href;
        }
    }

    // Changing src to original image URL
    imageElement.src = imageUrl;

    // Remove 'width' and 'height' attr which will keep the image to be specify size
    imageElement.removeAttribute("width");
    imageElement.removeAttribute("height");
}

function Fallback(img) {
    // Replace `sample` with `original` (parent path)
    // Replace `sample-` with empty string (image file name)
    return img.src.replace("sample", "original").replace("sample-", "");
}

// Call function to execute
main();
