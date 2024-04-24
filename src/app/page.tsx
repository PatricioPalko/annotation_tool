"use client";
import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import AnnotationForm from "./components/AnnotationForm";
import styles from "./page.module.scss";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "contain" as "contain",
};

function StyledDropzone({ files, setFiles }: any) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
        "application/pdf": [".pdf"],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg, *.jpg, *.pdf and *.png images will be accepted)</em>
      </div>
    </div>
  );
}

export default function Home() {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  const thumbs = files.map((file) => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <main className={styles.main}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" textAlign="center">
              Annotation tool
            </Typography>
          </Grid>
          {files && files.length > 0 ? (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              mt={6}
            >
              <Grid item xs={4} mr={2}>
                <Grid>
                  <div className={styles.thumbsContainer}>{thumbs}</div>
                </Grid>
              </Grid>
              <Grid item xs={4} ml={2}>
                <AnnotationForm />
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <StyledDropzone files={files} setFiles={setFiles} />
              <Typography variant="inherit" textAlign="center">
                or
              </Typography>
              <Button variant="contained" component="label">
                Upload File
                <input type="file" hidden />
              </Button>
            </Grid>
          )}
        </Grid>
      </main>
    </>
  );
}
