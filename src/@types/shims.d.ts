declare module "use-chrome-storage" {
  /**
   * Hook which will use `chrome.storage.local` to persist state.
   *
   * @param key - they key name in chrome's storage. Nested keys not supported
   * @param initialValue - default value to use
   * @returns a 4-element tuple containing
   *   - stateful `value`,
   *   - function to update this `value`,
   *   - `isPersistent` - will be `false` if error occurred during reading/writing chrome.storage,
   *   - `error` - will contain error appeared in storage. if isPersistent is true will be empty string
   */
  export function useChromeStorageLocal<T>(
    key: string,
    initialValue?: T | (() => T)
  ): [T, (value: T | ((prev: T) => T)) => void, boolean, string];
}
