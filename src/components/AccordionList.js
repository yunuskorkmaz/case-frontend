import { useState } from "react";
import "./AccordionList.css";
import { ReactComponent as CaretIcon } from "../icons/caret-right.svg";
import { ReactComponent as UpIcon } from "../icons/up.svg";

const AccordionTableRow = ({ open, onOpenChange, onMoveUp, item }) => {
  return (
    <>
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.username}</td>
        <td>{item.name}</td>
        <td>
          <div className="actionsColumn">
            <span
              role="button"
              onClick={() => {
                onMoveUp();
              }}
            >
              <UpIcon />
            </span>
            <span
              role="button"
              className={`collapseRowButton ${open ? "open" : ""}`}
              onClick={() => {
                if (!open) {
                  onOpenChange(item.id);
                } else {
                  onOpenChange(null);
                }
              }}
            >
              <CaretIcon />
            </span>
          </div>
        </td>
      </tr>

      <tr>
        <td
          colSpan="4"
          className={`detailColumnContainer ${open ? "open" : ""}`}
        >
          <div className="detailColumn">
            <table className="detailTable">
              <tr>
                <td className="bold">Email</td>
                <td>{item.email}</td>
                <td className="bold">Phone</td>
                <td>{item.phone?.toString()}</td>
              </tr>
              <tr>
                <td className="bold">Website</td>
                <td>{item.website}</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="bold">Address</td>
                <td colSpan="3">
                  {item.address.street}, {item.address.suite},{" "}
                  {item.address.city},{item.address.zipcode}
                </td>
              </tr>
              <tr>
                <td className="bold">City</td>
                <td>{item.address.city}</td>
                <td className="bold">ZIP Code</td>
                <td>{item.address.zipcode}</td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </>
  );
};

const AccordionList = ({ data, onChangeData }) => {
  const [openedId, setOpenedId] = useState(null);

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newData = [...data];
    const temp = newData[index - 1];
    newData[index - 1] = newData[index];
    newData[index] = temp;
    onChangeData(newData);
  };

  return (
    <div className="accordionList">
      <table className="userTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <AccordionTableRow
              open={openedId === item.id}
              onOpenChange={setOpenedId}
              onMoveUp={() => handleMoveUp(index)}
              item={item}
              key={item.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccordionList;
