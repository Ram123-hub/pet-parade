import cloudinary from "../cloudinaryconfig/cloudinary";

export const uploadImage = async (file: File, folder: string) => {
  //Convert file to buffer
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
          upload_preset: "next_cloudinary",
        },
        async(err, result) => {
          if (err) {
            return reject(err.message);
          }
          console.log("upload result", result);
          return resolve(result);
        }
      )
      .end(bytes);
  });
};



