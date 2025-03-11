const checkbox = document.querySelector('#enabled');

(async () => {
  const { enabled } = await chrome.storage.local.get('enabled');

  checkbox.checked = !!enabled;

  checkbox.addEventListener('change', async (e) => {
    const enabled = e.target.checked;

    await chrome.storage.local.set({ enabled });

    await chrome.runtime.sendMessage({ type: 'sync' });
  });
})();
