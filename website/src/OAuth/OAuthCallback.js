export function OAuthCallback()
{
    window.opener.postMessage(window.location.toString(), '*');
    window.close();
    return (null);
}