import { fallbackCopyToClipboard } from "../helpers";

const copyToClipboard = async (text: string): Promise<void> => {
  try {
    if (!navigator.clipboard) {
      fallbackCopyToClipboard(text);
      return;
    }
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Error copying to clipboard", error);
    fallbackCopyToClipboard(text);
  }
};

export default copyToClipboard;
