chrome.commands.onCommand.addListener((command) => {
    if (command === "toggle-extension") {
      chrome.storage.local.get(['enabled'], (result) => {
        const currentState = result.enabled !== false; // Default to true if not set
        const newState = !currentState;
        chrome.storage.local.set({enabled: newState}, () => {
          chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]) {
              chrome.tabs.sendMessage(tabs[0].id, {action: "toggleExtension", enabled: newState});
            }
          });
        });
      });
    }
  });