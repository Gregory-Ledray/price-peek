/**
 * Utility to safely interact with Chrome Extension APIs
 */
export const isExtension = typeof chrome !== 'undefined' && !!chrome.runtime && !!chrome.runtime.id;

export const openSidePanel = async () => {
  if (isExtension && chrome.sidePanel) {
    // This is a MV3 way to open the side panel
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (tab?.id) {
       await chrome.sidePanel.open({ tabId: tab.id });
    }
  } else {
    console.log('Not in extension context or sidePanel API not available');
  }
};

export const getActiveTab = async () => {
  if (isExtension) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
  }
  return null;
};
