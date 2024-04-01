import { http } from '@/Constant/apiUtils'

const getAllSubmissions = async (data: any) =>
  await http.post(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}?token=${localStorage.getItem(
      'token'
    )}`
  )
const addSubmissionComment = async (data: any, payload: any) =>
  await http.put(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}/${data.userId}?token=${localStorage.getItem(
      'token'
    )}&comment=${payload}`
  )
const deleteSubmissionComment = async (data: any) =>
  await http.delete(
    `${
      import.meta.env.VITE_LMS_BACKEND_URL
    }submissions/${data.courseId}/${data.assignmentId}/${data.submissionId}/${data.commentId}?token=${localStorage.getItem(
      'token'
    )}`
  )

export { getAllSubmissions, addSubmissionComment, deleteSubmissionComment }
