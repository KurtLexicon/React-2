import { seedPersons } from "./data/Persons";

let personList = [];

const emptyPerson = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  nationality: "",
  age: undefined,
};

export async function seed() {
  console.log(`Antal personer i lista ${personList.length}`);
  console.log("seed");
  personList = seedPersons.map((p, ix) => ({ ...p, id: ix + 1 }));
  console.log(`Antal personer i lista ${personList.length}`);
}

let nextUid = 1;
function getNextUid() {
  return nextUid++;
}

export async function getTotalListSize() {
  return personList.length;
}

export async function getList(filter) {
  const lowerCaseFilter = filter && filter.toLowerCase();
  return lowerCaseFilter
    ? personList.filter(
        (p) =>
          p.first_name.toLowerCase().includes(lowerCaseFilter) ||
          p.first_name.toLowerCase().includes(lowerCaseFilter) ||
          p.email.toLowerCase().includes(lowerCaseFilter) ||
          p.nationality.toLowerCase().includes(lowerCaseFilter) ||
          p.age.toString().includes(lowerCaseFilter)
      )
    : [...personList];
}

export async function getPerson(id) {
  console.log("getperson");
  console.log(id);
  if (id == 0) {
    console.log("newPerson");
    const ret = { ...emptyPerson };
    console.log(ret ? ret.id : "no person");
    return ret;
  }
  const person = personList.find((x) => x.id == id);
  return person ? { ...person, uid: getNextUid() } : null;
}

export async function deletePerson(id) {
  personList = personList.filter((p) => p.id != id);
}

export async function updatePerson(person) {
  const ix = personList.findIndex((x) => x.id == person.id);
  if (ix >= 0) {
    personList[ix] = { ...person };
  }
  console.log(`Antal personer i lista ${personList.length}`);
}

export async function addPerson(person) {
  // Returns max(id) + 1 from the list, or 1 if the list is empty
  function getNewId() {
    return personList.length ? Math.max(...personList.map((x) => x.id)) + 1 : 1;
  }
  personList.push({ ...person, id: getNewId() });
  console.log(`Antal personer i lista ${personList.length}`);
}
