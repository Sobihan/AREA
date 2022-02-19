import { useCookies } from 'react-cookie';

async function SendCode(code)
{
  const [cookies] = useCookies(['user']);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authToken': cookies.token
    },
    body: JSON.stringify({
      type: "REDDIT",
      token: code
    })
  };
  await fetch('/api/v1/update-api-token', requestOptions);
}

export async function OAuthReddit()
{
  var newWindow;
  const [setCookie] = useCookies(['user']);

  if (!newWindow) {
    newWindow = window.open("https://www.reddit.com/api/v1/authorize?response_type=code&client_id=1ghoBZDHNQYAQv0fjQCZbA&redirect_uri=http://localhost:8081/oauth2_callback&scope=identity,account,mysubreddits,subscribe&state=aaaaa&duration=permanent", '', 'width=850,height=750,left=300,top=0');
  }
  window.addEventListener("message", event => {
    const query = new URLSearchParams(event.data);
    var code = query.get("code");
    code = code.replace("#_", '');
    setCookie('reddit', true, { path: '/' });
    SendCode(code);
  }, false);
}