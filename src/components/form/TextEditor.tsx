import 'react-quill/dist/quill.snow.css'

import { useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'

import uploadService from '@/api/upload'
import { FormHelperText } from '@mui/material'

import { FormComponentError } from './type'

type TextEditorType = {
  value?: string
  setValue: (_: string) => void
} & FormComponentError

const TextEditor = ({
  value,
  setValue,
  error = false,
  helperText = ''
}: TextEditorType) => {
  const quillRef = useRef<ReactQuill | null>(null)

  const imageUploadHandler = async () => {
    if (!quillRef?.current) return
    const editor = quillRef.current.getEditor()
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (editor && file && /^image\//.test(file.type)) {
        const formData = new FormData()
        formData.append('module', 'post')
        formData.append('file', file)
        const { data } = await uploadService.uploadFile(formData) // upload data into server or aws or cloudinary
        const url = data?.secure_url
        const selection = editor.getSelection()?.index
        if (selection) editor.insertEmbed(selection, 'image', url)
      } else {
        // ErrorToast('You could only upload images.')
      }
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' }
          ],
          ['image', 'link']
        ],
        handlers: {
          image: imageUploadHandler
        }
      }
    }),
    []
  )

  return (
    <>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
      />
      {<FormHelperText error={error}>{helperText}</FormHelperText>}
    </>
  )
}

export default TextEditor
