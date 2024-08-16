let overlay = null;
let isHotkeyPressed = false;
let currentElement = null;
let isExtensionEnabled = true;

function getElementAtPoint(x, y) {
    return document.elementFromPoint(x, y);
}

function createOverlay(element) {
    removeOverlay(); // Remove any existing overlay
    const rect = element.getBoundingClientRect();
    overlay = document.createElement('div');
    overlay.className = 'copy-paste-overlay';
    overlay.style.top = `${rect.top + window.scrollY}px`;
    overlay.style.left = `${rect.left + window.scrollX}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
    document.body.appendChild(overlay);
}

function removeOverlay() {
    if (overlay) {
        overlay.remove();
        overlay = null;
    }
}

function getTextContent(element) {
    if (element.nodeType === Node.TEXT_NODE) {
        return element.textContent.trim();
    }
    
    // For block-level elements, return the full text content
    if (window.getComputedStyle(element).display === 'block') {
        return element.textContent.trim();
    }
    
    // For inline elements, try to get the specific word
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    const text = selection.toString().trim();
    selection.removeAllRanges();
    return text;
}

function handleMouseMove(event) {
    if (!isExtensionEnabled || isHotkeyPressed) return;
    
    const element = getElementAtPoint(event.clientX, event.clientY);
    if (!element) {
        removeOverlay();
        currentElement = null;
        return;
    }
    
    if (element !== currentElement) {
        currentElement = element;
        createOverlay(element);
    }
}

function handleContextMenu(e) {
    if (!isExtensionEnabled || isHotkeyPressed || !currentElement) return;
    e.preventDefault();
    
    const text = getTextContent(currentElement);
    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
            overlay.classList.add('copied');
            setTimeout(() => removeOverlay(), 500);
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
            removeOverlay();
        });
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        removeOverlay();
        currentElement = null;
    }
}

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('contextmenu', handleContextMenu);
document.addEventListener('visibilitychange', handleVisibilityChange);

window.addEventListener('blur', removeOverlay);
window.addEventListener('scroll', removeOverlay);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        isHotkeyPressed = true;
        removeOverlay();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') {
        isHotkeyPressed = false;
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleExtension") {
        isExtensionEnabled = request.enabled;
        if (!isExtensionEnabled) {
            removeOverlay();
        }
    }
});

chrome.storage.local.get(['enabled'], (result) => {
    isExtensionEnabled = result.enabled !== false; // Default to true if not set
});