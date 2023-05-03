import { useMemo, useState } from "react";
import "./App.css";
import {
  applySkills,
  createDefaultSmithWorker,
  getAvailableSkillPoints,
  getRequiredExperienceToLevelUp,
} from "./components/smith-worker";
import { Workbench } from "./components/workbench";
import { SkillTree, learnSkill } from "./components/skill-tree";

function App() {
  const [skillTreeVisible, setSkillTreeVisible] = useState(false);
  const [smithWorker, setSmithWorker] = useState(createDefaultSmithWorker());

  const increaseExperience = (exp: number) => {
    setSmithWorker((smithWorker) => {
      const experience = smithWorker.experience + exp;
      const levelUp = experience >= getRequiredExperienceToLevelUp(smithWorker);
      const level = levelUp ? smithWorker.level + 1 : smithWorker.level;
      if (levelUp && !skillTreeVisible) {
        setSkillTreeVisible(true);
      }
      return {
        ...smithWorker,
        experience,
        level,
      };
    });
  };

  const onLearnSkill = (skillId: string) => {
    setSmithWorker((smithWorker) => {
      const skillTree = smithWorker.skillTree.map((s) =>
        learnSkill(s, skillId)
      );
      return {
        ...smithWorker,
        skillTree,
      };
    });
  };

  const skillPoints = useMemo(
    () => getAvailableSkillPoints(smithWorker),
    [smithWorker]
  );

  const finalWorker = useMemo(() => applySkills(smithWorker), [smithWorker]);

  return (
    <>
      {skillTreeVisible && (
        <SkillTree
          skillTree={finalWorker.skillTree}
          skillPoints={skillPoints}
          learnSkill={onLearnSkill}
          close={() => setSkillTreeVisible(false)}
        />
      )}
      <Workbench
        smithWorker={finalWorker}
        increaseExperience={increaseExperience}
        setSkillTreeVisible={setSkillTreeVisible}
      />
    </>
  );
}

export default App;
