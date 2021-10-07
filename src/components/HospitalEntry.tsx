import React  from "react";
import { Diagnosis, Entry} from "../types";
import { Icon } from "semantic-ui-react";

const HospitalEntry = ({entry, diagnoses} : {entry : Entry, diagnoses : Diagnosis[]}) => {
  return (
    <>
      <div>
        <div>{entry.date}</div>
        <Icon name="hospital"/>
        <i>{entry.description}</i><br/>
        {entry.diagnosisCodes &&
        <div>codes:<ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>
            <div>{code} {Object.values(diagnoses).find(d => d.code === code)?.name}</div>
          </li>)}
        </ul></div>}
        <br/>
      </div>
    </>
  );
};

export default HospitalEntry;
