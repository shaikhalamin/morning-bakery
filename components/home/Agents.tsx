import React from "react";
import { Agent } from "@/data/model/agent";
import SectionTitleLink from "./SectionTitleLink";
import BaseContainer from "../common/container/BaseContainer";
import AgentList from "../agent/AgentList";

type AgentsInfo = {
  agents: Agent[];
};

const Agents: React.FC<AgentsInfo> = ({ agents }) => {
  return (
    <>
      <BaseContainer>
        <SectionTitleLink
          title={`Trusted Real Estate Agents`}
          linkTitle={`JOIN OUR AGENTS`}
          link={`/agents`}
        />
        <AgentList agents={agents} />
      </BaseContainer>
    </>
  );
};

export default Agents;
