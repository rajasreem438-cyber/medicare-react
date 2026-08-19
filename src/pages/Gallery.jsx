import { useEffect, useState } from "react";
import API from "../services/api";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/gallery/")
      .then((response) => {
        console.log("Gallery:", response.data);
        setGallery(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gallery Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Gallery</h2>

      {loading ? (
        <p className="text-center">Loading gallery...</p>
      ) : gallery.length === 0 ? (
        <p className="text-center">No gallery images found.</p>
      ) : (
        <div className="row">
          {gallery.map((item) => {
            const imageUrl =
              `https://medicare-hospital-zauc.onrender.com${item.image}`;

            return (
              <div
                className="col-md-6 col-lg-3 mb-4"
                key={item.id}
              >
                <div className="card shadow h-100">

                  <img
                    src={imageUrl}
                    className="card-img-top"
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body text-center">
                    <h5>{item.title}</h5>
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