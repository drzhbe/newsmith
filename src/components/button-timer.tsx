import cn from "classnames";
import "./button-timer.css";

export const ButtonWithCooldown = ({
  coolDown,
  isCoolingDown,
  ...buttonProps
}: React.ComponentProps<"button"> & {
  coolDown: number; // in seconds
  isCoolingDown: boolean;
}) => {
  return (
    <button className="button-with-cooldown" {...buttonProps}>
      <div
        className={cn("cooldown", { progress: isCoolingDown })}
        style={{ animationDuration: `${coolDown}s` }}
      />
      <span className="button-with-cooldown--label">
        {buttonProps.children}
      </span>
    </button>
  );
};
