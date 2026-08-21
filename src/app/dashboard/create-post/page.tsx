"use client";

import { useUser } from "@clerk/nextjs";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
import { FiAlertCircle, FiUploadCloud, FiSend } from "react-icons/fi";
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
      setImageUploadProgress("10");

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary cloud name or upload preset is missing.");
      }

      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", uploadPreset);

      setImageUploadProgress("50");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error?.message || "Failed to upload image to Cloudinary");
      }

      setImageUploadProgress(null);
      setImageUploadError(null);
      setFormData((prev: any) => ({ ...prev, image: data.secure_url }));
    } catch (error: any) {
      setImageUploadError(error.message || "Image upload failed");
      setImageUploadProgress(null);
      console.error("Cloudinary upload error:", error);
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
        <p className="font-serif italic text-lg text-muted-foreground animate-pulse">Loading scribe desk...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="font-cinzel text-xl font-bold text-destructive">Unauthorized Access</p>
      </div>
    );
  }

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return (
      <div className="p-6 md:p-12 max-w-4xl mx-auto min-h-screen space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-cinzel font-bold tracking-widest uppercase">
            Writing Chamber
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Scribe a New <span className="editorial-gradient-text font-serif italic">Piece</span>
          </h1>
          <p className="font-serif text-muted-foreground">Share poetry, reflections, or essays with your readers.</p>
        </div>

        <form className="space-y-6 bg-card/60 backdrop-blur-sm border border-border/70 rounded-3xl p-6 sm:p-10 shadow-sm" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-cinzel text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter a captivating title..."
                required
                className="bg-background/80 border-border/70 rounded-xl font-serif text-base"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="font-cinzel text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Circle / Genre
              </Label>
              <Select 
                defaultValue="uncategorized"
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="category" className="bg-background/80 border-border/70 rounded-xl">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uncategorized">Uncategorized</SelectItem>
                  <SelectItem value="poem">Poem & Verse</SelectItem>
                  <SelectItem value="journal">Journal</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="ai">AI Reflection</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="font-cinzel text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Featured Image
            </Label>
            <div className="flex flex-col sm:flex-row gap-4 items-center p-6 border-2 border-dashed border-border/80 rounded-2xl bg-muted/20 transition-colors hover:bg-muted/30">
              <Input
                type="file"
                accept="image/*"
                className="bg-transparent border-none cursor-pointer flex-1 text-sm font-serif"
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
                size="sm"
                onClick={handleUploadImage}
                disabled={!!imageUploadProgress}
                className="rounded-full px-6 gap-2 font-cinzel text-xs font-bold"
              >
                {imageUploadProgress ? (
                  <div className="w-6 h-6">
                    <CircularProgressbar
                      value={parseInt(imageUploadProgress)}
                      text={`${imageUploadProgress}%`}
                      styles={{
                        text: { fontSize: '28px', fill: 'currentColor' },
                        path: { stroke: 'currentColor' }
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <FiUploadCloud className="h-4 w-4" />
                    Upload Image
                  </>
                )}
              </Button>
            </div>
          </div>

          {imageUploadError && (
            <Alert variant="destructive" className="rounded-2xl">
              <FiAlertCircle className="h-4 w-4" />
              <AlertTitle>Upload Failed</AlertTitle>
              <AlertDescription>{imageUploadError}</AlertDescription>
            </Alert>
          )}

          {formData.image && (
            <div className="relative group rounded-2xl overflow-hidden border border-border/80 shadow-md aspect-[16/9] w-full">
              <Image
                src={formData.image}
                alt="upload"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label className="font-cinzel text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Prose & Content
            </Label>
            <div className="bg-background rounded-2xl border border-border/70 overflow-hidden min-h-[400px]">
              <ReactQuill
                theme="snow"
                value={formData.content || ''}
                placeholder="Unfurl your words..."
                className="h-[340px] mb-12"
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
            className="w-full font-cinzel text-xs font-bold tracking-wider h-12 rounded-full bg-primary text-primary-foreground hover:opacity-90 shadow-md gap-2"
          >
            <FiSend className="h-4 w-4" />
            Publish Dispatch
          </Button>

          {publishError && (
            <Alert variant="destructive" className="rounded-2xl">
              <FiAlertCircle className="h-4 w-4" />
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
        <h1 className="font-cinzel text-3xl font-bold text-destructive">Access Restricted</h1>
        <p className="font-serif text-muted-foreground">Admin privileges are required to scribe posts.</p>
        <Button onClick={() => router.push('/')} className="rounded-full">Return Home</Button>
      </div>
    );
  }
}
