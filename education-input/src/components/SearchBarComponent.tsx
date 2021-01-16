import React, { useState} from "react";
import API from "../API/api";

interface School {
    alphaTwoCode: string,
    country: string,
    domains: Array<string>,
    name: string,
    stateProvince: string | null,
    webPages: Array<string>
}

export default function SearchBarComponent() {
    

  const [schoolNameState, setSchoolNameState] = useState("");
  const [schoolSuggestionsListState, setSchoolSuggestionsListState] = useState<
    Array<School>
  >([]);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setSchoolNameState(value);
    if (value.length > 2) {
      return API.searchSchoolName(value)
        .then((res) => {
          setSchoolSuggestionsListState(res.data);
          console.log(schoolSuggestionsListState);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    return API.searchSchoolName(schoolNameState)
      .then((res) => {
        console.log(res.data);
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
        {schoolSuggestionsListState.length > 1
          ? schoolSuggestionsListState.map((school: School) => {
              return <li>{school.name}</li>;
            })
          : ( <li></li> )}
      </ul>
    </div>
  );
}
