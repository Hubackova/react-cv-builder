import React from "react";

import {
  START_DATE_YEAR,
  START_DATE_MONTH,
  END_DATE_YEAR,
  END_DATE_MONTH
} from "../sections/workExperience/fieldsNames";

function objectFlip(obj) {
  const ret = {};
  Object.keys(obj).forEach(key => {
    ret[obj[key]] = key;
  });
  return ret;
}

function getMonths() {
  let months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(
      <option key={i} value={i.toString()}>
        {i}
      </option>
    );
  }
  return months;
}

function getYears() {
  let years = [];
  for (let i = 1960; i <= new Date().getFullYear(); i++) {
    years.push(
      <option key={i} value={i.toString()}>
        {i}
      </option>
    );
  }
  return years;
}

function tranformBeforeSubmit(newWorkExp, oldData) {
  const newData = newWorkExp.map(exp => {
    const transformedDates = {
      ...exp,
      startDate: [
        exp[START_DATE_MONTH] || exp.startDate[0],
        exp[START_DATE_YEAR] || exp.startDate[1]
      ],
      endDate: [exp[END_DATE_MONTH] || exp.endDate[0], exp[END_DATE_YEAR] || exp.endDate[1]]
    };
    const { startDateMonth, startDateYear, ...finalData } = transformedDates;
    return finalData;
  });
  const dataToSubmit = {
    ...oldData,
    cv: {
      ...oldData.cv,
      sections: [
        ...oldData.cv.sections.map(section => {
          return section.name !== "Work experience"
            ? section
            : { ...section, data: { ...section.data, entries: newData } };
        })
      ]
    }
  };
  return dataToSubmit;
}

async function fetchData(url, method, input) {
  try {
    const response = await fetch(`/api/v2/${url}`, {
      method,
      body: JSON.stringify(input),
      headers: {
        Authorization: `Token ${process.env.REACT_APP_TOKEN}`,
        "Content-type": "application/json",
        Accept: "application/json"
      }
    });
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
}

export { objectFlip, getMonths, getYears, tranformBeforeSubmit, fetchData };
