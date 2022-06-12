export const getConfig = async (key: string): Promise<unknown> =>
  chrome.storage.local.get(key).then((r) => r[key] as unknown);
