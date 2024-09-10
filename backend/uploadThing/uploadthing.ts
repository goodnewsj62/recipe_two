import { createUploadthing, type FileRouter } from 'uploadthing/express';

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
    },
  }).onUploadComplete((data) => {
    console.log('upload completed', data);
    return { url: data.file.url };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
