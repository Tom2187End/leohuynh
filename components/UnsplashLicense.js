const UnsplashLicense = ({ photoURL, author }) => {
  return (
    <div className="text-right italic text-sm my-2">
      Photo by{' '}
      <a className="!no-underline" href={photoURL} target="_blank" rel="noreferrer">
        {author}
      </a>{' '}
      on{' '}
      <a className="!no-underline" href="https://unsplash.com/" target="_blank" rel="noreferrer">
        Unsplash
      </a>
    </div>
  )
}

export default UnsplashLicense
