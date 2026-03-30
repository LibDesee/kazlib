export interface User {
    id: number;
    name: string;
    role: "Student" | "Teacher" | "Admin";
    grade?: string;
    school?: string;
    avatar: string;
    status: "online" | "offline";
    email?: string;
    phone?: string;
    interests?: string[];
    bio?: string;
    lastMessage?: string; // For social page
    lastMessageTime?: string; // For social page
}

export const USERS: User[] = [
    {
        id: 1,
        name: "Aizere M.",
        role: "Student",
        grade: "11A",
        school: "NIS PhM Almaty",
        avatar: "A",
        status: "online",
        email: "aizere.m@example.com",
        interests: ["Math", "Physics", "Robotics"],
        bio: "Aspiring engineer. Love solving complex problems.",
        lastMessage: "Did you finish the math hw?",
        lastMessageTime: "10:30"
    },
    {
        id: 2,
        name: "Mr. Smith",
        role: "Teacher",
        grade: "Physics",
        school: "NIS PhM Almaty",
        avatar: "S",
        status: "offline",
        email: "j.smith@example.com",
        interests: ["Quantum Physics", "Astronomy", "Chess"],
        bio: "Physics teacher with 10 years of experience.",
        lastMessage: "Don't forget the deadline.",
        lastMessageTime: "Yesterday"
    },
    {
        id: 3,
        name: "Alikhan B.",
        role: "Student",
        grade: "11A",
        school: "NIS PhM Almaty",
        avatar: "AB",
        status: "online",
        email: "alikhan.b@example.com",
        interests: ["Basketball", "CS", "Video Games"],
        bio: "Ball is life.",
        lastMessage: "Practice at 5 PM!",
        lastMessageTime: "Mon"
    },
    {
        id: 4,
        name: "Dana K.",
        role: "Student",
        grade: "10B",
        school: "NIS PhM Almaty",
        avatar: "D",
        status: "offline",
        email: "dana.k@example.com",
        interests: ["Art", "Literature", "History"],
        bio: "Bookworm and artist.",
        lastMessage: "Let's meet at the library.",
        lastMessageTime: "Sun"
    },
    // Add current user for completeness if needed, or handle separately
    {
        id: 999, // Current User ID
        name: "Nurik",
        role: "Student",
        grade: "12C",
        school: "NIS PhM Almaty",
        avatar: "N",
        status: "online",
        email: "nurik@example.com",
        interests: ["Coding", "AI", "Startup"],
        bio: "Building the future."
    }
];
