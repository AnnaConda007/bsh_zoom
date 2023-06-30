const clientId = 'wYILEd3tQnCCk4CE6Jihxg';
const clientSecret = 'NNbxQM8o1zvN6S7GWLobx1u4u0hztbCB';
const redirectUri = 'http://localhost:5173/bsh-zoom';
const zoomTokenUrl = 'https://zoom.us/oauth/authorize';

const exchangeCodeForToken = async (code) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);

    const headers = new Headers();
    headers.append('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: params,
        redirect: 'follow',
    };

    try {
        const response = await fetch(zoomTokenUrl, requestOptions);

        const data = await response.json();

       if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to exchange code for access token, status: ${response.status}, message: ${errorText}`);
}

        return data.access_token;
    } catch (error) {
        console.error('Error exchanging code for access token:', error);
        throw new Error('Failed to exchange code for access token');
    }
};

export default exchangeCodeForToken;
