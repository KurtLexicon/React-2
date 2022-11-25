/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { GenericList } from "../components/GenericList";
import { EditPopup } from "../components/EditPopup";
import { getList, getSelectLists } from "../api/persons";
import { PopupErrmsg } from "../components/PopupErrmsg";
import "../styles/listForm.css";
import { updateItem, addItem, deleteItem } from "../api/persons";
import { PersonFormContent } from "../components/PersonFormContent";

export function Persons() {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [emptyItem, setEmptyItem] = useState({ id: 0 });
  const [itemList, setItemList] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [item, setItem] = useState(emptyItem);
  const [errmsg, setErrmsg] = useState("");

  if (!loaded && !loading) {
    async function load() {
      const itemList = await getList();
      setItemList(itemList);
      const emptyItem = await getSelectLists();
      emptyItem.selectListCities.unshift({
        text: "0",
        value: "-- Select City --",
      });
      setEmptyItem({ ...emptyItem, id: 0 });
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
      width: 4,
    },
    {
      name: "cityName",
      header: "City",
      width: 4,
    },
    {
      name: "countryName",
      header: "Country",
      width: 3,
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

  const popupTitle = item && item.id ? "Edit Person" : "Add Person";
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
              FormContent={PersonFormContent}
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
  function validatePhone(phone) {
    const regex = /^[+]?(\d+\s*-)?(?:\d[\s]*){3,}$/;
    return regex.test(phone);
  }
  return item
    ? {
        errName: isNullOrEmpty(item.name) ? "Name can not be empty" : "",
        errCity: item.cityId ? "" : "City needs have a value",
        errPhone: validatePhone(item.phone) ? "" : "Invalid phone number",
      }
    : {};
}
