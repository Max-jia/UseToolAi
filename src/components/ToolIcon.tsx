// Generate a clean, consistent color from the tool name
function getColor(name: string): string {
  const colors = [
    "bg-indigo-500", "bg-blue-500", "bg-emerald-500", "bg-violet-500",
    "bg-rose-500", "bg-amber-500", "bg-cyan-500", "bg-teal-500",
    "bg-orange-500", "bg-pink-500", "bg-sky-500", "bg-lime-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export default function ToolIcon({ url, name, size = 40 }: { url: string; name: string; size?: number }) {
  const letter = name.charAt(0).toUpperCase();
  const color = getColor(name);
  const fontSize = size * 0.45;

  return (
    <div
      className={`${color} rounded-lg flex items-center justify-center font-extrabold text-white flex-shrink-0 leading-none select-none`}
      style={{ width: size, height: size, fontSize }}
    >
      {letter}
    </div>
  );
}
