import React, { ChangeEvent, FormEvent, useState } from "react";
import API from "../API/api";

interface School {
  alphaTwoCode: string;
  country: string;
  domains: Array<string>;
  name: string;
  stateProvince: string | null;
  webPages: Array<string>;
}

export default function SearchBarComponent() {
  const [schoolNameState, setSchoolNameState] = useState("");
  const [schoolSuggestionsListState, setSchoolSuggestionsListState] = useState<
    Array<School>
  >([]);

  const autoCompleteList = (schoolList: Array<School>) => {
    const schoolArray: School[] = [];
    if (schoolList.length < 10) {
      for (let i = 0; i < schoolList.length; i++) {
        schoolArray.push(schoolList[i]);
      }
      return schoolArray;
    } else {
      for (let i = 0; i < 10; i++) {
        schoolArray.push(schoolList[i]);
      }
      return schoolArray;
    }
  };

  const handleChange = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    setSchoolNameState(value);
    return API.searchSchoolName(schoolNameState)
      .then((res) => {
        setSchoolSuggestionsListState(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    return API.searchSchoolName(schoolNameState)
      .then((res) => {
        setSchoolSuggestionsListState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={schoolNameState}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <ul>
        {schoolSuggestionsListState.length > 0 ? (
          autoCompleteList(schoolSuggestionsListState).map((school: School) => {
            return <li key={school.name} >{school.name}</li>;
          })
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
