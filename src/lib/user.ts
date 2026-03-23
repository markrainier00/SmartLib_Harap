import { useState, useEffect } from "react";

export function useUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Failed to parse user");
      }
    }
  }, []);

  
  return {
    user,
    firstName: user?.firstname  || "",
    lastName:  user?.lastname   || "",
    fullName:  user ? `${user.firstname} ${user.lastname}` : "",
    email:     user?.email      || "",
    school_id:  user?.school_id  || "",
    year: user?.year || "",
    department: user?.department || "",
    program:   user?.program    || "",
    role:      user?.role       || "",
    initial:   user?.firstname?.charAt(0).toUpperCase() || "?",
  };
}