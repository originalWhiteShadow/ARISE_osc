import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./config";

// --- Schema Interfaces ---

export interface UserProfile {
  uid: string;
  name: string | null;
  email: string | null;
  role: 'super_admin' | 'admin' | 'maintainer' | 'contributor' | 'viewer';
  qr_code: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  maintainers: string[]; // Array of user UIDs
}

export interface Task {
  id: string;
  project_id: string;
  assigned_user: string | null;
  status: 'Open' | 'In Progress' | 'Completed';
  title: string;
}

// --- Helper Functions ---

/**
 * Creates or retrieves a user profile in Firestore upon authentication.
 * Generates the automatic QR code schema according to roadmap requirements.
 */
export async function syncUserProfile(uid: string, name: string | null, email: string | null) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  
  // Assign Super Admin privileges to specific emails
  const targetRole = email === "whiteshadowpoorna@gmail.com" ? "super_admin" : "viewer";
  
  if (!snap.exists()) {
    const newUser: UserProfile = {
      uid,
      name,
      email,
      role: targetRole, 
      qr_code: `arise-member-${uid.substring(0, 8)}`, // Custom ID QR Generator mapping
      createdAt: new Date()
    };
    await setDoc(userRef, newUser);
    return newUser;
  }
  
  const existingData = snap.data() as UserProfile;
  
  // Force upgrade existing profile if they are designated as admin
  if (email === "whiteshadowpoorna@gmail.com" && existingData.role !== "super_admin") {
    existingData.role = "super_admin";
    await setDoc(userRef, { role: "super_admin" }, { merge: true });
  }
  
  return existingData;
}

/**
 * Retrieves all open projects from the platform.
 */
export async function getProjects(): Promise<Project[]> {
  const projectsRef = collection(db, "projects");
  const snap = await getDocs(projectsRef);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Project));
}
