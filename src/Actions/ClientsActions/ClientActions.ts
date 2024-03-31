import { fetchData } from '@/Constant/apiUtils'

async function getKeycloakClients() {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/clients`,
    {
      headers: {
        'content-type': 'application/json',
        authorization:
          `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
      },
      method: 'GET',
    }
  )
}
async function getKeycloakClientUsers(id:string,roleName:string) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/clients/${id}/roles/${roleName}/users?first=0&max=101`,
    {
      headers: {
        'content-type': 'application/json',
        authorization:
          `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
      },
      method: 'GET',
    }
  )
}
async function getKeycloakClientsRoles(id: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/clients/${id}/roles`,
    {
      headers: {
        'content-type': 'application/json',
        authorization:
          `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
      },
      method: 'GET',
    }
  )
}
async function createClient(data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/clients`,
    {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        authorization:
          `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
      },
      method: 'POST',
    }
  )
}
async function deleteClient(id: number) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/clients/${id}`,
    {
      headers: {
        'content-type': 'application/json',
        authorization:
          `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
      },
      method: 'DELETE',
    }
  )
}
async function deleteClientRole(id: string) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/roles-by-id/${id}`,
    {
      headers: {
        'content-type': 'application/json',
        authorization:
          `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
      },
      method: 'DELETE',
    }
  )
}
async function updateClient(data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/clients/${data.id}`,
    {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        authorization:
          `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
      },
      method: 'PUT',
    }
  )
}
async function addClientRoles(data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/clients/${data.id}/roles`,
    {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        authorization:
          `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
      },
      method: 'POST',
    }
  )
}
async function updateClientRoles(data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/clients/${data.id}/roles/${data.name}`,
    {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        authorization:
          `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
      },
      method: 'PUT',
    }
  )
}

export {
  getKeycloakClients,
  createClient,
  deleteClient,
  updateClient,
  addClientRoles,
  updateClientRoles,
  getKeycloakClientsRoles,
  deleteClientRole,
  getKeycloakClientUsers
}
