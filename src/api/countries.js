import { getJson, postJson, deleteJson } from "./apiBase";


const API = 'CountriesAPI'

const emptyItem = {
  id: 0,
  name: "",
};


// -----------------------------------------
export async function getTotalListSize() {
  return getList("").length;
}

// -----------------------------------------
export async function getList(filter) {
  const url = `${API}/GetList/?filter=${encodeURIComponent(filter || "")}`;
  const result = await getJson(url);
  const rows = result.map((r) => ({
    id: r.id,
    name: r.name,
  }));
  return rows;
}

// -----------------------------------------
export async function getItem(strId) {
  const id = Number.parseInt(strId);
  const url = `${API}/GetItem/?id=${id}`;
  const result = await getJson(url);
  if (result.errText) return result;

  var ret = { ...result};
  return ret;
}

// -----------------------------------------

export async function updateItem(item) {
  item.id = Number.parseInt(item.id);
  const urlGet = `${API}/GetItem/?id=${item.id}`;
  const resultGet = await getJson(urlGet);
  if (resultGet.errText) return resultGet;

  const data = {
    ...resultGet,
    name: `${item.name}`.trim(),
  };

  const url = `${API}/AddOrUpdateItem`;
  const result = await postJson(url, data);
  if (result.errText) return result;

  var ret = { ...result}
  return ret;
}

export async function addItem(item) {
  const data = {
    ...emptyItem,
    name: `${item.name}`.trim(),
  };
  const url = `${API}/AddOrUpdateItem`;
  const result = await postJson(url, data);
  if (result.errText) return result;

  var ret = { ...result}
  return ret;
}

export async function deleteItem(id) {
  id = Number.parseInt(id);
  const url = `${API}/DeleteItem/?id=${id}`;
  const result = await deleteJson(url, {});
  if (result.errText) return result;
  return {};
}
