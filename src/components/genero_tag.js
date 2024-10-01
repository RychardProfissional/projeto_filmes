export default function GeneroTag({ genero, className, ...rest}) {
  return (
    <div className={`flex items-center px-2 rounded-2xl ${className || "bg-gray-500"}`} {...rest}>
      <div className="text-sm">{genero.name}</div>
    </div>
  );
}