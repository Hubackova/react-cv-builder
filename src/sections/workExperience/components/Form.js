import PropTypes from "prop-types";
import React, { useReducer, useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import { Formik, Form } from "formik";
import fileDownload from "js-file-download";
import {
  CITY,
  COMPANY,
  COUNTRY,
  CURRENT,
  DESCRIPTION,
  JOB_TITLE,
  START_DATE_YEAR,
  START_DATE_MONTH,
  END_DATE_YEAR,
  END_DATE_MONTH
} from "../fieldsNames";
import Panel from "./Panel";
import reducer from "../reducer";
import validationSchema from "../validationSchema";
import { TextInput, Select, Checkbox, Editor } from "../../../shared";
import { getBlancDefaults, getDataDefaults } from "../defaultValues";
import { getMonths, getYears, tranformBeforeSubmit, fetchData } from "../../../utils/helpers";
import { useDataApi } from "../../../utils/hooks";

const WorkExpForm = ({ cvData }) => {
  const [{ isLoading, isError }, doFetch] = useDataApi();
  const [pdfCreating, setPdfCreating] = useState(false);
  const experienceSection = cvData.cv.sections.find(section => section.name === "Work experience");
  const workExpValues = experienceSection ? experienceSection.data.entries : [];

  const workExpInit = workExpValues.map(exp => {
    const id = uniqid();
    return { ...exp, id, key: id };
  });
  const initialState = {
    selectedId: workExpInit.length ? workExpInit[0].id : 0,
    workexp: workExpInit
  };
  const [{ workexp, selectedId }, dispatch] = useReducer(reducer, initialState);
  const initialSection = getBlancDefaults();

  // --- //
  //TODO: this should be in action-creater file + types should be a constants, but unfortunately i have no more time...but this file is disgustingly huge :(

  const onHandleAdd = () => {
    dispatch({ type: "add", section: { ...initialSection, id: uniqid() } });
  };

  const onHandleRemove = id => {
    dispatch({ type: "remove", id });
  };

  const onHandleSelect = id => {
    dispatch({ type: "select", id });
  };

  const onHandleEdit = e => {
    dispatch({
      type: "edit",
      id: selectedId,
      value: e.target.value,
      fieldName: e.target.getAttribute("name")
    });
  };

  const onHandleSwitch = e => {
    dispatch({
      type: "edit",
      id: selectedId,
      value: e.target.checked,
      fieldName: e.target.getAttribute("name")
    });
  };

  const onHandleWysigyg = e => {
    dispatch({
      type: "edit",
      id: selectedId,
      value: e,
      fieldName: "description"
    });
  };
  // --- //

  async function onSubmit(e) {
    e.preventDefault();
    setPdfCreating(true);
    try {
      const submitData = tranformBeforeSubmit(workexp, cvData);
      await doFetch("jobs/", "POST", submitData);
      const cvs = await fetchData("jobs/", "GET");
      const cvId = cvs[0].id;
      function getPdf(cvId) {
        setTimeout(
          fetchData(`jobs/${cvId}/`, "GET").then(async res => {
            if (res.ready === false) {
              getPdf(cvId);
            } else {
              const response = await fetch(`/api/v2/jobs/${cvId}.pdf`, {
                method: "GET",
                headers: {
                  Authorization: `Token ${process.env.REACT_APP_TOKEN}`
                }
              });
              const blob = await response.blob();
              blob && fileDownload(blob, `yourCV-${cvId}.pdf`);
              setPdfCreating(false);
            }
          }),
          3000
        );
      }
      getPdf(cvId);
    } catch (error) {
      console.log(error.message);
    }
  }

  const selectedExp = workexp.length
    ? getDataDefaults(workexp.find(exp => exp.id === selectedId))
    : initialSection;

  const months = getMonths();
  const years = getYears();

  if (!workExpValues.length)
    return <div>V životopise není sekce obsahující pracovní zkušenosti</div>;
  if (isLoading) return <div>...some fancy loader</div>;
  if (isError) return <div>...some fancy error info</div>;
  if (pdfCreating)
    return (
      <div>zpracování pdf několik sekund trvá, vydržte prosím - poté bude vaše pdf staženo</div>
    );
  return (
    <>
      <h1>Work experience</h1>
      <WorkExpSection>
        <Panel
          companies={workexp}
          onHandleAdd={onHandleAdd}
          onHandleRemove={onHandleRemove}
          onHandleSelect={onHandleSelect}
          avatarUrl={cvData.avatarUrl}
        />

        <Formik
          enableReinitialize={true}
          initialValues={selectedExp}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form onSubmit={onSubmit}>
            <FormBlock>
              <div>
                <TextInput
                  label={"Název společnosti"}
                  name={COMPANY}
                  onBlur={onHandleEdit}
                  type="text"
                />
                <TextInput
                  label={"Název pozice"}
                  name={JOB_TITLE}
                  type="text"
                  onBlur={onHandleEdit}
                />
                <TextInput label={"Krajina"} name={COUNTRY} type="text" onBlur={onHandleEdit} />
                <TextInput label={"Město"} name={CITY} type="text" onBlur={onHandleEdit} />

                <Checkbox name={CURRENT} onChange={onHandleSwitch}>
                  Aktuálně zde pracuji
                </Checkbox>
              </div>
              <div>
                <Select
                  placeholder="Měsíc"
                  label="Časové období"
                  name={START_DATE_MONTH}
                  onBlur={onHandleEdit}
                >
                  {months}
                </Select>
                <Select placeholder="Rok" name={START_DATE_YEAR} onBlur={onHandleEdit}>
                  {years}
                </Select>
                <hr />
                <Select placeholder="Měsíc" name={END_DATE_MONTH} onBlur={onHandleEdit}>
                  {months}
                </Select>
                <Select placeholder="Rok" name={END_DATE_YEAR} onBlur={onHandleEdit}>
                  {years}
                </Select>
              </div>
            </FormBlock>
            <Editor name={DESCRIPTION} id="template-editor" onBlur={onHandleWysigyg} />
            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        </Formik>
      </WorkExpSection>
    </>
  );
};

const WorkExpSection = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1200px) {
    margin: 0 15px;
    flex-direction: column;
  }
  & > div {
    display: flex;
    flex-direction: column;
    margin: 0 3rem;
  }
  & form {
    flex: 1;
  }
  & .quill {
    margin: 2rem;
  }
  & button {
    margin-top: 2rem;
  }
`;

const FormBlock = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1200px) {
    margin: 0 15px;
    flex-direction: column;
  }
  & > div {
    flex: 1;
    margin: 0 2rem;
  }
`;

WorkExpForm.propTypes = {
  cvData: PropTypes.object
};

export default WorkExpForm;
