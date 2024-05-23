import { Button } from '@/components/custom/button'
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Modals({
  modal,
  setModal,
  handleChange,
  handleSubmit,
  loading,
}: any) {
  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Please enter your CityU email address and password.
          </DialogDescription>
        </DialogHeader>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>CityU Email</Label>
            <Input
              id='email'
              name='email'
              type='text'
              onChange={handleChange}
              className='col-span-3'
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='username'>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              onChange={handleChange}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            loading={loading?.idAssignLoader}
            type='submit'
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
