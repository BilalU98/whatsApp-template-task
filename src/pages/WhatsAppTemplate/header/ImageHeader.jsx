import UploadFile from "@/assets/svg/UploadFile";
import Button from "@/shared/Button";
import useStore from "@/store/store";
import { useRef } from "react";

const ImageUploader = () => {
  const errors = useStore((state) => state.errorValidation);
  const { changeComponents, template } = useStore((state) => state);

  const headerState = template.components.find((c) => c.type === "HEADER");

  const headerIndex = template?.components.indexOf(headerState);
  const headerErrors = errors?.components?.[headerIndex] || null;

  const image = headerState?.value?.url || null;
  const inputRef = useRef();

  console.log({ headerErrors });

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG and PNG files are allowed.");
      return;
    }

    const url = URL.createObjectURL(file);
    changeComponents({ ...headerState, value: { url } });
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div
      className={`w-full  mx-auto h-60 border-2 flex px-4 items-center border-dashed border-blue-100 rounded-lg cursor-pointer hover:border-main-500 transition ${
        headerErrors ? "!border-red-500" : ""
      }`}
      onClick={handleClick}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        className="hidden self-start"
        ref={inputRef}
        onChange={handleChange}
      />

      {image ? (
        <img
          src={image}
          alt="Preview"
          className="h-40 max-w-full rounded-md object-contain"
        />
      ) : (
        <div className="text-center m-auto flex flex-col items-center gap-4 justify-between text-gray-500">
          <UploadFile />

          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-font-100">
              Drag and drop file here to upload or{" "}
              <span className="text-main-500 font-medium"> Browse</span>
            </p>
            <p className="text-xs">Allowed types .jpeg, .jpg, .png</p>
          </div>

          <Button type="outline" size="sm">
            SELECT FILE
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
