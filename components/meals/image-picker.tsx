"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import classes from "./image-picker.module.css";

type ImagePickerProps = {
  label: string;
  name: string;
};

const ImagePicker: React.FC<ImagePickerProps> = ({ label, name }) => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const handlePickClick = () => {
    imageInput && imageInput.current && imageInput.current.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target && event.target.files && event.target.files[0];

    if (!file || file.size > 2097152) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      fileReader.result && setPickedImage(`${fileReader.result}`);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.wrapper}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <div className={classes.controls}>
          <button
            className={classes.button}
            type="button"
            onClick={handlePickClick}
          >
            Pick an Image
          </button>
          <p>Max Image size: 2 MB</p>
        </div>
      </div>
    </div>
  );
};
export default ImagePicker;
