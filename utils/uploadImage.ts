export async function uploadImageToApi(
  file: File,
  folder: "restaurants" | "gems"
): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch("/api/upload/image", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.url ?? null;
}

export async function uploadGalleryToApi(
  files: File[],
  folder: "restaurants" | "gems"
): Promise<string[]> {
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  formData.append("folder", folder);

  const res = await fetch("/api/upload/gallery", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.urls ?? [];
}
