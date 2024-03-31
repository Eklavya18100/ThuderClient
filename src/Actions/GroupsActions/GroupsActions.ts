import { fetchData } from '@/Constant/apiUtils'

async function getKeycloakGroups() {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/groups`,
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
async function getKeycloakChildGroups(groupId: string) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/groups/${groupId}/children?first=0&max=101`,
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
async function getKeycloakGroupMembers(groupId: string) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/groups/${groupId}/members?first=0&max=101`,
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
async function deleteGroup(id: number) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/groups/${id}`,
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
async function deleteGroupMember(id: number,groupId:number) {
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
async function createGroups(data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/groups`,
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
async function createChildGroups(id: string, data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/groups/${id}/children`,
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
async function updateGroups(data: any) {
  return await fetchData(
    `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${localStorage.getItem('realm') ? localStorage.getItem('realm') : import.meta.env.VITE_KEYCLOAK_REALM}/groups/${data.id}`,
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
  getKeycloakChildGroups,
  getKeycloakGroups,
  deleteGroup,
  createGroups,
  updateGroups,
  createChildGroups,
  getKeycloakGroupMembers,
  deleteGroupMember
}
