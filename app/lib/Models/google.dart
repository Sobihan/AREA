import 'package:google_sign_in/google_sign_in.dart';
import 'dart:convert';

class Google {
  final String accessToken;
  final String googleID;
  final String displayName;
  final String email;
  final String refreshToken;

  Google(
      {required this.refreshToken,
      required this.accessToken,
      required this.googleID,
      required this.displayName,
      required this.email});

  factory Google.fromGoogleSignInAccount(
      {required GoogleSignInAccount? google,
      required GoogleSignInAuthentication token}) {
    return Google(
        refreshToken: '',
        accessToken: token.accessToken ?? '',
        googleID: google!.id,
        displayName: google.displayName ?? '',
        email: google.email);
  }

  @override
  String toString() {
    final Map<String, dynamic> data = <String, dynamic>{
      'profileObj': {
        'refreshToken': refreshToken,
        'accessToken': accessToken,
        'googleId': googleID,
        'givenName': displayName.split(' ')[0],
        'familyName': displayName.split(' ')[1],
        'email': email
      }
    };
    return data.toString();
  }

  Map<String, dynamic> toMap() {
    final Map<String, dynamic> data = <String, dynamic>{
      'profileObj': {
        'refreshToken': refreshToken,
        'accessToken': accessToken,
        'googleId': googleID,
        'givenName': displayName.split(' ')[0],
        'familyName': displayName.split(' ')[1],
        'email': email
      }
    };
    return data;
  }

  String toJson() {
    Map<String, dynamic> data = toMap();
    return "{\"response\":${jsonEncode(data)}}";
  }
}
