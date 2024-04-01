/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import {
  addSubmissionComment,
  deleteSubmissionComment,
  getAllSubmissions,
} from '@/Actions/Submissions/SubmissionsActions'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import moment from 'moment'
import Modals from './Component/Modal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
export default function Dashboard() {
  const [submissions, setSubmissions] = useState([])
  const [values, setValues] = useState<any>({})
  const [drawerData, setDrawerData] = useState<any>({})
  const [comment, setComment] = useState<any>('')

  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [commentEditModal, setCommentEditModal] = useState(false)
  useEffect(() => {
    getAllSubmission()
  }, [])

  function getAllSubmission(courseId?: any, assignmentId?: any) {
    getAllSubmissions({
      courseId: courseId ? courseId : '1',
      assignmentId: assignmentId ? assignmentId : '1',
    })
      .then(({ data: res }) => {
        setSubmissions(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleModal() {
    setModal(true)
  }

  function handleChange(e: any) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    getAllSubmission(values?.courseId, values?.assignmentId)
    setModal(false)
  }

  function handleDrawer(data: any) {
    setDrawer(true)
    setDrawerData(data)
  }

  function handleEditComment(comment?: any) {
    console.log(comment)

    setCommentEditModal(true)
    setComment(comment?.comment)
  }

  function handleCommentChange(e: any) {
    setComment(e.target.value)
  }

  function handleCommentSave() {
    const data = {
      courseId: values?.courseId,
      assignmentId: values?.assignmentId,
      userId: drawerData?.user_id,
    }
    addSubmissionComment(data, comment)
      .then(({ data: _res, status }) => {
        if (status === 200) {
          return getAllSubmission(values?.courseId, values?.assignmentId)
        }
      })
      .then(() => {
        setCommentEditModal(false)
        setDrawer(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function handleCommentDelete(comments: any) {
    const data = {
      courseId: values?.courseId,
      assignmentId: values?.assignmentId,
      submissionId: drawerData?.id,
      commentId: comments?.id,
    }
    deleteSubmissionComment(data)
      .then(({ data: _res, status }) => {
        if (status === 200) {
          return getAllSubmission(values?.courseId, values?.assignmentId)
        }
      })
      .then(() => {
        setDrawer(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <Layout>
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='space-y-4 py-0'>
        <Card className='w-full'>
          <div className='grid grid-cols-2'>
            <div>
              <CardHeader>
                <CardTitle>Submissions</CardTitle>
                <CardDescription>
                  All the submissions are listed below.
                </CardDescription>
              </CardHeader>
            </div>
            <div>
              <CardHeader className='float-right'>
                <Button className='w-[100px]' onClick={handleModal}>
                  Assign Ids
                </Button>
              </CardHeader>
            </div>
          </div>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment id</TableHead>
                  <TableHead>Submission id</TableHead>
                  <TableHead>Submission type</TableHead>
                  <TableHead>Comment Count</TableHead>
                  <TableHead>Submitted at</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions?.map((submission: any) => (
                  <TableRow
                    key={submission?.id}
                    className='cursor-pointer'
                    onClick={() => handleDrawer(submission)}
                  >
                    <TableCell className='font-medium'>
                      {submission?.assignment_id}
                    </TableCell>
                    <TableCell>{submission?.id}</TableCell>
                    <TableCell>{submission?.submission_type}</TableCell>
                    <TableCell>
                      {submission?.submission_comments?.length}
                    </TableCell>
                    <TableCell>
                      {moment(submission?.submitted_at).format('LTS')}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDrawer(submission)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Modals
          modal={modal}
          setModal={setModal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <Sheet open={drawer} onOpenChange={setDrawer}>
          <SheetContent className='w-[900px] !max-w-[900px] sm:w-[6000px]'>
            <SheetHeader>
              <SheetTitle>View Comments</SheetTitle>
            </SheetHeader>
            <div className='grid gap-4 py-4'>
              <Card className='w-full'>
                <div className='grid grid-cols-2'>
                  <div>
                    <CardHeader>
                      <CardTitle>Comments</CardTitle>
                      <CardDescription>
                        All the Comments are listed below.
                      </CardDescription>
                    </CardHeader>
                  </div>
                  <div>
                    <CardHeader className='float-right'>
                      <Button className='w-auto' onClick={handleEditComment}>
                        Add Comment
                      </Button>
                    </CardHeader>
                  </div>
                </div>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Comment id</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>Author Name</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {drawerData?.submission_comments?.map((comments: any) => (
                        <TableRow key={comments?.id}>
                          <TableCell className='font-medium'>
                            {comments?.id}
                          </TableCell>
                          <TableCell>{comments?.comment}</TableCell>
                          <TableCell>{comments?.author_name}</TableCell>
                          <TableCell>
                            {moment(comments?.created_at).format('LTS')}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant='ghost'
                                  className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
                                >
                                  <DotsHorizontalIcon className='h-4 w-4' />
                                  <span className='sr-only'>Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align='end'
                                className='w-[160px]'
                              >
                                <DropdownMenuItem
                                  onClick={() => handleEditComment(comments)}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleCommentDelete(comments)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </SheetContent>
        </Sheet>
        <Dialog open={commentEditModal} onOpenChange={setCommentEditModal}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Edit Comment</DialogTitle>
              <DialogDescription>
                Make changes to your Comment here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='comment' className='text-right'>
                  Comment
                </Label>
                <Input
                  id='comment'
                  name='comment'
                  value={comment}
                  className='col-span-3'
                  onChange={handleCommentChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit' onClick={handleCommentSave}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </LayoutBody>
    </Layout>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
  },
]
