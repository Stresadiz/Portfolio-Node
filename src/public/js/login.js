/* eslint-disable no-undef */
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const errorDiv = document.getElementById('divError');

    try {
        const methodRes = 'POST';
        const headersRes = {'Content-Type': 'application/json'}
        const bodyRes = JSON.stringify(data)
        
        const res = await fetch('/api/auth/login', {
            method: methodRes,
            headers: headersRes,
            body: bodyRes
        })

        const result = await res.json()

        if (res.ok) {
            localStorage.setItem('bearer_token', result.bearer_token);
            window.location.href = '/dashboard'
        } else{
            errorDiv.textContent = result.error || 'Credenciales inválidas';
            errorDiv.style.display = 'block';
        }

    } catch (error) {
        console.error('Error en el login:', error);
        errorDiv.textContent = 'Error de conexión con el servidor';
        errorDiv.style.display = 'block';
    }
})