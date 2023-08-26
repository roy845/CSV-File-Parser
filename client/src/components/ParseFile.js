import React, { useRef, useState } from "react";
import { parseFile } from "../Api/serverAPI";
import { useData } from "../context/dataContext";
import { Button, Icon } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Spinner from "./Spinner";
import FileNotAllowed from "./FileNotAllowed";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const ParseFile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showReset, setShowReset] = useState(false);

  const { setParsedData, file, setFile } = useData();
  const fileInputRef = useRef(null);

  const onChangeFile = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setError("No file selected");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setFile(selectedFile);
    setShowReset(true);

    if (selectedFile.type !== "text/csv") {
      setError("Only csv files are allowed to upload!");
    } else {
      setError("");
    }
  };

  const handleReset = () => {
    setFile(null);
    setError("");
    setParsedData([]);
    setShowReset(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submitFile = async () => {
    if (!file) {
      setError("No file selected");
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      setParsedData([]);
      setLoading(true);
      const { data } = await parseFile(formData);

      setLoading(false);
      setParsedData(data);

      setShowReset(true);
    } catch (error) {
      setError("Only Csv files are allowed to upload!");
      console.error("There was an error uploading the file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <input
        type="file"
        onChange={onChangeFile}
        ref={fileInputRef}
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput">
        <Button component="span" startIcon={<CloudUploadIcon />}>
          Upload File
        </Button>
        {file?.name}
        {file?.type === "text/csv" && (
          <Icon style={{ color: "green", marginLeft: "10px", lineHeight: "1" }}>
            ✓
          </Icon>
        )}
      </label>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {showReset && (
          <Button
            variant="contained"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={handleReset}
            endIcon={<RestartAltIcon />}
          >
            Reset
          </Button>
        )}
        {file?.type === "text/csv" && (
          <Button
            variant="contained"
            style={{ backgroundColor: "green", color: "white" }}
            onClick={submitFile}
            endIcon={<PlayArrowIcon />}
          >
            Parse File
          </Button>
        )}
      </div>
      {loading ? <Spinner text={file?.name} /> : ""}
      <br />
      {error === "Only csv files are allowed to upload!" && (
        <FileNotAllowed
          header="CSV Files Only"
          text="Only CSV files are allowed for upload. Please select a valid CSV file."
        />
      )}
      {error === "No file selected" && (
        <FileNotAllowed header="Select a file" text=" No file selected" />
      )}
    </div>
  );
};

export default ParseFile;
