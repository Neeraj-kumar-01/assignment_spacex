import React, { useState, useEffect } from "react";

const Rockets = () => {
  const [data, setData] = useState([]);
  //   const [filter, setFilter] = useState(data);

  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(items);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["mission_name"]);
  const [filterParam, setFilterParam] = useState(["lanuches"]);
  let componentMounted = true;

//   const [filt, setFilt] = useState("");

//   const searchText = (event) => {
//     setFilt(event.target.value);
//   };

//   let dataSearch = items.filt((item) => {
//     return Object.keys(item).some((key) =>
//       item[key].toString().toLowerCase().includes(filt.toString().toLowerCase())
//     );
//   });

  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/launches")
      .then((res) => res.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          // setIsLoaded(true);
          console.log(error);
        }
      );
  }, []);

  //   useEffect(() => {
  //     const getRockets = async () => {
  //       setLoading(true);
  //       const response = await fetch("https://api.spacexdata.com/v3/launches");

  //       if (componentMounted) {
  //         setData(await response.clone().json());
  //         setFilter(await response.json());
  //         setLoading(false);
  //         // console.log(filter);
  //         console.log(data);
  //       }
  //       return () => {
  //         componentMounted = false;
  //       };
  //     };
  //     getRockets();
  //   }, []);

  //   const Loading = () => {
  //     return <>Loadig...</>;
  //   };

  function search(items) {
    return items.filter((item) => {
      if (item.mission_name == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "launches") {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }
  const filterRocket = (cat) => {
    const upateList = data.filter((x) => x.catageory === cat);
    setFilter(upateList);
  };

  const ShowRockets = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center  ">
          <h3 className="m-2">Use Filters for better Result </h3>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterRocket("upcoming")}
          >
            upcoming
          </button>
          <button
            className="btn btn-outline-dark me-2"
            className="btn btn-outline-dark me-2"
            onClick={() => filterRocket(true)}
          >
            Success
          </button>
          <button
            className="btn btn-outline-dark me-2"
            className="btn btn-outline-dark me-2"
            onClick={() => filterRocket(false)}
          >
            Fails
          </button>
          <button
            className="btn btn-outline-dark me-2"
            className="btn btn-outline-dark me-2"
            onClick={() => filterRocket("Past week")}
          >
            Past week
          </button>
          <button
            className="btn btn-outline-dark me-2"
            className="btn btn-outline-dark me-2"
            onClick={() => filterRocket("Past Month")}
          >
            Past Month
          </button>
          <button
            className="btn btn-outline-dark me-2"
            className="btn btn-outline-dark me-2"
            onClick={() => filterRocket("Past year")}
          >
            Past year
          </button>
        </div>

        {items.map((item) => (
          <div
            className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mt-4"
            key={item.flight_id}
          >
            <div className="card ">
              {/* <img src={item.imageUrl} className="card-img-top" alt="Space x" /> */}
              <div className="card-body">
                <p className="card-title">
                  <strong>Mission Name:-</strong>
                  {item.mission_name}
                </p>
                <p className="card-title">
                  <strong>Rocket Name:-</strong> {item.rocket.rocket_name}
                </p>
                <p className="card-title">
                  <strong>Rocket Type:- </strong>

                  {item.rocket.rocket_type}
                </p>
                <p className="card-text">
                  <strong>Mission Status</strong>:{" "}
                  {item.launch_success ? "Mission Fils" : "Mission Pass"}
                </p>
                <p className="card-text">Launch Year:- {item.launch_year}</p>
                <a
                  href={item.links.article_link}
                  target="_blank"
                  className="btn btn-primary btn-sm "
                  rel="noreferrer"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };
  return (
    <div>
      <div className="container my-2">
        {/* <div className="row mb-4">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search "
                aria-label="Search"
                value={filt}
                onChange={searchText.bind(this)}
              />
            
            </form>
          </div>
          <div className="col-md-2"></div>
        </div> */}
        <div className="row mb-4">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Data By Rocket Name"
                aria-label="Search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              {/* <button className="btn btn-outline-success" type="submit">
                Search
              </button> */}
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">{<ShowRockets />}</div>
      </div>
    </div>
  );
};

export default Rockets;
