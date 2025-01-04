import { paths } from "@/app/constants/paths";
import { Link } from "react-router-dom";

export function DevIndexPage() {
  const pathsLinks: [string, string][] = Object.entries(paths);
  return (
    <ul>
      {pathsLinks.map(([key, value]) => (
        <li key={key}>
          <Link to={value}>{key}</Link>
        </li>
      ))}
    </ul>
  );
}
