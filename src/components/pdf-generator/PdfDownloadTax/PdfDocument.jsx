import React, { useState, useEffect } from "react";
import { BlobProvider } from "@react-pdf/renderer";

const PdfDocument = ({ title, document }) => {
  const [ready, setReady] = useState(true);

  // this is hacky but helps set the render to the back of event queue https://github.com/diegomura/react-pdf/issues/420
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 0);
  }, []);
  // end of hacky stuff

  if (!ready) {
    return null;
  } else {
    return (
      <BlobProvider document={document}>
        {({ url, loading, error }) => {
          if (loading) {
            return <span>generating document...</span>;
          }
          if (!loading && url) {
            return (
              <div className="text-center">
                <a
                  target={"_blank"}
                  href={url}
                  //   download={`${title}.pdf`}
                  className="btn btn-dark"
                >
                  Click here to download
                </a>
              </div>
            );
          }
          if (error) {
            console.error(error);
            return <p>An error occurred</p>;
          }
          return null;
        }}
      </BlobProvider>
    );
  }
};

export default PdfDocument;
