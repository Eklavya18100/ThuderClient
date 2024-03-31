import { fetchData } from '@/Constant/apiUtils'

async function getKeycloakUsers() {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users`,
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
async function getKeycloakUserProfile(id: string) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${id}?userProfileMetadata=true`,
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
async function getKeycloakUserGroup(id: number) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${id}/groups?first=0&max=101`,
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
async function getKeycloakUserRoles(id: number) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${id}/role-mappings`,
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
async function getKeycloakUserAvailableRoles(id: number) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${id}/role-mappings/realm/available?first=0&max=101`,
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
async function getKeycloakUserClientAvailableRoles(id: number) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/ui-ext/available-roles/users/${id}?first=0&max=101&search=`,
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
async function deleteUser(id: number) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${id}`,
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
async function deleteUserGroups(id: any, groupId: string) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${id}/groups/${groupId}`,
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
async function deleteUserRole(id: any, data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${id}/role-mappings/realm`,
    {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        authorization:
          `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
      },
      method: 'DELETE',
    }
  )
}
async function deleteUserClientRole(id: any, clientId: string, data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${id}/role-mappings/clients/${clientId}`,
    {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        authorization:
          `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
      },
      method: 'DELETE',
    }
  )
}
async function impersonateUser(payload: {
  realm: string
  id: string
  token: string
}) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${payload.id}/impersonation`,
    {
      credentials: 'include',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        authorization:
          `Bearer ${localStorage.getItem('Keycloak_token')}` as string,
      },
      method: 'POST',
    }
  )
}
async function createUsers(data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users`,
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
async function assignUserRoles(id: string, data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${id}/role-mappings/realm`,
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
async function assignUserClientRoles(id: string, clientId: string, data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${id}/role-mappings/clients/${clientId}`,
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
async function updateUser(data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${data.id}`,
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
async function updateUserGroup(data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/users/${data.id}/groups/${data.groupId}`,
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
  getKeycloakUsers,
  deleteUser,
  impersonateUser,
  createUsers,
  updateUser,
  getKeycloakUserGroup,
  updateUserGroup,
  deleteUserGroups,
  getKeycloakUserProfile,
  getKeycloakUserRoles,
  getKeycloakUserAvailableRoles,
  getKeycloakUserClientAvailableRoles,
  deleteUserRole,
  assignUserRoles,
  assignUserClientRoles,
  deleteUserClientRole,
}
