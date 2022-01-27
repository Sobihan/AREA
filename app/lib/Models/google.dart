import 'package:google_sign_in/google_sign_in.dart';
import 'dart:convert';

class Google {
  final String accessToken;
  final String googleID;
  final String displayName;
  final String email;

  Google(
      {required this.accessToken,
      required this.googleID,
      required this.displayName,
      required this.email});
  factory Google.fromGoogleSignInAccount(
      {required GoogleSignInAccount? google,
      required GoogleSignInAuthentication token}) {
    return Google(
        accessToken: token.accessToken ?? '',
        googleID: google!.id,
        displayName: google.displayName ?? '',
        email: google.email);
  }

  @override
  String toString() {
    final Map<String, String> data = <String, String>{
      'accessToken': accessToken,
      'googleID': googleID,
      'displayName': displayName,
      'email': email
    };
    return 'google=${data.toString()}';
  }

  String toJson() {
    String data = toString();
    return jsonEncode(data);
  }
}
