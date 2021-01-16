import axios from "axios";

const BASEURL = 'http://universities.hipolabs.com';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    searchSchoolName: (name: string) => {
      return axios.get(`${BASEURL}/search?name=${name}`);
    }
  };

