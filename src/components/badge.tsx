export const Badge = ({
  children,
  size = 20,
}: React.PropsWithChildren<{ size?: number }>) => {
  return (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "100%",
        width: size,
        height: size,
        fontSize: size - 8,
        background: "#213547",
        color: "white",
      }}
    >
      {children}
    </span>
  );
};
