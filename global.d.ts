export {};

declare global {
  interface Window {
    /**
     * The single chat entry point. The GHL chat widget will later be injected
     * and override this to open the real widget — so there is ONE chat trigger
     * (the bottom-bar Chatt icon), not GHL's floating bubble AND this icon.
     */
    openByggmediaChat?: () => void;
  }
}
