const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(data: {
    firstname: string;
    lastname: string;
    email: string;
    school_id: string;
    program: string;
    year: string;
    password: string;
}) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message || "Registration failed");
    }

    return json;
}