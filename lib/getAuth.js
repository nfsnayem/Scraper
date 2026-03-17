export default function getAuth() {
  const wpUser = process.env.WP_USER;
  const wpAppPassword = process.env.WP_APP_PASSWORD;

  if (!wpUser || !wpAppPassword) {
    throw new Error(
      'Environment variables WP_USER and WP_APP_PASSWORD must be defined'
    );
  }

  const auth = Buffer.from(`${wpUser}:${wpAppPassword}`).toString('base64');
  return auth;
}
