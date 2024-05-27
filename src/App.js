import { useEffect, useRef, useState } from "react";
import AccordionListWithSearch from "./components/AccordionListWithSearch";

function App() {
  const accordionListWithSearchRef = useRef(null);
  const [source, setSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSource = async () => {
    setLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setSource(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSource();
  }, []);

  return (
    <>
      {loading && source?.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <>
          <AccordionListWithSearch
            ref={accordionListWithSearchRef}
            source={source}
          />{" "}
          <button
            className="getDataButton"
            onClick={() =>
              console.log(accordionListWithSearchRef.current.getData())
            }
          >
            Get ordered data
          </button>
        </>
      )}
    </>
  );
}

export default App;
