import { Badge } from "./badge";

export const CloseButtonIcon = () => {
  return (
    <Badge size={40}>
      <span
        style={{
          transform: "rotate(45deg) translateX(2px)",
          width: "100%",
          height: "100%",
          marginBottom: 2,
        }}
      >
        +
      </span>
    </Badge>
  );
};
