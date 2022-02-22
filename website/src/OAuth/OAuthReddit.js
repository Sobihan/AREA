async function SendCode(code, userToken)
{
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authToken': userToken
    },
    body: JSON.stringify({
      type: "REDDIT",
      token: code,
      mobile: false
    })
  };
  await fetch('/api/v1/update-api-token', requestOptions);
  window.location.reload();
}

export async function OAuthReddit(userToken)
{
  var newWindow;

  if (!newWindow) {
    newWindow = window.open("https://www.reddit.com/api/v1/authorize?response_type=code&client_id=kwkqREzWGXUd_55yFSG8pg&redirect_uri=http://localhost:8081/oauth2_callback&scope=identity,account,mysubreddits,subscribe&state=aaaaa&duration=permanent", '', 'width=850,height=750,left=300,top=0');
  }
  window.addEventListener("message", event => {
    const query = new URLSearchParams(event.data);
    var code = query.get("code");
    code = code.replace("#_", '');
    SendCode(code, userToken);
  }, false);
}