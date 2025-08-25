const ButtonComponent = ({
  icon: Icon,
  title = "",
  size = 16,
  color = "gray",
  onClick,
  classTitle,
  className = "",
  rounded = "full", // có thể là "md", "lg", "full"
  ...props
}) => {
  const colorClasses = {
    white: "bg-white text-black hover:bg-black hover:text-white border duration-600",
    black: "bg-black text-white hover:bg-white hover:text-black border duration-600 hover:duration-600",
    gray: "bg-gray-100 text-black hover:bg-black hover:text-white border duration-600",
    orange: "bg-orange-500 text-white hover:bg-orange-600 border duration-600",
    blue: "bg-blue-500 text-white hover:bg-blue-600 border duration-600 hover:duration-500",
    green: "bg-green-500 text-white hover:bg-green-600 border duration-600",
    red: "bg-red-500 text-white hover:bg-red-600 border duration-600",
    transparent: "bg-transparent text-black hover:bg-gray-100 border duration-600",
  };

  const colorClass = colorClasses[color] || colorClasses["gray"];
  const radius = rounded === "full" ? "rounded-full" : `rounded-${rounded}`;

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm transition-all duration-500 ${colorClass} ${radius} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size} />}
      {title && <span className={classTitle}>{title}</span>}
    </button>
  );
};

export default ButtonComponent;
