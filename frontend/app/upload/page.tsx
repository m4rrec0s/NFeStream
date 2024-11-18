"use client"

import Header from "../_components/header"
import { useState } from "react"
import axiosClient from "../_services/axiosClient"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../_components/ui/alert-dialog"
import { Input } from "../_components/ui/input"

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      setShowConfirmation(true)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setShowConfirmation(false)

    const formData = new FormData()
    formData.append("file", file)

    try {
      await axiosClient.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      alert("Upload successful!")
    } catch (error) {
      console.error("Erro ao fazer upload:", error)
      alert("Upload failed!")
    } finally {
      setIsUploading(false)
      setFile(null)
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="flex-grow px-5">
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center">
            <h2 className="text-5xl font-medium max-sm:text-4xl">
              Carregue suas NF-es{" "}
            </h2>
            <p className="text-lg font-light text-gray-400">
              Apenas arquivos .xml
            </p>
            <div className="mt-6 w-full">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Input
                    type="file"
                    name="file"
                    placeholder="Adicione aqui seu aquivo XML"
                    accept=".xml"
                    onChange={handleFileChange}
                  />
                </AlertDialogTrigger>
                {showConfirmation && (
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmação</AlertDialogTitle>
                      <AlertDialogDescription>
                        Você quer mesmo fazer upload do arquivo?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleUpload}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}
              </AlertDialog>
              {showConfirmation && (
                <AlertDialog>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmação</AlertDialogTitle>
                      <AlertDialogDescription>
                        Você quer mesmo fazer upload do arquivo?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={handleUpload}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => setShowConfirmation(false)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              {isUploading && (
                <div className="mt-4">
                  <p>Enviando arquivo...</p>
                  <div className="h-2 w-full bg-gray-200">
                    <div className="h-full w-1/2 animate-pulse bg-blue-500"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPage
