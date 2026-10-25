export function Avatar({
  name,
  role,
  size = 36,
  src,
}: {
  name: string;
  role?: "admin" | "user";
  size?: number;
  src?: string | null;
}) {
  const getInitials = (str: string) => {
    const parts = str.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(name || "User");
  const bgColor = role === "admin" ? "#1e293b" : "#0f766e";

  if (src && !src.includes("unsplash.com")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          objectFit: "cover",
          border: "1px solid var(--border-light)",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: bgColor,
        color: "#ffffff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: size <= 30 ? "0.75rem" : size <= 40 ? "0.875rem" : "1.05rem",
        userSelect: "none",
        flexShrink: 0,
        letterSpacing: "0.02em",
      }}
      title={name}
    >
      {initials}
    </div>
  );
}
