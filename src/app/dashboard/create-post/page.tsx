"use client";

import { useUser } from "@clerk/nextjs";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/firebase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { HiExclamationCircle } from "react-icons/hi";
import Image from 'next/image';

interface FormData {
  title?: string;
  category?: string;
  content?: string;
  image?: string;
}

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<string | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    category: "uncategorized"
  });
  const [publishError, setPublishError] = useState<string | null>(null);
  const router = useRouter();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData((prev: any) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!user) return;
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userMongoId: user.publicMetadata.userMongoId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        router.push(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg animate-pulse">Loading workspace...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-bold text-destructive">Unauthorized Access</p>
      </div>
    );
  }

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return (
      <div className="p-6 max-w-4xl mx-auto min-h-screen space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Create a New Post</h1>
          <p className="text-muted-foreground">Share your thoughts, poems, or stories with the world.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                placeholder="Enter a captivating title..."
                required
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                defaultValue="uncategorized"
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uncategorized">Uncategorized</SelectItem>
                  <SelectItem value="poem">Poem</SelectItem>
                  <SelectItem value="journal">Journal</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Featured Image</Label>
            <div className="flex flex-col sm:flex-row gap-4 items-center p-6 border-2 border-dashed rounded-xl bg-muted/30 transition-colors hover:bg-muted/50">
              <Input
                type="file"
                accept="image/*"
                className="bg-transparent border-none cursor-pointer flex-1"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setFile(files[0]);
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleUploadImage}
                disabled={!!imageUploadProgress}
                className="min-w-[140px]"
              >
                {imageUploadProgress ? (
                  <div className="w-10 h-10">
                    <CircularProgressbar
                      value={parseInt(imageUploadProgress)}
                      text={`${imageUploadProgress}%`}
                      styles={{
                        text: { fontSize: '24px', fill: 'currentColor' },
                        path: { stroke: 'currentColor' }
                      }}
                    />
                  </div>
                ) : (
                  "Upload"
                )}
              </Button>
            </div>
          </div>

          {imageUploadError && (
            <Alert variant="destructive">
              <HiExclamationCircle className="h-4 w-4" />
              <AlertTitle>Upload Failed</AlertTitle>
              <AlertDescription>{imageUploadError}</AlertDescription>
            </Alert>
          )}

          {formData.image && (
            <div className="relative group rounded-xl overflow-hidden border shadow-lg aspect-video w-full">
              <Image
                src={formData.image}
                alt="upload"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Content</Label>
            <div className="bg-background rounded-md border min-h-[400px]">
              <ReactQuill
                theme="snow"
                value={formData.content || ''}
                placeholder="Unleash your creativity..."
                className="h-[350px] mb-12"
                onChange={(value) => {
                  setFormData({ ...formData, content: value });
                }}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            disabled={!!imageUploadProgress}
            className="w-full font-bold text-lg h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
          >
            Publish Post
          </Button>

          {publishError && (
            <Alert variant="destructive">
              <HiExclamationCircle className="h-4 w-4" />
              <AlertTitle>Publishing Error</AlertTitle>
              <AlertDescription>{publishError}</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-4xl font-bold text-destructive">Access Denied</h1>
        <p className="text-muted-foreground">Admin privileges are required to create posts.</p>
        <Button onClick={() => router.push('/')}>Return Home</Button>
      </div>
    );
  }
}
