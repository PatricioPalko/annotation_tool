"use client";
import { Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import AnnotationForm from "./components/AnnotationForm";
import styles from "./page.module.scss";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
              key: file.name,
            })
          )
        );
      },
      multiple: false,
      maxFiles: 1,
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
        <p>Drag &apos;n&apos; drop some file here, or click to select file</p>
        <em>(Only *.jpeg, *.jpg, *.png images and *.pdf will be accepted)</em>
      </div>
    </div>
  );
}

export default function Home() {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  const thumbs = files.map((file, id) => (
    <div className={styles.thumb} key={id}>
      <div className={styles.thumbInner}>
        <Image
          src={file.preview}
          alt={file.name}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const updatedFiles: (File & { preview: string; key: string })[] =
        Array.from(fileList).map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
          key: file.name,
        }));
      setFiles(updatedFiles);
    }
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

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
                {files[0].type !== "application/pdf" ? (
                  <Grid>
                    <div className={styles.thumbsContainer}>{thumbs}</div>
                  </Grid>
                ) : (
                  <Document
                    file={files[0]}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className={styles.pdfPage}
                      />
                    ))}
                  </Document>
                )}
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
                <input
                  type="file"
                  hidden
                  accept="image/jpeg,.jpg,.png,.pdf"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
          )}
        </Grid>
      </main>
    </>
  );
}
