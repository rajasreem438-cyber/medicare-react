import { useEffect, useState } from "react";
import API from "../services/api";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Gallery component loaded");

    API.get("/api/gallery/")
      .then((response) => {
        console.log("Gallery API response:", response.data);
        console.log(
          "First image:",
          response.data[0]?.image
        );

        setGallery(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gallery API Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5">

      <h2 className="text-center mb-5">
        Gallery
      </h2>

      {loading ? (
        <p className="text-center">
          Loading gallery...
        </p>
      ) : gallery.length === 0 ? (
        <p className="text-center">
          No gallery images found.
        </p>
      ) : (
        <div className="row">

          {gallery.map((item) => {

            const imageUrl =
              `https://medicare-hospital-zauc.onrender.com${item.image}`;

            console.log("Image URL:", imageUrl);

            return (
              <div
                className="col-md-6 col-lg-3 mb-4"
                key={item.id}
              >

                <div className="card shadow h-100">

                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onLoad={() => {
                      console.log(
                        "IMAGE LOADED:",
                        imageUrl
                      );
                    }}
                    onError={(e) => {
                      console.error(
                        "IMAGE ERROR:",
                        imageUrl
                      );

                      e.currentTarget.style.display =
                        "none";
                    }}
                  />

                  <div className="card-body text-center">

                    <h5>
                      {item.title}
                    </h5>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Gallery;