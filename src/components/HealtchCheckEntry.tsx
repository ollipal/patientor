import React  from "react";
import { Icon } from "semantic-ui-react";
import { Diagnosis, Entry} from "../types";

const HealtchCheckEntry = ({entry, diagnoses} : {entry : Entry, diagnoses : Diagnosis[]}) => {
  return (
    <>
      <div>
        <div>{entry.date}</div>
        <Icon name="heart"/>
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

export default HealtchCheckEntry;
