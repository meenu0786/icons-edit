import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { IconPicker } from "react-fa-icon-picker";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function App() {
  const [arrObj, setArrObj] = React.useState([
    { id: "1", icon: "FaAccessibleIcon", value: "This is a accessible" },
    { id: "2", icon: "FaApple", value: "This is a Apple" },
    { id: "3", icon: "FaCircle", value: "This is a Circle" },
  ]);

  const handleIcon = (v, index) => {
    arrObj[index]["icon"] = v;
    setArrObj([...arrObj]);
  };
  const handleDropEnd = (param) => {
    const src = param.source?.index;
    const dest = param.destination?.index;

    arrObj.splice(dest, 0, arrObj.splice(src, 1)[0]);
    setArrObj([...arrObj]);
  };
  const handleChange = (e, index) => {
    arrObj[index]["value"] = e.target.value;
    setArrObj([...arrObj]);
  };
  const handleIconChange = (v) => {
    const item = {};
    item.id = (arrObj.length + 1).toString();
    item.icon = v;
    item.value = `This is a ${v}`;
    setArrObj([...arrObj, item]);
  };
  return (
    <div className="container">
      <div className="topmaincontainer">
      <div className="top-header">
      <h3 className="heading" contenteditable="true">
        Insert the Title here{" "}
      </h3>
      <IconPicker
        value="FaPlusCircle"
        onChange={(v) => {
          handleIconChange(v);
        }}
      />
      </div>
      <div className="box-middle">
      <DragDropContext  onDragEnd={handleDropEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {arrObj.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="iconborder"
                    >
                      <IconPicker
                        value={item.icon}
                        onChange={(v) => handleIcon(v, index)}
                      />
                      <span
                        onChange={(e) => handleChange(e, index)}
                        contenteditable="true"
                      >
                        {item.value}
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

