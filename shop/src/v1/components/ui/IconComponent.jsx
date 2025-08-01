const IconComponent = ({ icon: Icon, size = 18, color = "gray", onClick, className = "", ...props }) => {
  const colorClasses = {
    none: "bg-white text-black",
    white: "bg-white text-black hover:bg-black hover:text-white",
    gray: "bg-white text-gray-600 hover:bg-black hover:text-white",
    orange: "bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white",
    blue: "bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white",
    green: "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white",
    red: "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white",
  };

  const styleClass = colorClasses[color] || colorClasses["none"];

  return (
    <button onClick={onClick} className={` p-2 transition-all duration-300  ${styleClass} ${className}`} {...props}>
      {Icon && <Icon size={size} />}
    </button>
  );
};

export default IconComponent;
