/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { GenericList } from "../components/GenericList";
import { EditPopup } from "../components/EditPopup";
import { getList, getItem } from "../api/countries";
import { PopupErrmsg } from "../components/PopupErrmsg";
import "../styles/listForm.css";
import { updateItem, addItem, deleteItem } from "../api/countries";
import { CountryFormContent } from "../components/CountryFormContent";

export function Countries() {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [emptyItem, setEmptyItem] = useState({});
  const [itemList, setItemList] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [item, setItem] = useState(emptyItem);
  const [errmsg, setErrmsg] = useState("");

  if (!loaded && !loading) {
    async function load() {
      const itemList = await getList();
      setItemList(itemList);
      const emptyItem = await getItem(0); // To get possible select lists
      setEmptyItem(emptyItem);
      setLoaded(true);
    }
    setLoading(true);
    load();
  }

  const cols = [
    {
      name: "id",
      header: "Id",
      width: 1,
    },
    {
      name: "name",
      header: "Name",
      width: 5,
    },
  ];

  function handleOpenDetail(id) {
    const showItem = itemList.find((item) => item.id === id);
    if (showItem) {
      setItem({ ...emptyItem, ...showItem });
      setShowEdit(true);
    }
  }

  function handleOpenAdd() {
    setItem({ ...emptyItem });
    setShowEdit(true);
  }

  async function handleDelete(id) {
    const response = await deleteItem(id);
    if (response && response.errText) {
      setErrmsg(response.errText);
      return;
    }

    const ix = itemList.findIndex((item) => item.id === id);
    if (ix >= 0) {
      const newItemList = [...itemList];
      newItemList.splice(ix, 1);
      setItemList(newItemList);
    }
    setShowEdit(false);
    setItem(emptyItem);
  }

  async function handleChange(itemToChange) {
    const response =
      itemToChange.id === 0 || itemToChange.id === "0"
        ? await addItem(itemToChange)
        : await updateItem(itemToChange);
    if (response.errText) {
      setErrmsg(response.errText);
      return;
    }

    const newItem = response;
    const newItemList = [...itemList];
    const ix = itemList.findIndex((x) => x.id === newItem.id);
    if (ix >= 0) {
      newItemList[ix] = newItem;
      setItemList(newItemList);
    } else {
      newItemList.push(newItem);
      setItemList(newItemList);
    }
    setShowEdit(false);
    setItem(emptyItem);
  }

  function handleCloseEdit() {
    setShowEdit(false);
    setItem(emptyItem);
  }

  const popupTitle = item && item.id ? "Edit Country" : "Add Country";
  return (
    <>
      <PopupErrmsg text={errmsg} onClose={() => setErrmsg("")} />
      {!loaded && <h4>Loading...</h4>}
      {loaded && (
        <>
          {showEdit && (
            <EditPopup
              show={showEdit}
              title={popupTitle}
              orgItem={item}
              validateItem={validateItem}
              FormContent={CountryFormContent}
              onClose={handleCloseEdit}
              onDelete={handleDelete}
              onChange={handleChange}
            />
          )}
          <GenericList
            cols={cols}
            itemList={itemList}
            onOpenDetail={handleOpenDetail}
            onOpenAdd={handleOpenAdd}
          />
        </>
      )}
    </>
  );
}

function validateItem(item) {
  function isNullOrEmpty(str) {
    return str === null || str === undefined || str === "";
  }
  return item
    ? {
        errName: isNullOrEmpty(item.name)
          ? "Country name can not be empty"
          : "",
      }
    : {};
}
