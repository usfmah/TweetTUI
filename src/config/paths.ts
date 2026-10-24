import path from "node:path"
import { mkdir } from "node:fs/promises";
import os from 'node:os';

export function getConfigPath()  {
    
    const tweetuiHome: string | undefined = process.env.TWEETUI_HOME;
    const configHome: string | undefined = process.env.XDG_CONFIG_HOME
    if (tweetuiHome) {
        return tweetuiHome;
    }
    
    else if (configHome) {
        return path.join(configHome, 'tweetui');
    }
 
    else {
        return path.join(os.homedir(), '.config', 'tweetui');
    }
}

export async function ensureConfigDir() {
    const dir = getConfigPath();
    await mkdir(dir, { recursive: true });
    return dir; 
}
