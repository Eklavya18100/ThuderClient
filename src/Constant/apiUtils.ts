import { toast } from '@/components/ui/use-toast'

async function fetchData(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, options)
    if (response.status === 403) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You are not authorized to perform this action',
      })
      setTimeout(() => {
        localStorage.clear()
        window.location.href = '/sign-in-2'
      }, 2000)
    }
    if (options.method === 'GET') {
      return response.json()
    }

    return response
  } catch (error) {
    localStorage.clear()
    window.location.href = '/sign-in-2'
    throw new Error(error as string)
  }
}

export { fetchData }
