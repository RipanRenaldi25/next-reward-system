"use client";

import { Button } from "@/components/ui/button";
import { createAdmin, upload } from "@/utils/api/User";
import React, {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function UserDashboard() {
  const [files, setFiles] = useState([]);
  // const [capturedImage, setCapturedImage] = useState("");
  // const [showCamera, setShowCamera] = useState(false);
  const [transportation, setTransportation] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const webcamRef = useRef(null);

  // const capture = () => {
  //   const imageSrc = webcamRef.current?.getScreenshot();
  //   if (imageSrc) {
  //     console.log("Captured image", imageSrc);
  //     setShowCamera(false);
  //     setCapturedImage(imageSrc);
  //   }
  // };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!files.length) {
      toast.error("upload bukti terlebih dahulu");
      return;
    }
    if (!transportation) {
      toast.error("pilih transportasi umum yang digunakan");
      return;
    }
    const formData = new FormData();
    formData.set("image", files[0]);
    formData.set("transportation", transportation);
    upload(formData, localStorage.getItem("accessToken"))
      .then((data) => {
        toast.success(data.message);
        setFiles([]);
        setTransportation("");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="p-4  bg-gray-50 rounded-lg  w-full relative">
      <form onSubmit={handleUpload} className="space-y-4">
        <div className="space-y-4">
          <h1 className="font-semibold">
            Upload bukti menggunakan transportasi umum
          </h1>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the image here ...</p>
            ) : (
              <p>Drag and drop an image here, or click to select file</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Transportasi</Label>
          <Select onValueChange={(val) => setTransportation(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Transportasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bus">bus</SelectItem>
              <SelectItem value="kereta">kereta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full mt-4" type="submit">
          Upload Bukti Transport
        </Button>
      </form>

      {/* <div className="my-6 text-center">
        {!showCamera ? (
          <button
            onClick={() => setShowCamera(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
          >
            Buka Kamera
          </button>
        ) : (
          <div className="flex flex-col items-center gap-2 mt-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg w-full max-w-md"
            />
            <button
              onClick={capture}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Ambil Foto
            </button>
            <button
              onClick={() => setShowCamera(false)}
              className="text-red-500 underline"
            >
              Tutup Kamera
            </button>
          </div>
        )}
      </div>

      {!!capturedImage && (
        <div className="mt-4 absolute ">
          <h2 className="font-semibold mb-2">Preview Gambar:</h2>
          <img
            src={capturedImage}
            alt="Preview"
            className="w-40 rounded shadow-md"
          />
        </div>
      )} */}
      {files.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold mb-2">Preview Gambar:</h2>
          {files.map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-40 rounded shadow-md"
            />
          ))}
        </div>
      )}
    </div>
  );
}
