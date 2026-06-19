// src/pages/temp/UploadAvatars.tsx — DELETE after running once
import { uploadImage } from "../component/UploadImage";

import evelynIcon from "../assets/assistant/voice/dp.png";
import michealIcon from "../assets/assistant/voice/Mask group (22).png";
import williamIcon from "../assets/assistant/voice/Mask group (23).png";
import mannyIcon from "../assets/assistant/voice/dp (1).png";
import liamIcon from "../assets/assistant/voice/Mask group (24).png";
import sandraIcon from "../assets/assistant/voice/Mask group (25).png";

const AVATARS = [
  { name: "evelyn", src: evelynIcon },
  { name: "micheal", src: michealIcon },
  { name: "william", src: williamIcon },
  { name: "manny", src: mannyIcon },
  { name: "liam", src: liamIcon },
  { name: "sandra", src: sandraIcon },
];

// Converts a bundled asset URL (e.g. /assets/dp-a1b2c3.png) into a File object
const urlToFile = async (url: string, filename: string): Promise<File> => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
};

const UploadAvatars = () => {
  const handleUploadAll = async () => {
    for (const avatar of AVATARS) {
      const file = await urlToFile(avatar.src, `${avatar.name}.png`);
      const result = await uploadImage(file);
      console.log(avatar.name, "→", result.secure_url);
    }
    console.log("Done. Copy the URLs above into AVATARS in AssistantVoice.tsx");
  };

  return <button onClick={handleUploadAll}>Upload All Avatars</button>;
};

export default UploadAvatars;