let interval = null;

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'sync') {
    const { enabled } = await chrome.storage.local.get('enabled');

    if (enabled && !interval) {
      interval = setInterval(async () => {
        const screenshot = await chrome.tabs.captureVisibleTab();
        await fetch('http://localhost:9876', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ screenshot })
        });
      }, 3000);
    } else if (!enabled && interval) {
      clearInterval(interval);
      interval = null;
    }
  }
});
