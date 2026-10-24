import type {XPost, XUser} from './types.ts';

export interface XClient {
  getMe(): Promise<XUser>;

  createPost(input: {
    text: string;
    mediaIds?: string[];
    replyToId?: string;
  }): Promise<XPost>;

  deletePost(id: string): Promise<void>;

  uploadMedia(file: {
    path: string;
    mimeType: string;
  }): Promise<{ mediaId: string }>;
}
