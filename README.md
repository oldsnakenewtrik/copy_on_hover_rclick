# Copy on Hover and Right-Click Chrome Extension

## Overview

This Chrome extension enables an efficient copy-paste functionality, allowing users to quickly copy text by hovering over elements and right-clicking. It's designed to streamline the process of copying text from web pages, making it ideal for research, data collection, or any task requiring frequent text copying.

## Features

- **Hover Highlight**: As you move your mouse over text on a webpage, the extension highlights the text with a yellow overlay.
- **Quick Copy**: Right-click on the highlighted text to instantly copy it to your clipboard. The overlay briefly turns green to confirm the copy action.
- **Paragraph and Word Selection**: The extension intelligently selects either individual words or entire paragraphs based on the hovered element.
- **Toggle Functionality**: Use the keyboard shortcut Ctrl+Shift+Space (Command+Shift+Space on Mac) to quickly enable or disable the extension.
- **Temporary Suspend**: Hold the Shift key to temporarily suspend the extension's functionality, allowing normal right-click operations.

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Navigate to any webpage.
2. Hover your mouse over the text you want to copy. You'll see a yellow highlight appear.
3. Right-click to copy the highlighted text. The highlight will briefly turn green to confirm the copy action.
4. Paste the copied text wherever you need it.

### Keyboard Shortcuts

- **Ctrl+Shift+Space** (Command+Shift+Space on Mac): Toggle the extension on/off.
- **Shift (hold)**: Temporarily suspend the extension to use normal right-click functionality.

## Files

- `manifest.json`: Extension configuration file.
- `background.js`: Handles extension toggling and cross-script communication.
- `content.js`: Contains the main functionality for text selection and copying.
- `styles.css`: Defines the styles for the highlight overlay.

## Contributing

Contributions to improve the extension are welcome. Please feel free to submit pull requests or open issues to suggest improvements or report bugs.
