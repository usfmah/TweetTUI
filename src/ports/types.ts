export type XUserMetrics = {
    posts: number; 
    followers: number; 
    following: number; 
    likes: number; 
}

export type XUser = {
    id: string; 
    name: string; 
    handle: string; 
    bio: string; 
    avatarURL: string; 
    metrics: XUserMetrics;
}

export type XPost = {
    id: string; 
    text: string; 
    createdAt: string; //ISO date Time
    mediaIDs: string[];
}

export class AuthExpired extends Error {
    constructor(message = 'Your login has expired') {
        super(message); 
        this.name = 'AuthExpired'; 
    }
}

export class RateLimited extends Error {
  constructor(public resetAt?: Date) {
    super("Rate limited by X");
    this.name = "RateLimited";
  }
}

export class OutOfCredits extends Error {
  constructor() {
    super("Your X API credits have run out");
    this.name = "OutOfCredits";
  }
}

export class NetworkError extends Error {
  constructor(message = "Network error") {
    super(message);
    this.name = "NetworkError";
  }
}
