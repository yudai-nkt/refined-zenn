export const getConfig = async (key: string): Promise<boolean> =>
  chrome.storage.local.get(key).then((r) => r[key]);
