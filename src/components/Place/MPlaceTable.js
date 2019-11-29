import React, { useState, useEffect } from "react";
import { usePlaces } from "../Places/Places";
import MaterialTable from "material-table";
import { useFirebase } from '../../util/Firebase';
import { useAuth } from "../Session/UserAuth";

// Columns used in the table
const columns = [
  {
    field: 'img',
    Title: 'Thumbnail',
    render: rowData => (
      <img src={rowData.url} 
           style={{width: 50, borderRadius: '50%'}} 
           alt="" />
    ),
  },
  { title: "Name", field: "name", },
  { title: "Country", field: "country", },
  { title: "Date", field: "date", },
];

const MPlaceTable = ({ selectPlace }) => {
  const [rows, setRows] = useState([]);

  const places = usePlaces();
  const firebase = useFirebase();
  const auth = useAuth();

  // Creates the rows displayed in the table
  useEffect(() => {
    if (places) {
      setRows(places.map(place => {
        return {
          id: place.id,
          img: "",
          name: place.name,
          country: place.location.components.country,
          date: place.date.toLocaleDateString(),
          url: `https://picsum.photos/200/200?random&t=${new Date().getTime()*Math.random()}`
        }
      }));
    }
  }, [places]);

  // Remove the place 
  const removePlace = (place) => {
    let respones = window.confirm(`Want to remove ${place.name}?`);
    if (respones) {
      const mes = firebase.placeref(auth.user.uid, place.id).remove();
      console.log(mes);
    }
  }

  return (
    <MaterialTable
      title="Places"
      columns={columns}
      data={rows}
      options={{
        sorting: true,
        showTitle: false,
        actionsColumnIndex: columns.length,
      }}
      onSelectionChange={(rows) => console.log(rows.id)}
      actions={[
        {
          icon: 'launch',
          tooltip: 'Go to place',
          onClick: (event, rowData) => selectPlace(rowData.id),
        },
        {
          icon: 'delete',
          tooltip: 'Remove place',
          onClick: (event, rowData) => removePlace(rowData),
        }
      ]}

    />
  );
};

export default MPlaceTable;