export const COPY_UNAVAILABLE_MESSAGE =
  "Copy is unavailable in this browser. Use a download, or select the generated brief and copy it manually.";

export async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  // Legacy fallback for browsers that do not expose navigator.clipboard.
  const legacyDocument = document as unknown as { execCommand: (command: string) => boolean };
  const copied = legacyDocument.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard copy failed");
}
