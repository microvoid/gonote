export async function downloadFile(filename: string, content: string) {
  const FileSaver = (await import("file-saver")).default;
  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });

  return FileSaver.saveAs(blob, filename);
}
