import { useEffect, useState } from "react";
import { SmithWorker, getRequiredExperienceToLevelUp } from "./smith-worker";
import { Badge } from "./badge";
import { ButtonWithCooldown } from "./button-timer";

const experiencePerSword = 50;
const secondsToMakeSword = 5; // seconds

export const Workbench = ({
  smithWorker,
  increaseExperience,
  setSkillTreeVisible,
}: {
  smithWorker: SmithWorker; // Worker with skills applied
  increaseExperience: (experience: number) => void;
  setSkillTreeVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [inProgress, setInProgress] = useState(false);
  const [swords, setSwords] = useState(0);

  const finalSecondsToMakeSword =
    secondsToMakeSword - secondsToMakeSword * (smithWorker.speed / 100);
  const finalExperiencePerSword = experiencePerSword * smithWorker.focus;

  useEffect(() => {
    if (!inProgress) return;

    const t = setTimeout(() => {
      setInProgress(false);
      setSwords((swords) => swords + 1);
      increaseExperience(finalExperiencePerSword);
    }, finalSecondsToMakeSword * 1000);

    return () => {
      clearTimeout(t);
    };
  }, [
    inProgress,
    finalSecondsToMakeSword,
    finalExperiencePerSword,
    increaseExperience,
  ]);

  const makeSword = () => {
    setInProgress(true);
  };

  const speedSign = smithWorker.speed >= 0 ? "+" : "-";

  return (
    <div>
      <h1>Blacksmith</h1>
      <div>
        <button
          style={{ display: "flex", alignItems: "center", gap: 5 }}
          onClick={() => setSkillTreeVisible((v) => !v)}
        >
          <h2>{smithWorker.name}</h2>
          <Badge>{smithWorker.level}</Badge>

          <div style={{ opacity: 0.5 }}>
            {smithWorker.experience} /{" "}
            {getRequiredExperienceToLevelUp(smithWorker)}
          </div>
        </button>
        <div>
          Speed: {speedSign}
          {smithWorker.speed}%
        </div>
        <div>Focus: {smithWorker.focus}</div>
      </div>
      <div>
        <h2>Storage</h2>
        <div>Swords: {swords}</div>
      </div>
      <div>Time to make a sword: {finalSecondsToMakeSword}s</div>
      <ButtonWithCooldown
        onClick={makeSword}
        disabled={inProgress}
        coolDown={finalSecondsToMakeSword}
        isCoolingDown={inProgress}
      >
        Make sword
      </ButtonWithCooldown>
    </div>
  );
};
