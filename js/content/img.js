function main() {
    // 'Resized to xx% of original (view original)' Notice
    const resizeNotice = document.querySelector(
        'div[id="image-resize-notice"]'
    );

    // If notice is not present, most likely because the image does not have an original one
    // or if its has already been loaded
    if (!resizeNotice || resizeNotice.textContent === "Loading original...")
        return;

    // Select img#image / img[id="image"]
    const imageElement = document.querySelector('img[id="image"]');

    // Stop if not found
    if (!imageElement) {
        console.warn("img#image not found");
        return;
    }

    // Get anchor first since setting `textContent` will remove anchor altogether
    const anchor = resizeNotice.lastElementChild;

    // Change 'Resized to xx% of original (view original)' to loading status
    resizeNotice.textContent = "Loading original...";

    let imageUrl = "";
    // If not found, fallback to manual
    if (!anchor) {
        imageUrl = fallbackURL(imageElement);
    } else {
        imageUrl = anchor.getAttribute("href");
    }

    // Changing src to original image URL
    imageElement.src = imageUrl;
    imageElement.onload = () => {
        if (resizeNotice) {
            // Remove "Loading original..." message
            resizeNotice.remove();
        }
    };

    // Sometimes danbooru store original in `png` and sample in `jpg`
    imageElement.onerror = () => {
        let newURL;
        let extension = imageUrl.slice(URL.length - 4);

        switch (extension) {
            case ".jpg":
                newURL = imageUrl.replace(".jpg", ".png");
                break;
            case ".png":
                newURL = imageUrl.replace(".png", ".jpg");
                break;
            default:
                console.log("Found unknown extension: " + extension);
                return;
        }

        imageElement.src = newURL;
    };

    // Remove 'width' and 'height' attr which will keep the image to be specify size
    imageElement.removeAttribute("width");
    imageElement.removeAttribute("height");
}

/**
 *
 * @param {HTMLImageElement} img
 * @returns {string}
 */
function fallbackURL(img) {
    // Replace `sample` with `original` (path)
    // Remove `sample-` from file name
    return img.src.replace("sample-", "").replace("sample", "original");
}

// Call function to execute
main();
