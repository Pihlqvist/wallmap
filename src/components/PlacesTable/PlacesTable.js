import React, { useState, useEffect } from "react";
import { usePlaces } from "../../data/model/PlaceModel";
import MaterialTable from "material-table";
import { useFirebase } from "../../util/Firebase";
import { useAuth } from "../../util/UserAuth";

// Columns used in the table
const columns = [
  { title: "Name", field: "name" },
  { title: "Country", field: "country" },
  { title: "Date", field: "date" }
];

const PlacesTable = ({ selectPlace }) => {
  const [rows, setRows] = useState([]);

  const places = usePlaces();
  const firebase = useFirebase();
  const auth = useAuth();

  // Creates the rows displayed in the table
  useEffect(() => {
    if (places) {
      setRows(
        places.map(place => {
          return {
            id: place.id,
            name: place.name,
            country: place.location.components.country,
            date: place.date.toLocaleDateString(),
          };
        })
      );
    }
  }, [places]);

  // Remove the place
  const removePlace = place => {
    let respones = window.confirm(`Want to remove ${place.name}?`);
    if (respones) {
      // Remove the place from our DB
      firebase.placeref(auth.user.uid, place.id).remove();

      // Remove the images from storage
      firebase.images(auth.user.uid, place.id).listAll()
      .then((placeDir) => {
        placeDir.items.map(imgRef => {
          imgRef.delete()
        });
      })
      .catch(error => console.error(error));
    }
  };

  return (
    <MaterialTable
      title="Places"
      columns={columns}
      data={rows}
      options={{
        sorting: true,
        showTitle: false,
        actionsColumnIndex: columns.length
      }}
      actions={[
        {
          icon: "launch",
          tooltip: "Go to place",
          onClick: (event, rowData) => selectPlace(rowData.id)
        },
        {
          icon: "delete",
          tooltip: "Remove place",
          onClick: (event, rowData) => removePlace(rowData)
        }
      ]}
    />
  );
};

export default PlacesTable;
