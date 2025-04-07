export default async function uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);
  
    const res = await fetch("/api/image-upload", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Upload failed");
    }
  
    const data = await res.json();
    console.log("Uploaded image:", data);
    return data; // { publicId, secureUrl, etc. if you returned more }
  }