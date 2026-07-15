import { Link } from 'react-router-dom'

/**
 * FooterLinks
 *
 * Renders a column of footer navigation links with premium styling.
 *
 * @param {{ title: string, links: Array<{ label: string, path: string }> }} props
 */
export default function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-heading font-semibold text-white mb-5 uppercase tracking-wider">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map(({ label, path }) => (
          <li key={label}>
            <Link
              to={path}
              className="text-sm text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
