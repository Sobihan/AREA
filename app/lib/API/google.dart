import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;

class GoogleSignInApi {
  static final _googleSignIn = GoogleSignIn();
  static Future<GoogleSignInAccount?> login() => _googleSignIn.signIn();
  static Future logout() => _googleSignIn.disconnect();
  static Future<bool> isConnect() => _googleSignIn.isSignedIn();
}

Future<http.Response> getGoogleInfo({required String accessToken}) async {
  Uri url = Uri.parse(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=$accessToken");
  final response = http.get(url);
  return response;
}
