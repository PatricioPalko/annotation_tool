"use client";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./page.module.css";

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

function StyledDropzone(props: any) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
        "application/pdf": [".pdf"],
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

<StyledDropzone />;

export default function Home() {
  return (
    <main className={styles.main}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1" textAlign="center">
            Annotation tool
          </Typography>
          <Container maxWidth="lg">
            <StyledDropzone />
            <Typography variant="inherit" textAlign="center">
              or
            </Typography>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden />
            </Button>
          </Container>
        </Grid>
      </Grid>
    </main>
  );
}
