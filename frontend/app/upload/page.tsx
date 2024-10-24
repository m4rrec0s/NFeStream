"use client"

import Header from "../_components/header"
import { DropZoneFile } from "../_components/ui/inputFile"

const UploadPage = () => {
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
              <DropZoneFile />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPage
