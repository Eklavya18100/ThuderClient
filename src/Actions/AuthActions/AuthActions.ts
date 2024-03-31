import { UserInfo } from "@/Constant/Utilities"
import { fetchData } from "@/Constant/apiUtils"

 const loginAction = async (data: any) => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  const requestOptions: any = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow',
  }
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}realms/${localStorage.getItem("realm") ?localStorage.getItem("realm"): import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect/token`,
    requestOptions
  )
}
async function logoutAction() {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${UserInfo?.sub}/logout`,
    {
      headers: {
        authorization:
          `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
      },
      method: 'POST',
    }
  )
}



export { loginAction ,logoutAction}
