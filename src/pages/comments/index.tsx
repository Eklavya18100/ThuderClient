import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import MainComponent from './common/MainComponent'
import {
  createObjectFromArray,
  hasNonEmptyKeysAndValues,
  validateInputs,
} from '@/Constant/Utilities'
import axios from 'axios'
export default function Dashboard() {
  const [paramsRow, setparamsRow] = useState<any>([
    {
      key: '',
      value: '',
    },
  ])
  const [headersRow, setheadersRow] = useState<any>([
    {
      key: '',
      value: '',
    },
  ])
  const [BodyRow, setBodyRow] = useState<any>([
    {
      key: '',
      value: '',
    },
  ])
  const [values, setValues] = useState<any>({
    url: '',
    requestValue: 'PUT',
  })
  const [response, setResponse] = useState({})
  const [errors, setErrors] = useState({})
  const [bodyType, setBodyType] = useState('text')
  function buildUrl(paramsRowNew: { key: string; value: string }[]) {
    const baseUrl = values.url.split('?')[0]
    const queryParams = paramsRowNew
      .map(({ key, value }, index) => {
        const separator = index === 0 ? '?' : '&'
        return `${separator}${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      })
      .join('')

    return `${baseUrl}${queryParams}`
  }
  function handleparamsChange(index: any, e: any) {
    const paramsRowNew = [...paramsRow]
    let item = paramsRow[index]
    item = { ...item, [e.target.name]: e.target.value }
    paramsRowNew[index] = item
    setparamsRow(paramsRowNew)
    const newUrl = buildUrl(paramsRowNew)
    setValues((prevValues: any) => ({ ...prevValues, url: newUrl }))
  }
  function HandleAddRow() {
    setparamsRow([
      ...paramsRow,
      {
        key: '',
        value: '',
      },
    ])
  }
  function handleRowDelete(index: number) {
    const list = paramsRow.filter((_item: any, i: number) => i !== index)
    setparamsRow(list)
    const newUrl = buildUrl(list)
    setValues((prevValues: any) => ({ ...prevValues, url: newUrl }))
  }
  function handleheadersChange(index: any, e: any) {
    const headersRowNew = [...headersRow]
    let item = headersRow[index]
    item = { ...item, [e.target.name]: e.target.value }
    headersRowNew[index] = item
    setheadersRow(headersRowNew)
  }
  function HandleheadersAddRow() {
    setheadersRow([
      ...headersRow,
      {
        key: '',
        value: '',
      },
    ])
  }
  function handleheadersRowDelete(index: number) {
    const list = headersRow.filter((_item: any, i: number) => i !== index)
    setheadersRow(list)
  }
  function handleBodyChange(index: any, e: any) {
    const BodyRowNew = [...BodyRow]
    let item = BodyRow[index]
    if (e.target.type === 'file') {
      item = { ...item, [e.target.name]: e.target.files[0] }
    } else {
      item = { ...item, [e.target.name]: e.target.value }
    }
    BodyRowNew[index] = item
    console.log(BodyRowNew)

    setBodyRow(BodyRowNew)
  }
  function HandleBodyAddRow() {
    setBodyRow([
      ...BodyRow,
      {
        key: '',
        value: '',
      },
    ])
  }
  function handleBodyRowDelete(index: number) {
    const list = BodyRow.filter((_item: any, i: number) => i !== index)
    setBodyRow(list)
  }
  function handleURLChange(e: any) {
    const { value: newUrl } = e.target

    setValues({
      ...values,
      url: newUrl,
    })
    try {
      new URL(newUrl)
    } catch (error) {
      return
    }
    const url = new URL(newUrl)

    const paramsRowNew: { key: string; value: string }[] = []

    for (const [key, value] of url.searchParams.entries()) {
      paramsRowNew.push({ key, value })
    }
    setparamsRow(paramsRowNew)
  }
  function handleRequestChange(value: any) {
    setValues({ ...values, requestValue: value })
  }
  function handleTabChange(e: any) {
    const { name } = e.target
    setBodyRow([
      {
        key: '',
        value: '',
      },
    ])
    setheadersRow([
      {
        key: '',
        value: '',
      },
    ])
    setparamsRow([
      {
        key: '',
        value: '',
      },
    ])
    setValues({
      url: '',
      requestValue: '',
    })
    switch (name) {
      case 'editComment':
        setValues({
          requestValue: 'PUT',
        })
        break
      case 'deleteComment':
        setValues({
          requestValue: 'DELETE',
        })
        break
      case 'addComment':
        setValues({
          requestValue: 'PUT',
        })
        break

      default:
        break
    }
    setResponse({})
    setErrors({})
  }

  function handleBodyTypeChange(value: any) {
    setBodyType(value)
  }

  function onSubmit() {
    const validation = validateInputs(values)
    if (validation) {
      const config: any = {
        method: values.requestValue,
        url: values.url,
      }
      if (hasNonEmptyKeysAndValues(headersRow)) {
        config.headers = createObjectFromArray(headersRow, 'key', 'value')
      }
      if (hasNonEmptyKeysAndValues(paramsRow)) {
        config.params = createObjectFromArray(paramsRow, 'key', 'value')
      }
      if (hasNonEmptyKeysAndValues(BodyRow)) {
        if (bodyType === 'text') {
          config.data = createObjectFromArray(BodyRow, 'key', 'value')
        } else {
          const formData = new FormData()
          BodyRow.forEach((row: { value: string | Blob; key: string }) => {
            if (row.value instanceof File) {
              formData.append(row.key, row.value)
            } else {
              formData.append(row.key, row.value)
            }
          })
          config.data = formData
        }
      }
      axios
        .request(config)
        .then((response) => {
          console.log(response)

          setResponse(response)
        })
        .catch((error) => {
          setResponse({})
          setErrors(error)
        })
    }
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
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <TabsContent value='overview' className='space-y-4'>
            <Tabs defaultValue='editComment' className='w-auto'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger
                  value='editComment'
                  name='editComment'
                  onClick={handleTabChange}
                >
                  Edit Comment
                </TabsTrigger>
                <TabsTrigger
                  value='deleteComment'
                  name='deleteComment'
                  onClick={handleTabChange}
                >
                  Delete Comment
                </TabsTrigger>
                <TabsTrigger
                  value='addComment'
                  name='addComment'
                  onClick={handleTabChange}
                >
                  Add Comment
                </TabsTrigger>
              </TabsList>
              <TabsContent value='editComment'>
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Comment</CardTitle>
                    <CardDescription>
                      Make changes to your Comment here. Click save when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <MainComponent
                      data={{
                        requestValue: 'PUT',
                      }}
                      values={values}
                      response={response}
                      handleBodyTypeChange={handleBodyTypeChange}
                      onSubmit={onSubmit}
                      errors={errors}
                      handleURLChange={handleURLChange}
                      handleRequestChange={handleRequestChange}
                      handleparamsChange={handleparamsChange}
                      paramsRow={paramsRow}
                      HandleAddRow={HandleAddRow}
                      handleRowDelete={handleRowDelete}
                      handleheadersChange={handleheadersChange}
                      headersRow={headersRow}
                      HandleheadersAddRow={HandleheadersAddRow}
                      handleheadersRowDelete={handleheadersRowDelete}
                      handleBodyChange={handleBodyChange}
                      BodyRow={BodyRow}
                      HandleBodyAddRow={HandleBodyAddRow}
                      handleBodyRowDelete={handleBodyRowDelete}
                      bodyType={bodyType}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value='deleteComment'>
                <Card>
                  <CardHeader>
                    <CardTitle>Delete Comment</CardTitle>
                    <CardDescription>
                      Delete your Comment here. Click save when you're done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <MainComponent
                      data={{
                        requestValue: 'DELETE',
                      }}
                      values={values}
                      response={response}
                      onSubmit={onSubmit}
                      errors={errors}
                      handleBodyTypeChange={handleBodyTypeChange}
                      handleURLChange={handleURLChange}
                      handleRequestChange={handleRequestChange}
                      handleparamsChange={handleparamsChange}
                      paramsRow={paramsRow}
                      HandleAddRow={HandleAddRow}
                      handleRowDelete={handleRowDelete}
                      handleheadersChange={handleheadersChange}
                      headersRow={headersRow}
                      HandleheadersAddRow={HandleheadersAddRow}
                      handleheadersRowDelete={handleheadersRowDelete}
                      handleBodyChange={handleBodyChange}
                      BodyRow={BodyRow}
                      HandleBodyAddRow={HandleBodyAddRow}
                      handleBodyRowDelete={handleBodyRowDelete}
                      bodyType={bodyType}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value='addComment'>
                <Card>
                  <CardHeader>
                    <CardTitle>Add Comment</CardTitle>
                    <CardDescription>
                      Add your Comment here. Click save when you're done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <MainComponent
                      data={{
                        requestValue: 'PUT',
                      }}
                      values={values}
                      response={response}
                      errors={errors}
                      onSubmit={onSubmit}
                      handleBodyTypeChange={handleBodyTypeChange}
                      handleURLChange={handleURLChange}
                      handleRequestChange={handleRequestChange}
                      handleparamsChange={handleparamsChange}
                      paramsRow={paramsRow}
                      HandleAddRow={HandleAddRow}
                      handleRowDelete={handleRowDelete}
                      handleheadersChange={handleheadersChange}
                      headersRow={headersRow}
                      HandleheadersAddRow={HandleheadersAddRow}
                      handleheadersRowDelete={handleheadersRowDelete}
                      handleBodyChange={handleBodyChange}
                      BodyRow={BodyRow}
                      HandleBodyAddRow={HandleBodyAddRow}
                      handleBodyRowDelete={handleBodyRowDelete}
                      bodyType={bodyType}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
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
