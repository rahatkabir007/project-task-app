const registerUser= async (data)=> {
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
    }
}

const loginUser=async (data)=> {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const { token } = await response.json();
    return token;
}

const  getUserByEmail = async (email)=> {
    const response = await fetch(`/api/user?email=${email}`);
    const userData = await response.json();
    return userData;
}


export { registerUser, loginUser, getUserByEmail };