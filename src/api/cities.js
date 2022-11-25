import { getJson, postJson, deleteJson } from "./apiBase";


const API = 'CitiesAPI'

const emptyItem = {
  id: 0,
  name: "",
  countryId: 0,
};

// -----------------------------------------
export async function getTotalListSize() {
  const result = getList("").length;
  if (result.errText) return 0
  return result.length

}

// -----------------------------------------
export async function getList(filter) {
  const url = `${API}/GetList/?filter=${encodeURIComponent(filter || "")}`;
  const result = await getJson(url);
  if(result.errText) return result
  const rows = result.map((r) => ({
    id: r.id,
    name: r.name,
    countryName: r.country.name,
    countryId: r.countryId,
  }));
  return rows;
}

// -----------------------------------------
export async function getItem(strId) {
  const id = Number.parseInt(strId);
  const url = `${API}/GetItem/?id=${id}`;
  return await getJson(url);
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
    countryId: item.countryId,
  };

  const url = `${API}/AddOrUpdateItem`;
  return await postJson(url, data);
}

export async function addItem(item) {
  const data = {
    ...emptyItem,
    name: `${item.name}`.trim(),
    countryId: item.countryId,
  };
  const url = `${API}/AddOrUpdateItem`;
  return await postJson(url, data);
}

export async function deleteItem(id) {
  id = Number.parseInt(id);
  const url = `${API}/DeleteItem/?id=${id}`;
  return await deleteJson(url, {});
}
