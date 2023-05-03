import { CloseButtonIcon } from "./close-button-icon";

type Attribute = "speed" | "focus";
type Operator = "percent" | "multiply";

type Effect = {
  attribute: Attribute;
  operator: Operator;
  value: number;
};

export type Skill = {
  id: string;
  name: string;
  effect: Effect;
  learnt: boolean;
  children?: Skill[];
};

export const createDefaultSkillTree = (): Skill[] => [
  {
    id: "speed-lvl-1",
    name: "🔥",
    learnt: false,
    effect: { attribute: "speed", operator: "percent", value: 10 },
    children: [
      {
        id: "speed-lvl-2",
        name: "🔥",
        learnt: false,
        effect: { attribute: "speed", operator: "percent", value: 10 },
        children: [
          {
            id: "speed-lvl-3",
            name: "🔥",
            learnt: false,
            effect: { attribute: "speed", operator: "percent", value: 20 },
          },
        ],
      },
    ],
  },
  {
    id: "focus-lvl-1",
    name: "🧘",
    learnt: false,
    effect: { attribute: "focus", operator: "multiply", value: 1 },
    children: [
      {
        id: "focus-lvl-2",
        name: "🧘",
        learnt: false,
        effect: { attribute: "focus", operator: "multiply", value: 1 },
        children: [
          {
            id: "focus-lvl-3",
            name: "🧘",
            learnt: false,
            effect: { attribute: "focus", operator: "multiply", value: 1 },
          },
        ],
      },
    ],
  },
];

export const learnSkill = (skill: Skill, skillId: string): Skill => {
  if (skill.id === skillId) {
    return { ...skill, learnt: true };
  }
  if (skill.children) {
    return {
      ...skill,
      children: skill.children.map((s) => learnSkill(s, skillId)),
    };
  }
  return skill;
};

export const SkillTree = ({
  skillTree,
  skillPoints,
  learnSkill,
  close,
}: {
  skillTree: Skill[];
  skillPoints: number;
  learnSkill: (skillId: string) => void;
  close: () => void;
}) => {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <h1>Skill tree </h1>
        <button onClick={close}>
          <CloseButtonIcon />
        </button>
      </div>

      <div>Available skill points: {skillPoints}</div>
      <div style={{ display: "flex", gap: 50 }}>
        {skillTree.map((skill, i) => (
          <SkillTreeNode
            key={i}
            skill={skill}
            skillPoints={skillPoints}
            learnable={!skill.learnt && skillPoints > 0}
            learnSkill={learnSkill}
          />
        ))}
      </div>
    </div>
  );
};

const SkillTreeNode = ({
  skill,
  skillPoints,
  learnable,
  learnSkill,
}: {
  skill: Skill;
  skillPoints: number;
  learnable: boolean;
  learnSkill: (skillId: string) => void;
}) => {
  const sign = skill.effect.value >= 0 ? "+" : "-";
  const value =
    skill.effect.operator === "percent"
      ? `${sign}${skill.effect.value}%`
      : skill.effect.operator === "multiply"
      ? `${sign}${skill.effect.value}`
      : skill.effect.value;
  const disabled = skill.learnt || !learnable;
  return (
    <div>
      <div
        style={{
          marginTop: 20,
          padding: 20,
          borderRadius: 8,
          background: skill.learnt ? "#213547" : undefined,
          color: skill.learnt ? "white" : undefined,
        }}
      >
        {skill.learnt ? (
          skill.name
        ) : (
          <button
            disabled={disabled}
            style={{ borderRadius: "100%" }}
            onClick={() => learnSkill(skill.id)}
          >
            {skill.name}
          </button>
        )}
        <div style={{ opacity: disabled ? 0.5 : 1 }}>
          {skill.effect.attribute}: {value}
        </div>
      </div>
      {skill.children?.map((childSkill, i) => (
        <SkillTreeNode
          key={i}
          skill={childSkill}
          skillPoints={skillPoints}
          learnable={skill.learnt && skillPoints > 0}
          learnSkill={learnSkill}
        />
      ))}
    </div>
  );
};
