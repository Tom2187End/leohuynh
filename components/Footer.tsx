import { siteMetadata } from '~/data/siteMetadata'
import { Link } from './Link'
import { SocialIcon } from './SocialIcon'

export function Footer() {
  return (
    <footer>
      <div className="mt-16 mb-8 flex flex-col items-center space-y-3">
        <div className="flex space-x-4">
          <SocialIcon name="Github" href={siteMetadata.github} />
          <SocialIcon name="Twitter" href={siteMetadata.twitter} />
          <SocialIcon name="Linkedin" href={siteMetadata.linkedin} />
          <SocialIcon name="Mail" href={`mailto:${siteMetadata.email}`} />
          <SocialIcon name="Facebook" href={siteMetadata.facebook} />
          <SocialIcon name="Youtube" href={siteMetadata.youtube} />
        </div>
        <div className="my-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`Copyright © ${new Date().getFullYear()}`}</div>
          <span>{` • `}</span>
          <Link href="/">{siteMetadata.footerTitle}</Link>
        </div>
        {/* <Credit /> */}
      </div>
    </footer>
  )
}

function Credit() {
  return (
    <div className="text-sm text-gray-500 dark:text-gray-400">
      <span className="font-bold">Credit : </span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-500"
        href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
      >
        Tailwind Nextjs Theme
      </a>
      <span> by </span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-500"
        href="https://twitter.com/timlrxx"
      >
        Timothy Lin
      </a>
    </div>
  )
}
