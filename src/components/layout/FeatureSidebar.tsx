import { NavLink } from "react-router-dom";

const features = [
  {
    path: "/feature/avatar-sync",
    label: "Avatar Sync Studio",
  },
  {
    path: "/feature/text-to-avatar",
    label: "Text-to-Avatar Studio",
  },
  {
    path: "/feature/wishes-generator",
    label: "Personalized Wishes Generator",
  },
  {
    path: "/feature/intellitutor",
    label: "IntelliTutor",
  },
];

const FeatureSidebar = () => (
  <aside className="w-full md:w-64 bg-card border-r border-border min-h-screen flex flex-col p-4">
    <nav className="flex flex-col gap-2">
      {features.map((feature) => (
        <NavLink
          key={feature.path}
          to={feature.path}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-medium text-left transition-colors duration-200 ${
              isActive
                ? "bg-primary text-primary-foreground shadow"
                : "hover:bg-secondary text-foreground"
            }`
          }
        >
          {feature.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default FeatureSidebar;
