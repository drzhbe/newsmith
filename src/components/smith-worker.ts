import { Skill, createDefaultSkillTree } from "./skill-tree";

export type SmithWorker = {
  id: string;
  name: string;
  speed: number;
  focus: number;
  level: number;
  experience: number;
  skillTree: Skill[];
};

/**
 *  2    3    4    5     6     7
 * 100, 200, 400, 800, 1600, 3200, ...
 */
const getRequiredExperienceToLevel = (level: number): number => {
  if (level < 2) return 0;
  if (level === 2) return 100;
  // return getRequiredExperienceToLevelUp(level - 1) * 2;
  return 100 * Math.pow(2, level - 2);
};

export const getRequiredExperienceToLevelUp = (
  smithWorker: SmithWorker
): number => {
  return getRequiredExperienceToLevel(smithWorker.level + 1);
};

export const createSmithWorker = (
  id: string,
  name: string,
  speed: number,
  focus: number,
  level: number,
  experience: number,
  skillTree: Skill[]
): SmithWorker => {
  return {
    id,
    name,
    speed,
    focus,
    level,
    experience,
    skillTree,
  };
};

export const createDefaultSmithWorker = (): SmithWorker => {
  return {
    id: "0",
    name: "Jerry big smith",
    speed: 0,
    // speed: 5,
    focus: 1,
    level: 1,
    experience: 0,
    skillTree: createDefaultSkillTree(),
  };
};

export const getAvailableSkillPoints = (smithWorker: SmithWorker) => {
  const maxSkillPoints = smithWorker.level - 1;
  let learntSkills = 0;
  const countLearnSkills = (skill: Skill) => {
    if (skill.learnt) learntSkills++;
    skill.children?.forEach(countLearnSkills);
  };
  smithWorker.skillTree.forEach(countLearnSkills);
  return maxSkillPoints - learntSkills;
};

export const applySkills = (smithWorker: SmithWorker) => {
  const newSmithWorker = { ...smithWorker };
  const applySkill = (skill: Skill) => {
    if (skill.learnt) {
      newSmithWorker[skill.effect.attribute] += skill.effect.value;
    }
    skill.children?.forEach(applySkill);
  };
  smithWorker.skillTree.forEach(applySkill);
  return newSmithWorker;
};
