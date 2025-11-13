export function convertSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    // < 1 MB
    const kb = bytes / 1024;
    return kb.toFixed(2) + " KB";
  } else if (bytes < 1024 * 1024 * 1024) {
    // < 1 GB
    const mb = bytes / 1024 / 1024;
    return mb.toFixed(2) + " MB";
  } else {
    // >= 1 GB
    const gb = bytes / 1024 / 1024 / 1024;
    return gb.toFixed(2) + " GB";
  }
}
