"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, ImageIcon, Check, AlertCircle } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onUploadComplete?: (imageUrl: string) => void
  hotelId?: number
}

export function ImageUpload({ onUploadComplete, hotelId }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)

    // Reset status
    setUploadStatus("idle")
    setErrorMessage(null)

    // Create preview
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    setUploadStatus("idle")
    setErrorMessage(null)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      if (hotelId) {
        formData.append("hotelId", hotelId.toString())
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload image")
      }

      setUploadStatus("success")

      // Call the callback with the image URL
      if (onUploadComplete && data.imageUrl) {
        onUploadComplete(data.imageUrl)
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      setUploadStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Upload Hotel Image</CardTitle>
        <CardDescription>Upload images for your hotel listing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={triggerFileInput}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

            {preview ? (
              <div className="relative h-48 w-full">
                <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-contain rounded-md" />
              </div>
            ) : (
              <div className="py-8">
                <div className="flex justify-center mb-2">
                  <Upload className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">Click to select an image or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF up to 5MB</p>
              </div>
            )}
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center">
                <ImageIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
              </div>
              <span className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          )}

          {uploadStatus === "success" && (
            <div className="flex items-center text-green-600 bg-green-50 p-2 rounded">
              <Check className="h-5 w-5 mr-2" />
              <span className="text-sm">Image uploaded successfully!</span>
            </div>
          )}

          {uploadStatus === "error" && (
            <div className="flex items-center text-red-600 bg-red-50 p-2 rounded">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="text-sm">{errorMessage || "Failed to upload image"}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      </CardFooter>
    </Card>
  )
}
