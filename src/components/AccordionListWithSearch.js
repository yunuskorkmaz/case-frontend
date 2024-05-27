import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import "./AccordionListWithSearch.css";
import AccordionList from "./AccordionList";
import { ReactComponent as SearchIcon } from "../icons/search.svg";

const AccordionListWithSearch = forwardRef(({ source }, ref) => {
  const [data, setData] = useState(source?.sort((a, b) => a.id - b.id));

  const [filteredData, setFilteredData] = useState(data);

  const [filterFields, setFilterFields] = useState({});

  useEffect(() => {
    if (Object.keys(filterFields).length > 0) {
      const filtered = source.filter((item) => {
        return Object.keys(filterFields).every((key) => {
          let field = item[key];
          if (key.includes(".")) {
            field = key
              .split(".")
              .reduce((acc, part) => acc && acc[part], item);
          }
          return field
            .toString()
            .toLowerCase()
            .includes(filterFields[key].toString().toLowerCase());
        });
      });
      setFilteredData(filtered);
    }
  }, [filterFields]);

  useImperativeHandle(ref, () => ({
    getData: () => filteredData,
  }));

  return (
    <div className="accordionListWithSearch">
      <div className="filterContainer">
        <h3>Filters</h3>
        <div className="filterInputContainer">
          <div className="inputWrapper">
            <SearchIcon />
            <input
              name="username"
              onChange={(e) =>
                setFilterFields((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder="Username"
            />
          </div>
          <div className="inputWrapper">
            <SearchIcon />
            <input
              name="name"
              onChange={(e) =>
                setFilterFields((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder="Name"
            />
          </div>
          <div className="inputWrapper">
            <SearchIcon />
            <input
              name="email"
              onChange={(e) =>
                setFilterFields((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder="Email"
            />
          </div>
          <div className="inputWrapper">
            <SearchIcon />
            <input
              name="address.city"
              onChange={(e) =>
                setFilterFields((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder="City"
            />
          </div>
          <div className="inputWrapper">
            <SearchIcon />
            <input
              name="address.zipcode"
              onChange={(e) =>
                setFilterFields((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder="Zipcode"
            />
          </div>
          <div className="inputWrapper">
            <SearchIcon />
            <input
              name="address.street"
              onChange={(e) =>
                setFilterFields((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder="Address"
            />
          </div>
        </div>
      </div>
      <div className="resultContainer">
        <AccordionList data={filteredData} onChangeData={setFilteredData} />
      </div>
    </div>
  );
});

export default AccordionListWithSearch;
