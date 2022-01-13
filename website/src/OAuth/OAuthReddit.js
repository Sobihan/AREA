import { User } from "../Account/User";

async function SendCode(code)
{
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      authtoken: User.token,
      reddittoken: code
    })
  };
  await fetch('/api/v1/reddit-auth', requestOptions);
}

export async function OAuthReddit()
{
  var newWindow;

  if (!newWindow) {
    newWindow = window.open("https://www.reddit.com/api/v1/authorize?response_type=code&client_id=qoL2raGY-ElMh7s1jBBAlw&redirect_uri=http://localhost/oauth2_callback&scope=identity,account,mysubreddits,subscribe&state=aaaaa&duration=permanent", '', 'width=850,height=750,left=300,top=0');
  }
  window.addEventListener("message", event => {
    const query = new URLSearchParams(event.data);
    var code = query.get("code");
    code = code.replace("#_", '');
    User.reddit = true;
    SendCode(code);
  }, false);
}