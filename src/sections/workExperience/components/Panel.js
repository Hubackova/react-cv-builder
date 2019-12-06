import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const WorkExpPanel = React.memo(
  ({ companies, onHandleRemove, onHandleSelect, onHandleAdd, avatarUrl }) => {
    const names = companies.map((exp, index) => (
      <PanelItem key={exp.id}>
        <span className="comapny_name" onClick={() => onHandleSelect(exp.id)}>
          {exp.company || `pracovni zkusenost #${index + 1}`}
        </span>
        <span onClick={() => onHandleRemove(exp.id)} role="img">
          ❌
        </span>
      </PanelItem>
    ));
    return (
      <WorkExpPanelDiv>
        <div>{names}</div>
        {avatarUrl && <img src={avatarUrl} alt="avatar" />}
        <button onClick={onHandleAdd}>Add New </button>
      </WorkExpPanelDiv>
    );
  }
);

const WorkExpPanelDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const PanelItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  cursor: pointer;
  & > span {
    padding: 0.5rem 0;
  }
  & > .comapny_name {
    min-width: 15rem;
  }
`;

WorkExpPanel.propTypes = {
  avatarUrl: PropTypes.string,
  companies: PropTypes.array,
  onHandleAdd: PropTypes.func.isRequired,
  onHandleRemove: PropTypes.func.isRequired,
  onHandleSelect: PropTypes.func.isRequired
};

WorkExpPanel.defaultProps = {
  companies: []
};

export default WorkExpPanel;
