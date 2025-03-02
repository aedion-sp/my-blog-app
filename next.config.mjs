const isDev = process.argv.indexOf('dev') !== -1
const isBuild = process.argv.indexOf('build') !== -1
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1'
  const { build } = await import('velite')
  await build({ watch: isDev, clean: !isDev })
}

const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'my'],
  }
}

/** @type {import('next').NextConfig} */
export default nextConfig;