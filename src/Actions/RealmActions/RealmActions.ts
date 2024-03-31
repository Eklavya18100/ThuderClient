import { UserInfo } from "@/Constant/Utilities";
import { fetchData } from "@/Constant/apiUtils";

async function getAllRealms() {
    return await fetchData(
      `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${UserInfo?.realm_access?.roles?.includes("default-roles-master") ? "master" : import.meta.env.VITE_KEYCLOAK_REALM}/ui-ext/realms?`,
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
        },
        method: 'GET',
      }
    )
  }
async function getAllSessions() {
    return await fetchData(
      `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem("realm") ?localStorage.getItem("realm"): import.meta.env.VITE_KEYCLOAK_REALM}/ui-ext/sessions?first=0&type=ALL&search=`,
      {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
        },
        method: 'GET',
      }
    )
  }

export { getAllRealms,getAllSessions }