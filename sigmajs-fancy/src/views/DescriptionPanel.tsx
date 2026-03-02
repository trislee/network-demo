import { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";

import Panel from "./Panel";

const DescriptionPanel: FC<{ description?: string }> = ({ description }) => {
  return (
    <Panel
      initiallyDeployed
      title={
        <>
          <BsInfoCircle className="text-muted" /> Description
        </>
      }
    >
      {description != null ? <div dangerouslySetInnerHTML={{ __html: description }} /> : null}
    </Panel>
  );
};

export default DescriptionPanel;
