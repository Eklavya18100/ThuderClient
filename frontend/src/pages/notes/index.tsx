export default function Notes() {
  return (
    <>
      <h3> MySql</h3>
      <li>
        command to start mysql server: sudo
        /usr/local/mysql/support-files/mysql.server start
      </li>
      <li>run mysql: mysql -u root -p</li>

      <h3>Security issues need to be fixed</h3>
      <li>
        send a jwt token from backend on login and use that token to verify a
        user on every backend call. (1) jwt token implement (2) fix all
        endpoints and db to verify and store token
      </li>
      <li>hash passwords in frontend backend and db</li>
      <li>try removing everything from localStorage to redux</li>
    </>
  )
}
