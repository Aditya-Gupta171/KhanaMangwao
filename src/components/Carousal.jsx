import React from "react";

export default function Carousal({ search, setSearch }) {
  return (
    <div className="container my-4">
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search} // Controlled input
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-success text-white" type="submit">
                Search
              </button>
            </div>
          </div>

          <div className="carousel-item active">
            <img
              src="https://cdn.foodaciously.com/static/recipes/ee9fd204-25cf-4e97-be5a-d7626470d420/easy-vegan-momos-recipe-7ab341154a5c13d6d9642300e7e2c92d-640.webp"
              className="d-block w-100"
              alt="Momos"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1200px-Pizza-3007395.jpg"
              className="d-block w-100"
              alt="Pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.tasteandflavors.com/wp-content/uploads/2018/11/taste-and-flavors-out-and-about-10-best-burgers-wide.jpg"
              className="d-block w-100"
              alt="Burger"
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
