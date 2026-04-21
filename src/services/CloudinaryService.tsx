import type { deleteImageHandlerProps } from "../type/general";

export const handleDeleteImage= async ({
  data,
  deleteImage,
}: deleteImageHandlerProps) => {
  await deleteImage(data); 
};