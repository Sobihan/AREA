export async function OAuthGoogle(response) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: response
  };
  const api_response = await fetch('/api/v1/google-auth', requestOptions);
  console.log(api_response);
}